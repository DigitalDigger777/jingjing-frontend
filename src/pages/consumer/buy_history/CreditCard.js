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
            firstName: '',
            lastName: '',
            creditCardType: '',
            acct: '',
            expDate: '',
            cvv2: '',
            error: {
                open: false,
                message: ''
            },
            baseUrl: config.baseUrl
        };

        this.error = this.error.bind(this);
        this.change = this.change.bind(this);
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

    pay(){
        axios.post(this.state.baseUrl + 'pay-pal/direct-payment/pay', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            creditCardType: this.state.creditCardType,
            acct: this.state.acct,
            expDate: this.state.expDate,
            cvv2: this.state.cvv2
        })
            .then(response => {
                console.log(response);
                //window.location = '/consumer/buy-time-confirmation-select-slot';
                const hours = 15;
                const item = JSON.parse(window.localStorage.getItem('mac'));
                window.localStorage.removeItem('mac');

                axios.get(this.state.baseUrl + 'add-schedule', {
                    params: {
                        mac: item.mac,
                        interval: hours * 60
                    }
                })
                    .then(response => {
                        console.log(response);
                        window.localStorage.setItem('lastBuy', JSON.stringify({
                            'timeStart': response.data.timeStart,
                            'timeEnd':   response.data.timeEnd
                        }));
                        window.location = '/consumer/buy-time-confirmation-select-slot';
                    })
                    .catch(response => {
                        console.log(response);
                    });
            })
            .catch(error => {
                console.log(error.response);
                this.error(error.response.data.message);
            });

        //window.location = 'shopper/device-list';
    }

    change(e, type) {
        let state = this.state;

        if (type == 'expDate') {
            state[type] = e.target.value.replace('/', '').trim();
        } else {
            state[type] = e.target.value;
        }

        this.setState(state);
    }


    onSubmit(){

    }

    render() {
        const {classes, children} = this.props;

        return (
            <Paper className={classes.loginForm}>
                <Paper className="containerLoginForm" zDepth={4}>
                    <div>
                        <TextField hintText="First Name" onChange={ (e, type) => this.change(e, 'firstName')}/>
                    </div>
                    <div>
                        <TextField hintText="Last Name" onChange={ (e, type) => this.change(e, 'lastName')}/>
                    </div>
                    <div>
                        <TextField hintText="Credit Card Type" onChange={ (e, type) => this.change(e, 'creditCardType')}/>
                    </div>
                    <div>
                        <TextField hintText="Account number" onChange={ (e, type) => this.change(e, 'acct')}/>
                    </div>
                    <div>
                        <TextField hintText="MM / YY" onChange={ (e, type) => this.change(e, 'expDate')}/>
                    </div>
                    <div>
                        <TextField hintText="CVV2" type="password" onChange={ (e, type) => this.change(e, 'cvv2')}/>
                    </div>

                    <div>
                        <RaisedButton label="Pay" primary={true} onClick={this.pay.bind(this)}/>
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
