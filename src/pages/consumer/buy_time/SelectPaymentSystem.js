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
            paymentSystem: "1",
            showPage: false,
            baseUrl: config.baseUrl
        };

        this.buyTime             = this.buyTime.bind(this);
        this.buyAliPay           = this.buyAliPay.bind(this);
        this.buyWeChat           = this.buyWeChat.bind(this);
        this.buy                 = this.buy.bind(this);
        this.changePaymentSystem = this.changePaymentSystem.bind(this);

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

    buyAliPay() {
        window.location = this.state.baseUrl + 'payment/alipay/send?amount=' + (this.state.payment.rate * this.state.payment.hours);
        // axios.get(this.state.baseUrl + 'payment/alipay/send', {
        //     params: {
        //         mac: this.state.payment.mac,
        //         interval: this.state.payment.hours * 60 * 60
        //     }
        // })
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(response => {
        //         console.log(response);
        //     });
    }

    buyWeChat() {
        // window.location = this.state.baseUrl + 'payment/wechat/send?amount=' +
        //     (this.state.payment.rate * this.state.payment.hours) +
        //     '&mac=' + this.state.payment.mac +
        //     '&interval=' + this.state.payment.hours * 60 * 60;

        axios.get(this.state.baseUrl + 'payment/wechat/send', {
            params: {
                mac: this.state.payment.mac,
                interval: this.state.payment.hours * 60 * 60,
                amount: this.state.payment.rate * this.state.payment.hours
            }
        })
            .then(response => {
                console.log(response.data.mwebUrl);
                window.location = response.data.mwebUrl;
            })
            .catch(response => {
                console.log(response);
            });
    }

    buy() {
        switch (this.state.paymentSystem)
        {
            case "1":
                    this.buyAliPay();
                    //console.log(1);
                break;
            case "2":
                    this.buyWeChat();
                    //console.log(2);
                break;
        }
    }

    changePaymentSystem(e){
        this.setState({
            paymentSystem: e.target.value
        });

        // console.log(e.target.value, this.state.paymentSystem);

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
                                <Radio name="radio1" value="1" defaultChecked onChange={e => this.changePaymentSystem(e)}/>
                            </CellFooter>
                        </FormCell>
                        <FormCell radio>
                            <CellBody>微信</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="2" onChange={e => this.changePaymentSystem(e)}/>
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <Button onClick={this.buy.bind(this)}>购买</Button>
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