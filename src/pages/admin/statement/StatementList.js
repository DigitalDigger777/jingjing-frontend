/**
 * Created by korman on 07.02.18.
 */
import React from 'react';
import injectSheet from 'react-jss';
import Core from '../Core';

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


const styles = {
    page: {
        backgroundColor: '#EEE'
    }
};

@injectSheet(styles)

export default class StatementList extends React.Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        const {classes, children} = this.props;

        return (
            <Core>
                <Panel className={classes.page}>

                    <PanelBody>
                        <Cells>
                            <Cell>
                                <CellBody>
                                    Select Date
                                </CellBody>
                            </Cell>
                        </Cells>
                        <Cells>
                            <Cell>
                                <CellBody>
                                    Income ¥12.00
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
                                            <div>Room #: 18</div>
                                        </FlexItem>
                                    </Flex>
                                </CellBody>
                            </Cell>
                        </Cells>
                        <Cells>
                            <Cell>
                                <CellBody>
                                    Income ¥12.00
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
                                            <div>Room #: 18</div>
                                        </FlexItem>
                                    </Flex>
                                </CellBody>
                            </Cell>
                        </Cells>
                        <Cells>
                            <Cell>
                                <CellBody>
                                    Income ¥12.00
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