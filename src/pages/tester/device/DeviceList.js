/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {Page,
        Cells,
        CellsTitle,
        Cell,
        CellHeader,
        CellBody,
        CellFooter,
        SearchBar,
        Button,
        Icon
} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

class DeviceList extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        const user = JSON.parse(window.localStorage.getItem('user'));

        this.state = {
            shopperId: user.id,
            items: [],
            baseUrl: config.baseUrl
        };

        this.startTest = this.startTest.bind(this);
    }

    componentWillMount() {
        axios.get(this.state.baseUrl + 'device/items', {
            shopperId: this.state.shopperId
        })
            .then(response => {
                console.log(response);
                this.setState({
                    items: response.data
                });
            })
            .catch(response => {

            });
    }

    openDeviceDetail(id){
        window.location = '/shopper/device-detail/' + id;
    }

    startTest(e, id) {
        e.preventDefault();
        console.log(e);

        axios.post(this.state.baseUrl + 'device/start-test', {
            deviceId: id
        })
            .then(response => {
                e.target.setAttribute('disabled', true);
                e.target.style.backgroundColor = 'grey';

            })
            .catch(error => {

            });
    }

    changeSearch(){

    }

    render() {
        return (
            <Core>
                <SearchBar
                    onChange={this.changeSearch.bind(this)}
                    defaultValue={this.state.searchText}
                    placeholder="PurifierID"
                    lang={{
                        cancel: 'Cancel'
                    }}
                />
                <Cells style={{paddingBottom: '100px'}}>
                    {this.state.items.map((item, key) => {
                        const date = item[1];
                        item = item[0];

                        let status = <span>
                                        <Icon size="small" value="warn" style={{color: 'grey'}}/>
                                        <p>Not tested</p>
                                        <p>{date}</p>
                                     </span>;

                        if (item.status == 1) {
                            status = <span>
                                        <Icon size="small" value="success"/>
                                        <p>Test Passed</p>
                                        <p>{date}</p>
                                     </span>;
                        }

                        if (item.status == 2) {
                            status = <span>
                                        <Icon size="small" value="warn"/>
                                        <p>Test Failed</p>
                                        <p>{date}</p>
                                     </span>;
                        }

                        return (
                            <Cell key={key} access>
                                <CellBody>
                                    Purifier #{item.id}
                                    <Button size="small" style={{marginLeft: '5px'}} onClick={(e, id) => this.startTest(e, id)}>Start Test</Button>
                                </CellBody>
                                <CellFooter style={{textAlign: 'center'}} onClick={(id) => this.openDeviceDetail(item.id)}>
                                    {status}
                                </CellFooter>
                            </Cell>
                        );
                    })}
                </Cells>
            </Core>
        );
    };
}

import { withRouter } from 'react-router-dom';

export default withRouter(DeviceList);