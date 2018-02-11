/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import {Page, Form, FormCell, CellHeader, CellBody, Label, Input, Button} from 'react-weui';
import Core from '../Core';
import axios from 'axios';
import Config from '../../../Config';

export default class ShopperForm extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();
        this.state = {
            id: typeof props.match.params.id != 'undefined' ? props.match.params.id : 0,
            item: {
                name: '',
                address: '',
                contact: '',
                cell: ''
            },
            baseUrl: config.baseUrl
        };
    }

    componentWillMount() {
        //shopper/load/10

        if (this.state.id > 0) {
            axios.get(this.state.baseUrl + 'shopper/load/' + this.state.id)
                .then(response => {
                    this.setState({
                        item: response.data
                    });
                })
                .catch(response => {
                    console.log(response);
                })
        }
    }

    openShopperList() {
        window.location = '/admin/shopper-list';
    }

    render() {

        return (
            <Core>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>Name</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Shopper Name" value={this.state.item.name}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Address</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Shoppe Address" value={this.state.item.address}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Contact</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Contact Person" value={this.state.item.contact}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Cell</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Contact Person Cell Number" value={this.state.item.cell}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Button>{this.state.id == 0 ? `Add` : `Save`}</Button>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Button onClick={() => this.openShopperList()}>Access To Shopper List</Button>
                        </CellBody>
                    </FormCell>
                </Form>
            </Core>
        );
    };
}