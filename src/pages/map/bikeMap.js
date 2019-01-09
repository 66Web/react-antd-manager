import React from 'react'
import {Card} from 'antd'
import axios from './../../axios'
import BaseForm from '../../components/BaseForm'

export default class BikeMap extends React.Component{

    state = {
        list:[]
    }

    map='';

    params = {
        page: 1
    }

    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city_id',
            placeholder: '全部',
            initialValue: '0',
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '北京'},
                {id: '2', name: '天津'},
                {id: '3', name: '深圳'},
            ]
            
        },{
            type: '时间查询'
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '进行中'},
                {id: '2', name: '行程结束'}
            ]
        }
    ]

    componentDidMount(){
        this.requestList();
    }

    requestList = () => {
       axios.ajax({
           url: '/map/bike_list',
           data: {
               params: this.params
           }
       }).then((res) => {
           if(res.code === 0){
               this.setState({
                   total_count: res.list.total_count
               })
               this.renderMap(res);
           }
       })
    }

    //查询表单
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    }

    //初始化地图
    renderMap = (res) => {
        //渲染地图数据
        let list = res.list.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0],gps1[1]);
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint, 11);
        
        //起点 -- 图标Icon/覆盖物Marker/添加addOverlay
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42) //偏移
        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint,{icon: startPointIcon})
        this.map.addOverlay(bikeMarkerStart)

        //终点
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{icon: endPointIcon})
        this.map.addOverlay(bikeMarkerEnd)

        //绘制车辆行驶路线
        let routeList = [];
        list.forEach((item) => {
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]));
        })
        let polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine);

        //绘制服务区
        let servicePointList = [];
        let serviceList = res.list.service_list;
        serviceList.forEach((item) => {
            servicePointList.push(new window.BMap.Point(item.lon, item.lat));
        })
        let polyServiceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#1869AD',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine);

        //添加地图中的自行车图标
        let bikeList = res.list.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        bikeList.forEach((item) => {
            let p = item.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(point, {icon: bikeIcon})
            this.map.addOverlay(bikeMarker);
        })
       
        //添加地图控件
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
    
    render(){
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{marginTop: 10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height: 500}}></div>
                </Card>
            </div>
        )
    }
}

