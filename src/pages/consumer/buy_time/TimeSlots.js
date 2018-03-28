/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {Grids, Cells, Cell, CellBody, CellHeader} from 'react-weui';
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


export default class TimeSlots extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props){
        super(props);
        const data = [
            {label: '￥3 1小时', style: styles.grid, onClick: hours => this.pay(1)},
            {label: '￥6 2小时', style: styles.grid, onClick: hours => this.pay(2)},
            {label: '￥9 3小时', style: styles.grid, onClick: hours => this.pay(3)},
            {label: '￥12 4小时', style: styles.grid, onClick: hours => this.pay(4)},
            {label: '￥15 5小时', style: styles.grid, onClick: hours => this.pay(5)},
            {label: '￥18 6小时', style: styles.grid, onClick: hours => this.pay(6)},
            {label: '￥21 7小时', style: styles.grid, onClick: hours => this.pay(7)},
            {label: '￥24 8小时', style: styles.grid, onClick: hours => this.pay(8)},
            {label: '￥27 9小时', style: styles.grid, onClick: hours => this.pay(9)},
            {label: '￥30 10小时', style: styles.grid, onClick: hours => this.pay(10)},
            {label: '￥33 11小时', style: styles.grid, onClick: hours => this.pay(11)},
            {label: '￥36 12小时', style: styles.grid, onClick: hours => this.pay(12)}
        ];

        const config = new Config();
        let showError = false;
        let paymentSystem = '';
        let deviceId = 0;

        if (typeof props.match.params.deviceId == 'undefined' || typeof props.match.params.paymentSystem == 'undefined') {
            showError = true;
        } else {
            paymentSystem = props.match.params.paymentSystem;
            deviceId = props.match.params.deviceId;
        }

        this.state = {
            deviceId: deviceId,
            paymentSystem: paymentSystem,
            data: data,
            item: {
                shopperId: 0,
                shopperName: '',
                room: 0
            },
            showPage: false,
            showError: showError,
            baseUrl: config.baseUrl
        };

        this.selectPaymentSystem = this.selectPaymentSystem.bind(this);
    }

    componentWillMount(){
        //check consumer login
        const userStorage = window.localStorage.getItem('user');
        window.localStorage.setItem('timeSlots', JSON.stringify({'deviceId':this.state.deviceId}));

        // if (userStorage) {
        //     const user = JSON.parse(userStorage);
        //
        //     if (user.role != 'ROLE_CONSUMER') {
        //
        //         window.location = '/consumer/login';
        //
        //     }
        //
        // } else {
        //
        //     window.location = '/consumer/login';
        //
        // }

        if (this.state.deviceId != 0) {
            axios.get(this.state.baseUrl + 'device/load/' + this.state.deviceId)
                .then(response => {
                    console.log(response);
                    this.setState({
                        item: response.data
                    });
                    window.localStorage.removeItem('timeSlots');
                    this.setState({
                        showPage: true
                    });
                })
                .catch(response => {
                    console.log(response);
                });
        }
    }

    /**
     * Select payment system.
     *
     * @param hours
     * @deprecated this method is deprecated because we remove select payment system
     */
    selectPaymentSystem(hours) {
        let payment = {
            hours: hours,
            rate: 3,
            room: this.state.item.room,
            mac: this.state.item.mac
        };

        window.localStorage.setItem('payment', JSON.stringify(payment));
        window.location = '/consumer/select-payment-system';
    }

    /**
     * Start payment process with payment system Alipay or WeChat
     *
     * @param hours
     */
    pay(hours){
        let payment = {
            hours: hours,
            rate: 3,
            room: this.state.item.room,
            mac: this.state.item.mac
        };

        window.localStorage.setItem('payment', JSON.stringify(payment));

        switch (this.state)
        {
            case 'alipay':
                    //TODO: here start payment process with Alipay
                break;
            case 'wechat':
                    //TODO: here start payment process with WeChat
                break;
        }
    }

    /**
     * Render component.
     *
     * @returns {XML}
     */
    render() {
        const {classes, children} = this.props;

        if (this.state.showPage) {
            return (
                <Core>
                    <Cells>
                        <Cell>
                            <CellBody style={{textAlign: 'center'}}>
                                <p style={{fontWeight: 'bold'}}>请选择需要的时间</p>
                                <p>{this.state.item.shopperName}</p>
                                <p>Room: {this.state.item.room}</p>
                                <p>￥3 一小时</p>
                            </CellBody>
                        </Cell>
                    </Cells>
                    <Grids className={classes.page} data={this.state.data}/>
                </Core>
            );
        } else if (!this.state.showError){
            return (
                <Core>
                    Load...
                </Core>
            );
        }

        if (this.state.showError) {
            return (<Core>
                <Cells>
                    <Cell>
                        <CellBody style={{textAlign: 'center'}}>
                            Incorrect request
                        </CellBody>
                    </Cell>
                </Cells>
            </Core>)
        }
    };
}