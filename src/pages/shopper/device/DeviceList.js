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
import Core from '../Core';

class DeviceList extends React.Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Core>
                <Cells>
                    <Cell>
                        <CellBody>Purifier 123</CellBody>
                        <CellFooter>Room1</CellFooter>
                    </Cell>
                    <Cell>
                        <CellBody>Purifier 124</CellBody>
                        <CellFooter>Room2</CellFooter>
                    </Cell>
                    <Cell>
                        <CellBody>Purifier 125</CellBody>
                        <CellFooter>Room2</CellFooter>
                    </Cell>
                </Cells>
            </Core>
        );
    };
}

import { withRouter } from 'react-router-dom';

export default withRouter(DeviceList);