/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {Grids} from 'react-weui';
import Core from '../Core';

import injectSheet from 'react-jss';

const styles  = {
    grid: {
        paddingTop: '50px',
        paddingBottom: '50px',
        border: '2px solid #b3d9ff',
        borderRadius: '5px'
    }
};



@injectSheet(styles)


export default class TimeSlots extends React.Component {

    constructor(props){
        super(props);
        const data = [
            {label: '￥3 1小时', style: styles.grid},
            {label: '￥6 2小时', style: styles.grid},
            {label: '￥9 3小时', style: styles.grid},
            {label: '￥12 4小时', style: styles.grid},
            {label: '￥15 5小时', style: styles.grid},
            {label: '￥18 6小时', style: styles.grid},
            {label: '￥21 7小时', style: styles.grid},
            {label: '￥24 8小时', style: styles.grid},
            {label: '￥27 9小时', style: styles.grid},
            {label: '￥30 10小时', style: styles.grid},
            {label: '￥33 11小时', style: styles.grid},
            {label: '￥36 12小时', style: styles.grid}
        ];

        this.state = {
            data: data
        };
    }


    render() {

        return (
            <Core>
                <Grids data={this.state.data}/>
            </Core>
        );
    };
}