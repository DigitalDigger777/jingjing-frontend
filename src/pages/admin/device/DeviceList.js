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
        CellFooter
} from 'react-weui';
import axios from 'axios';
import Config from '../../../Config';
import Core from '../Core';

class DeviceList extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {
            items: [],
            baseUrl: config.baseUrl
        };
    }

    componentWillMount() {
        axios.get(this.state.baseUrl + 'device/items')
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
        window.location = '/admin/device-detail/' + id;
    }

    render() {
        return (
            <Core>
                <Cells style={{paddingBottom: '100px'}}>
                    {this.state.items.map((item, key) => {
                        return (
                            <Cell key={key} access onClick={(id) => this.openDeviceDetail(item.id)}>
                                <CellBody>{item.name}</CellBody>
                                <CellFooter>{item.room}</CellFooter>
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