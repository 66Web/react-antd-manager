import React from 'react';
import {Card, Tabs, message, Icon} from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane;

export default class Tab extends React.Component{
    handleCallBack = (key) => {
        message.info("Hi,您选择了页签:"+key)
    }
    componentWillMount(){
        this.newTabIndex = 0;
        const panes = [
            {
                title: 'Tab 1',
                content: '欢迎使用柳柳版页签',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: '欢迎使用柳柳版页签',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: '欢迎使用柳柳版页签',
                key: '3'
            }
        ]
        this.setState({
            panes,
            activeKey: panes[0].key
        })
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    //onEdit、add、remove直接从官网复制过来即可
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }
    //activeKey:当前激活的key, targetKey:当前删除的Key
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallBack}>
                       <TabPane tab="Tab 1" key="1">欢迎使用柳柳版页签</TabPane>
                       <TabPane tab="Tab 2" key="2" disabled>欢迎使用柳柳版页签</TabPane>
                       <TabPane tab="Tab 3" key="3">欢迎使用柳柳版页签</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallBack}>
                       <TabPane tab={<span><Icon type="plus" />增加</span>} key="1">欢迎使用柳柳版页签</TabPane>
                       <TabPane tab={<span><Icon type="edit" />编辑</span>} key="2">欢迎使用柳柳版页签</TabPane>
                       <TabPane tab={<span><Icon type="delete" />删除</span>} key="3">欢迎使用柳柳版页签</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab动态的页签" className="card-wrap">
                    <Tabs 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey} 
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane 
                                     tab = {panel.title}
                                     key = {panel.key}     
                                >{panel.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}