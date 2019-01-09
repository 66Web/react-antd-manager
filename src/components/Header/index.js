import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios';
import {connect} from 'react-redux'  //连接器

class Header extends React.Component {
    state = {}
    componentWillMount() {
        this.setState({
            userName: '莱茵月牙'
        })
        setInterval(() => {
            let sysTime = Util.formatDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000)
        //this.getWeatherAPIDate();由于百度API禁止了服务，故该功能暂时不使用
    }
    getWeatherAPIDate() {
        let city = encodeURIComponent('杭州');
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=kwQXPVDYPZIYArkpi3rQT7aZHTGTCCB2'
        }).then((res) => {
            if(res.status === 'success'){
                let data = res.result[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            } 
        })
    }
    render() {
        const {menuName, menuType} = this.props;
        return (
            <div className="header">
               <Row className="header-top">
                  {
                      menuType ? 
                      <Col span="6" className="logo">
                           <img src="/assets/logo-ant.svg" alt="" />
                           <span>LJQ 通用管理系统</span>
                      </Col> : ''
                  }
                  <Col span={menuType ? 18 : 24}>
                      <span>欢迎，{this.state.userName}</span>
                      <a href='#'>退出</a>
                  </Col>
               </Row>
               {
                   menuType ? '' : 
                   <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            {menuName || '首页'}
                        </Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-detail">晴转多云</span>
                        </Col>
                   </Row>
               }
            </div>
        )
    }
}
//将state.menuName 绑定到 props 的menuName
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToProps)(Header)