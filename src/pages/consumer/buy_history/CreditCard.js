/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
// import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button, Toast} from 'react-weui';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// import CardForm from 'react-payment/dist/CardForm';
import Snackbar from 'material-ui/Snackbar';

import axios from 'axios';
import Config from '../../../Config';

import injectSheet from 'react-jss';

const styles  = {
    loginForm: {
        textAlign: 'center',
        padding: '30px',
        position: 'absolute',
        height: '98%',
        width: '98%',
        '& .containerLoginForm': {
            padding: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '150px'
        },
        '& .snackBar': {
            top: 0,
            bottom: 'auto',
            left: (window.innerWidth - 288) / 2
        }
    }
};

@injectSheet(styles)

export default class CreditCard extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            email: '',
            password: '',
            error: {
                open: false,
                message: ''
            },
            baseUrl: config.baseUrl
        };

        this.error = this.error.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    error(message){
        this.setState({
            error: {
                open: true,
                message: message
            }
        });

        setTimeout(() => {
            this.setState({
                error: {
                    open: false,
                    message: ''
                }
            });
        }, 3000);
    }

    login(){
        axios.post(this.state.baseUrl + 'user/login', {
                email: this.state.email,
                password: this.state.password
        })
            .then(response => {
                //console.log(response);
                const role = response.data.role;
                window.localStorage.setItem('user', JSON.stringify(response.data));

                switch (role)
                {
                    case 'ROLE_ADMIN':
                            window.location = '/admin/shopper-list';
                        break;
                    case 'ROLE_CONSUMER':
                            const timeSlotsStorage = window.localStorage.getItem('timeSlots');
                            const timeSlots = JSON.parse(timeSlotsStorage);

                            if (timeSlotsStorage) {
                                window.location = '/consumer/buy-time-slots/' + timeSlots.deviceId;
                            } else {
                                window.location = '/consumer/buy-history';
                            }

                        break;
                    case 'ROLE_SHOPPER':
                            window.location = '/shopper/device-list';
                        break;
                }
            })
            .catch(error => {
                console.log(error.response);
                this.error(error.response.data.message);
            });

        //window.location = 'shopper/device-list';
    }

    changeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    changePassword(e) {

        this.setState({
            password: e.target.value
        });
        //this.state.password = e.target.value;
    }

    onSubmit(){

    }

    render() {
        const {classes, children} = this.props;

        return (
            <Paper className={classes.loginForm}>
                <Paper className="containerLoginForm" zDepth={4}>
                    <div>
                        <TextField hintText="Name on card" onChange={ e => this.changeEmail(e)}/>
                    </div>
                    <div>
                        <TextField hintText="Account number" onChange={ e => this.changeEmail(e)}/>
                    </div>
                    <div>
                        <TextField hintText="MM / YY" onChange={ e => this.changeEmail(e)}/>
                    </div>
                    <div>
                        <TextField hintText="CVC" type="password"  onChange={ e => this.changePassword(e)}/>
                    </div>
                    <div>
                        <TextField hintText="ZIP" onChange={ e => this.changeEmail(e)}/>
                    </div>
                    <div>
                        <RaisedButton label="Pay" primary={true} onClick={this.login.bind(this)}/>
                    </div>

                </Paper>
                <Snackbar
                    className="snackBar"
                    open={this.state.error.open}
                    message={this.state.error.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </Paper >
        );
    };
}
