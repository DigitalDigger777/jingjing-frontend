/**
 * Created by korman on 06.02.18.
 */
import React from 'react';

import {Page, Icon, Panel, PanelBody} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';
import Auth from '../Auth';


const IconBox = (props) => (
    <div className="icon-box">
        {props.icon}
        <div className="icon-box__ctn">
            <h3 className="icon-box__title">{props.title}</h3>
            <p className="icon-box__desc">{props.desc}</p>
        </div>
    </div>
);

export default class ConfirmationSelectSlot extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        const lastBuy = JSON.parse(window.localStorage.getItem('lastBuy'));

        const mac       = props.match.params.mac;
        const interval  = props.match.params.interval;
        const amount    = props.match.params.amount;

        this.state = {
            lastBuy: lastBuy,
            mac: mac,
            interval: interval,
            amount: amount,
            showPage: false,
            baseUrl: config.baseUrl
        };
    }

    componentWillMount() {
        const mac       = this.state.mac;
        const interval  = this.state.interval;
        const amount    = this.state.amount;

        if (typeof mac != 'undefined' && typeof interval != 'undefined' && typeof amount != 'undefined') {
            axios.get(this.state.baseUrl + 'add-schedule', {
                params: {
                    mac: mac,
                    interval: interval
                }
            })
                .then(response => {
                    console.log(response);
                    window.localStorage.setItem('lastBuy', JSON.stringify({
                        'timeStart': response.data.timeStart,
                        'timeEnd':   response.data.timeEnd
                    }));
                    const lastBuy = JSON.parse(window.localStorage.getItem('lastBuy'));

                    this.setState({
                        lastBuy: lastBuy,
                        showPage: true
                    });
                    //window.location = '/consumer/buy-time-confirmation-select-slot';
                })
                .catch(response => {
                    console.log(response);
                });
        }

    }

    render() {
        if (this.state.showPage) {
            return (
                <Page>
                    <Panel>

                        <PanelBody style={{padding: '10px'}}>
                            <IconBox
                                icon={<Icon size="large" value="success"/>}
                                title="You can turn on Purifier"
                                desc={`The expire time is ` + this.state.lastBuy.timeEnd}
                            />
                        </PanelBody>
                    </Panel>
                </Page>
            );
        } else {
            return (
                <Page>
                    <Panel>
                        Load...
                    </Panel>
                </Page>
            );
        }
    };
}