import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import NoMatch from './pages/NoMatch'
import Admin from './admin'
import Home from './pages/Home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import RichText from './pages/rich/index'
import City from './pages/city/index'
import User from './pages/user/index'
import BikeMap from './pages/map/bikeMap'
import Common from './common'
import Order from './pages/order/index'
import OrderDetail from './pages/order/detail'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Permission from './pages/permission'

export default  class IRouter extends React.Component{
    render() {
        return (
           <HashRouter>
               <App>
                  <Switch>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/common" render={() => 
                      <Common>
                          <Route path="/common/order/detail/:orderId" exact component={OrderDetail} />
                      </Common> 
                  }/> 
                  <Route path="/" render={() => 
                      <Admin>
                          <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/ui/buttons" component={Buttons}></Route>
                            <Route path="/ui/modals" component={Modals}></Route>
                            <Route path="/ui/loadings" component={Loadings}></Route>
                            <Route path="/ui/notification" component={Notice}></Route>
                            <Route path="/ui/messages" component={Messages}></Route>
                            <Route path="/ui/tabs" component={Tabs}></Route>
                            <Route path="/ui/gallery" component={Gallery}></Route>
                            <Route path="/ui/carousel" component={Carousel}></Route>
                            <Route path="/form/login" component={FormLogin}></Route>
                            <Route path="/form/reg" component={FormRegister}></Route>
                            <Route path="/table/basic" component={BasicTable}></Route>
                            <Route path="/table/high" component={HighTable}></Route>
                            <Route path="/rich" component={RichText}></Route>
                            <Route path="/city" component={City}></Route>
                            <Route path="/order" component={Order}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/bikeMap" component={BikeMap}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/permission" component={Permission}></Route>
                            <Redirect to="/home" />
                            <Route component={NoMatch}></Route>
                          </Switch>
                      </Admin>
                  }/>
                  </Switch>
               </App>
           </HashRouter>
        )
    }
}