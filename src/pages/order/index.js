import React from 'react'
import { Card, Button, Table, Form, Modal, message } from 'antd';
import axios from './../../axios/index';
import BaseForm from './../../components/BaseForm/index';
const FormItem = Form.Item;

export default class Order extends React.Component{

    state = {
        orderInfo: {},
        orderConfirmVisible: false
    }
    params = {
        page:1
    }
    //按照AntD 的getFieldDecorator.option规则定义
    formList = [
        { 
            type: 'SELECT',
            label: '城市',
            field: 'city_id',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '北京'},
                {id: '2', name: '天津'},
                {id: '3', name: '上海'}
            ]
        },
        { 
            type: '时间查询'
        },
        { 
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '进行中'},
                {id: '2', name: '结束行程'}
            ]
        },

    ]

    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, '/order/list', this.params, true)
    }

    //订单结束确认
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if(res.code === 0 ){
                this.setState({
                    orderInfo: res.list,
                    orderConfirmVisible: true
                })
            }
        })
    }

    //结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if(res.code === 0){
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisible: false
                })
                this.requestList();
            }
        })
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    //订单详情页
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }

    render(){
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft: 10}} onClick={this.handlConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                         bordered
                         columns={columns}
                         dataSource={this.state.list}
                         pagination={this.state.pagination}
                         rowSelection= {rowSelection}
                         onRow={(record, index) => {
                             return {
                                 onClick: () => {
                                     this.onRowClick(record, index);
                                 }
                             }
                         }}
                    />
                </div>
                <Modal 
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisible: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}>
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>               
                    </Form>
                </Modal> 
            </div>
        )
    }
}