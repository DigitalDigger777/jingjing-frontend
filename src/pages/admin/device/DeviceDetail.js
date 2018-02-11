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
        Form,
        FormCell,
        Label,
        Input,
        Button
} from 'react-weui';
import axios from 'axios';
import Config from '../../../Config';
import Core from '../Core';

import injectSheet from 'react-jss';

const styles  = {
    loginForm: {
        position: 'absolute',
        width: '100%',
        top: '30%'
    }
};

@injectSheet(styles)

export default class DeviceDetail extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();

        this.state = {

            id: typeof props.match.params.id != 'undefined' ? props.match.params.id : 0,
            item: {
                id: 0,
                is_enabled: false,
                mac: '',
                name: '',
                shopperId: ''
            },
            shopper: '',
            baseUrl: config.baseUrl
        };
        this.changeName = this.changeName.bind(this);
        this.changeShopper = this.changeShopper.bind(this);
    }

    componentWillMount() {
        axios.get(this.state.baseUrl + 'device/load/' + this.state.id)
            .then(response => {
                console.log(response);
                this.setState({
                    item: response.data
                });
            })
            .catch(response => {

            });
    }

    changeName(e){
        const item = this.state.item;
        item.name = e.target.value;

        this.setState({
            item: item
        });

    }

    changeShopper(e){

        const item = this.state.item;
        item.shopperId = e.target.value;

        this.setState({
            item: item
        });
    }

    save(){
        axios.post(this.state.baseUrl + 'device/save', {
            id: this.state.item.id,
            name: this.state.item.name,
            shopperId: this.state.item.shopperId
        })
            .then(response => {
                console.log(response);
            })
            .catch(response => {

            });
    }

    render() {
        const {classes, children} = this.props;

        return (
            <Core>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>Room</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Enter Room" value={this.state.item.name} onChange={ e => this.changeName(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>Shopper ID</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="Enter Shopper #" value={this.state.item.shopperId} onChange={ e => this.changeShopper(e)}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>MAC address</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" disabled  value={this.state.item.mac} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Button onClick={this.save.bind(this)}>Save</Button>
                        </CellBody>
                    </FormCell>
                </Form>
            </Core>
        );
    };
}