/**
 * Created by korman on 06.02.18.
 */

import React from 'react';
import { render } from 'react-dom';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//weui
import 'weui/dist/style/weui.css';

//system pages
import Login from './pages/Login';

//admin pages
import AdminShopperDetail from './pages/admin/shopper/ShopperDetail';
import AdminShopperForm from './pages/admin/shopper/ShopperForm';
import AdminShopperList from './pages/admin/shopper/ShopperList';
import AdminDeviceList from './pages/admin/device/DeviceList';
import AdminDeviceDetail from './pages/admin/device/DeviceDetail';
import AdminStatementList from './pages/admin/statement/StatementList';

//consumer pages
import ConsumerBuyHistory from './pages/consumer/buy_history/BuyHistory';
import ConsumerConfirmationSelectSlot from './pages/consumer/buy_time/ConfirmationSelectSlot';
import ConsumerBuyTimeSlots from './pages/consumer/buy_time/TimeSlots';
import SelectPaymentSystem from './pages/consumer/buy_time/SelectPaymentSystem';

//shopper pages
import ShopperDeviceList from './pages/shopper/device/DeviceList';
import ShopperDeviceDetail from './pages/shopper/device/DeviceDetail';
import ShopperStatementList from './pages/shopper/statement/StatementList';


//tester pages
import TesterLogin from './pages/tester/Login';
import TesterDeviceList from './pages/tester/device/DeviceList';
import TesterDeviceDetail from './pages/tester/device/DeviceDetail';
import TesterDeviceTest from './pages/tester/device/DeviceTest';


import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';



const history = createBrowserHistory();

class Index extends React.Component {


    render(){
        return(
                <Router history={history}>
                    <div>
                            {/*<Route exact path="/" component={Login}/>*/}

                        <Route exact path="/consumer/login" component={Login}/>
                        <Route exact path="/shopper/login" component={Login}/>
                        <Route exact path="/admin/login" component={Login}/>
                        <Route exact path="/tester/login" component={TesterLogin}/>

                        <Route exact path="/admin/shopper-detail/:id" component={AdminShopperDetail}/>
                        <Route exact path="/admin/shopper-form" component={AdminShopperForm}/>
                        <Route exact path="/admin/shopper-form/:id" component={AdminShopperForm}/>
                        <Route exact path="/admin/shopper-list" component={AdminShopperList}/>
                        <Route exact path="/admin/device-list" component={AdminDeviceList}/>
                        <Route exact path="/admin/device-detail/:id" component={AdminDeviceDetail}/>
                        <Route exact path="/admin/statement-list" component={AdminStatementList}/>
                        <Route exact path="/admin/invoice-list" component={AdminStatementList}/>

                        <Route exact path="/consumer/buy-history" component={ConsumerBuyHistory}/>
                        <Route exact path="/consumer/select-payment-system" component={SelectPaymentSystem}/>
                        <Route exact path="/consumer/select-payment-system/:deviceId" component={SelectPaymentSystem}/>
                        <Route exact path="/consumer/buy-time-confirmation-select-slot" component={ConsumerConfirmationSelectSlot}/>
                        <Route exact path="/consumer/buy-time-confirmation-select-slot/:mac/:interval/:amount" component={ConsumerConfirmationSelectSlot}/>
                        {/*<Route exact path="/" component={ConsumerBuyTimeSlots}/>*/}
                        <Route exact path="/consumer/buy-time-slots/:deviceId" component={ConsumerBuyTimeSlots}/>
                        <Route exact path="/consumer/buy-time-slots/:paymentSystem/:deviceId" component={ConsumerBuyTimeSlots}/>

                        <Route exact path="/shopper/device-list" component={ShopperDeviceList}/>
                        <Route exact path="/shopper/device-detail/:id" component={ShopperDeviceDetail}/>
                        <Route exact path="/shopper/statement-list" component={ShopperStatementList}/>

                        <Route exact path="/tester/device-list" component={TesterDeviceList}/>
                        <Route exact path="/tester/device-detail/:id" component={TesterDeviceDetail}/>
                        <Route exact path="/tester/device-test/:id" component={TesterDeviceTest}/>

                    </div>
                </Router>
        );
    }
}

render(<Index />, document.querySelector('#root'));