import React from 'react'
import {Card, Table, Modal, Button, message, Badge} from 'antd'
import axios from '../../axios/index'

export default class HighTables extends React.Component{
    state = {
        dataSource: []
    }  
    params = {
        page: 1
    }
    componentDidMount(){
        this.request();
    }
    //动态获取mock数据
    request = () => {
        // let _this = this;
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
                dataSource: res.list
            })
            }
        })
    } 

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: '确认',
            content: `您确认要删除此条数据吗？${id}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }

    render(){
        const columns = [
                {
                    title: 'id',   //表头标题
                    key: 'id',
                    width: 80,
                    dataIndex: 'id' //数据源
                },
                {
                    title: '用户名',
                    key: 'userName',
                    width: 80,
                    dataIndex: 'userName'
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex',
                    width: 80,
                    render(sex){
                        return sex === 1 ? '男' : '女'
                    }
                },
                {
                    title: '状态',
                    dataIndex: 'state',
                    key: 'state',
                    width: 80,
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
                    key: 'interest',
                    width: 80,
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
                    dataIndex: 'birthday',
                    key: 'birthday',
                    width: 120,
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address',
                    width: 120,
                },
                {
                    title: '早起时间',
                    dataIndex: 'time',
                    key: 'time',
                    width: 80
                }       
       ]
        const columns2 = [
                {
                    title: 'id',   //表头标题
                    key: 'id',
                    width: 80,
                    fixed: 'left',
                    dataIndex: 'id' //数据源
                },
                {
                    title: '用户名',
                    key: 'userName',
                    width: 80,
                    fixed: 'left',
                    dataIndex: 'userName'
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex',
                    width: 80,
                    render(sex){
                        return sex === 1 ? '男' : '女'
                    }
                },
                {
                    title: '状态',
                    dataIndex: 'state',
                    key: 'state',
                    width: 80,
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
                    key: 'interest',
                    width: 80,
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
                    dataIndex: 'birthday',
                    key: 'birthday',
                    width: 120,
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address',
                    width: 120,
                },
                {
                    title: '早起时间',
                    dataIndex: 'time',
                    key: 'time',
                    width: 120
                }, {
                    title: '生日',
                    dataIndex: 'birthday',
                    key: 'birthday2',
                    width: 120,
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address2',
                    width: 120,
                },
                {
                    title: '早起时间',
                    dataIndex: 'time',
                    key: 'time2',
                    width: 120
                }             
        ] 
        const columns3 = [
            {
                title: 'id',   //表头标题
                key: 'id',
                dataIndex: 'id' //数据源
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex){
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
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
                key: 'interest',
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
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                key: 'time'
            }       
        ]
        const columns4 = [
            {
                title: 'id',   //表头标题
                key: 'id',
                dataIndex: 'id' //数据源
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex){
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state){
                    let config = {
                        '1': <Badge status="success" text="成功" />,
                        '2': <Badge status="error" text="报错" />,
                        '3': <Badge status="default" text="正常" />,
                        '4': <Badge status="processing" text="进行中" />,
                        '5': <Badge status="warning" text="警告" />,
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'interest',
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
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                render: (text, item) => {
                    //注意 this 为 render 方法内部的this
                    return <Button size="small" onClick={(item) => {this.handleDelete(item)}}>删除</Button>
                }
            }       
        ]

       return (
         <div>
             <Card title="头部固定">
                <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    scroll={{y: 240}}
                />
             </Card>
             <Card title="左侧固定" style={{margin: '10px 0'}}>
                <Table 
                    bordered
                    columns={columns2}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    scroll={{x: 1130}}
                />
             </Card>
             <Card title="表格排序" style={{margin: '10px 0'}}>
                <Table 
                    bordered
                    columns={columns3}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    onChange={this.handleChange}
                />
             </Card>
             <Card title="操作按钮" style={{margin: '10px 0'}}>
                <Table 
                    bordered
                    columns={columns4}
                    dataSource={this.state.dataSource}
                    pagination={false}
                />
             </Card>
         </div>  
       )
   }
}