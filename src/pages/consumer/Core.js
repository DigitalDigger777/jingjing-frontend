/**
 * Created by korman on 11.02.18.
 */
import React from 'react';
import {Page} from 'react-weui';
import injectSheet from 'react-jss';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const styles  = {
    weuiTabbarLabelFont: {
        fontSize: '20px'
    }
};

const attachMoney = <FontIcon className="material-icons">attach_money</FontIcon>;
const deviceHub = <FontIcon className="material-icons">device_hub</FontIcon>;

@injectSheet(styles)

export default class Core extends React.Component {

    constructor(props){
        super(props);
        const location = window.location.pathname;

        this.state = {
            menuItems: {
                buyTime:    '',
                buyHistory: ''
            }
        };

        switch (location)
        {
            case '/consumer/buy-history':
                    this.state.menuItems.buyHistory = 'weui-bar__item_on';
                break;
            case '/consumer/buy-time-slots':
                    this.state.menuItems.buyTime = 'weui-bar__item_on';
                break;
        }
    }

    openBuyTime() {
        window.location = '/consumer/buy-time-slots';
    }

    openBuyHistory() {
        window.location = '/consumer/buy-history';
    }

    render(){
        const {classes, children} = this.props;
        // weui-bar__item_on

        return(
            <Paper>
                <Paper>
                    {this.props.children}
                    {/*<BottomNavigation selectedIndex={this.state.selectedIndex} style={{position: 'fixed', bottom: '0px'}}>*/}
                        {/*<BottomNavigationItem*/}
                            {/*label="Buy Time"*/}
                            {/*icon={deviceHub}*/}
                            {/*onClick={this.openBuyTime.bind(this)}*/}
                        {/*/>*/}
                        {/*<BottomNavigationItem*/}
                            {/*label="Buy History"*/}
                            {/*icon={attachMoney}*/}
                            {/*onClick={this.openBuyHistory.bind(this)}*/}
                        {/*/>*/}
                    {/*</BottomNavigation>*/}
                </Paper>
            </Paper>
        );
    }
}