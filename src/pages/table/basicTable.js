import React from 'react';
import {Card, Table, Modal, Button, message} from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils'

export default class BasicTables extends React.Component{
    state = {
        dataSource2: []
    }
    params = {
        page: 1
    }
    componentDidMount(){
        const dataSource = [   //数据源
            {
                id: '0',
                userName: 'Elena',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2019-01-01',
                address: '西虹市海淀区桃花公园',
                time: '07:00'
            },
            {
                id: '1',
                userName: 'Mary',
                sex: '1',
                state: '2',
                interest: '3',
                birthday: '2019-01-01',
                address: '西虹市海淀区桃花公园',
                time: '07:00'
            },
            {
                id: '2',
                userName: 'Tom',
                sex: '2',
                state: '3',
                interest: '4',
                birthday: '2019-01-01',
                address: '西虹市海淀区桃花公园',
                time: '07:00'
            }
        ]
        dataSource.map((item, index) => {
            item.key = index;
        })
        this.setState({
            dataSource
        })
        this.request();
    }

    //动态获取mock数据
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
            data:{
                params:{
                    page: this.params.page
                },
                // isShowLoading: false
            }
        }).then((res) => {
            if(res.code === 0){
               res.list.map((item, index) => {
                   item.key = index
               })
               this.setState({
                   dataSource2: res.list,
                   selectedRowKeys: [], //重置
                   selectedRows: null,
                   pagination: Utils.pagination(res,(current) => {
                       _this.params.page = current;
                       this.request();
                   })
               })
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName},用户爱好：${record.interest}`
        });
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    // add = () => {
    //     let item = this.state.selectedItem;
    //     if(item.id){

    //     }
    // }

    //多选执行删除动作
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id)
        })   
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
               message.success('删除成功')
               this.request();  //重新刷新页面
            }
        })
    }

    render(){
        const columns = [
             {
                 title: 'id',   //表头标题
                 dataIndex: 'id' //数据源
             },
             {
                 title: '用户名',
                 dataIndex: 'userName'
             },
             {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex === 1 ? '男' : '女'
                }
             },
             {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1': '咸鱼一条',
                        '2': '人民公仆',
                        '3': '医院护士',
                        '4': '科技公司FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
             },
             {
                title: '爱好',
                dataIndex: 'interest',
                render(abc){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc]
                }
             },
             {
                title: '生日',
                dataIndex: 'birthday'
             },
             {
                title: '地址',
                dataIndex: 'address'
             },
             {
                title: '早起时间',
                dataIndex: 'time'
             }       
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                // let ids = []
                // selectedRows.map((item) => {
                //    ids.push(item.id)
                // })
                this.setState({
                    selectedRowKeys, //必需
                    // selectedIds: ids,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-动态数据渲染表格" style={{margin: '10px 0'}}>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{margin: '10px 0'}}>
                    <Table 
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => { 
                                    this.onRowClick(record, index)
                                }  //点击行
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-复选" style={{margin: '10px 0'}}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        bordered
                        rowSelection={rowCheckSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => { 
                                    this.onRowClick(record, index)
                                }  //点击行
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{margin: '10px 0'}}>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}