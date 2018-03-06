/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
// import {Page,
//         Cells,
//         CellsTitle,
//         Cell,
//         CellHeader,
//         CellBody,
//         CellFooter,
//         SearchBar
// } from 'react-weui';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
//import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SearchBar from 'material-ui-search-bar'

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

    changeSearch(){

    }

    render() {
        return (
            <Core>
                <Toolbar>
                    <ToolbarGroup style={{width: '100%'}}>
                        <SearchBar
                            onChange={this.changeSearch.bind(this)}
                            onRequestSearch={() => console.log('onRequestSearch')}
                            defaultValue={this.state.searchText}

                            style={{
                                margin: '0 auto',
                                width: '100%'
                            }}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <Table selectable={false}>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.state.items.map((item, key) => {
                            return (
                                <TableRow key={key} onClick={ id => this.openDeviceDetail(item.id) }>
                                    <TableRowColumn>{item.name}</TableRowColumn>
                                    <TableRowColumn>{item.room}</TableRowColumn>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Core>
        );
    };
}

import { withRouter } from 'react-router-dom';

export default withRouter(DeviceList);