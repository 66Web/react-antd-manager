import React from 'react';
import {Card, Button, Radio} from 'antd'
import './ui.less'

class Buttons extends React.Component{

  state = {
      loading: true,
      size: 'default'
  }  
   
  handleCloseLoading = () =>{
      this.setState({
          loading: false
      })
  } 

  handleChange = (e) => {
      this.setState({
          size: e.target.value
      })
  }

  render(){
      return(
          <div>
              <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">提交</Button>  
                    <Button>普通</Button>
                    <Button type="dashed">非重要功能</Button>  
                    <Button type="danger">删除</Button>
                    <Button disabled>禁用</Button>             
              </Card>
              <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>  
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>  
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>               
              </Card>
              <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>  
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading} >点击加载</Button>  
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>               
              </Card>
              <Card title="按钮组" style={{marginBottom:10}}>
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>              
              </Card>
              <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group size={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imooc</Button>  
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>Imooc</Button>  
                    <Button type="danger" size={this.state.size}>Imooc</Button>               
              </Card>
          </div>
      );
  }
}
export default Buttons;