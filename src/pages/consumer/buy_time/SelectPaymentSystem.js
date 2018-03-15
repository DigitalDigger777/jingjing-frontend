/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {
    Grids,
    Cells,
    Cell,
    CellBody,
    CellHeader,
    CellFooter,
    Form, FormCell, Radio, Button, ButtonArea} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';
import Auth from '../Auth';

import injectSheet from 'react-jss';

const styles  = {
    grid: {
        paddingTop: '50px',
        paddingBottom: '50px',
        border: '2px solid #b3d9ff',
        borderRadius: '5px'
    },
    page: {
        backgroundColor: '#EEE',
        paddingBottom: '100px'
    }
};



@injectSheet(styles)


export default class SelectPaymentSystem extends React.Component {

    constructor(props){
        super(props);


        const config = new Config();

        this.state = {
            payment: JSON.parse(window.localStorage.getItem('payment')),
            showPage: false,
            baseUrl: config.baseUrl
        };

        this.buyTime = this.buyTime.bind(this);
    }

    componentDidMount(){
        this.setState({
            showPage: true
        });
    }

    buyTime() {

        axios.get(this.state.baseUrl + 'add-schedule', {
            params: {
                mac: this.state.payment.mac,
                interval: this.state.payment.hours * 60 * 60
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
    }

    render() {
        const {classes, children} = this.props;

        if (this.state.showPage) {
            return (
                <Core>
                    <Cells>
                        <Cell>
                            <CellBody>
                                支付金额
                            </CellBody>
                            <CellFooter>
                                ￥{this.state.payment.rate * this.state.payment.hours }
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <Form radio>
                        <FormCell radio>
                            <CellBody>支付宝</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="1" defaultChecked/>
                            </CellFooter>
                        </FormCell>
                        <FormCell radio>
                            <CellBody>微信</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="2"/>
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <Button onClick={this.buyTime.bind(this)}>购买</Button>
                        </FormCell>
                    </Form>
                </Core>
            );
        } else {
            return (
                <Core>
                    Load...
                </Core>
            );
        }
    };
}