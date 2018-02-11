/**
 * Created by korman on 06.02.18.
 */
import React from 'react';
import {Grids} from 'react-weui';
import Core from '../Core';

const data = [
    {label: '￥3 1小时'},
    {label: '￥6 2小时'},
    {label: '￥9 3小时'},
    {label: '￥12 4小时'},
    {label: '￥15 5小时'},
    {label: '￥18 6小时'},
    {label: '￥21 7小时'},
    {label: '￥24 8小时'},
    {label: '￥27 9小时'},
    {label: '￥30 10小时'},
    {label: '￥33 11小时'},
    {label: '￥36 12小时'}
];


export default class TimeSlots extends React.Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    render() {

        return (
            <Core>
                <Grids data={data}/>
            </Core>
        );
    };
}