/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {Page,
    Panel,
    PanelHeader,
    PanelBody,
    Flex,
    FlexItem,
    Cells,
    Cell,
    CellBody
} from 'react-weui';
import Core from '../Core';

export default class BuyHistory extends React.Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Core>
                <Panel>

                    <PanelBody>
                        <Cells>
                            <Cell>
                                <CellBody>
                                    Paid ¥12.00
                                </CellBody>
                            </Cell>
                            <Cell>
                                <CellBody>
                                    <Flex>
                                        <FlexItem>
                                            <div>Time: 2018/01/23 22:31</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Hours: 4</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Rate: ¥3.00 per hour</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Shoppe: ABC Shopper</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Room #: 18</div>
                                        </FlexItem>
                                    </Flex>
                                </CellBody>
                            </Cell>
                        </Cells>
                        <Cells>
                            <Cell>
                                <CellBody>
                                    Paid ¥12.00
                                </CellBody>
                            </Cell>
                            <Cell>
                                <CellBody>
                                    <Flex>
                                        <FlexItem>
                                            <div>Time: 2018/01/23 22:31</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Hours: 4</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Rate: ¥3.00 per hour</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Shoppe: ABC Shopper</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Room #: 18</div>
                                        </FlexItem>
                                    </Flex>
                                </CellBody>
                            </Cell>
                        </Cells>
                        <Cells>
                            <Cell>
                                <CellBody>
                                    Paid ¥12.00
                                </CellBody>
                            </Cell>
                            <Cell>
                                <CellBody>
                                    <Flex>
                                        <FlexItem>
                                            <div>Time: 2018/01/23 22:31</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Hours: 4</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Rate: ¥3.00 per hour</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Shoppe: ABC Shopper</div>
                                        </FlexItem>
                                    </Flex>
                                    <Flex>
                                        <FlexItem>
                                            <div>Room #: 18</div>
                                        </FlexItem>
                                    </Flex>
                                </CellBody>
                            </Cell>
                        </Cells>
                    </PanelBody>
                </Panel>
            </Core>
        );
    };
}