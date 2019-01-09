import React from 'react'
import moment from 'moment'
import {Card,Form,Input,Button,Checkbox,Radio,InputNumber,Select,Switch,DatePicker,TimePicker,Upload,Icon,message} from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option;
const TextArea = Input.TextArea

class FormRegister extends React.Component {
    state = {
        loading: false,
    };
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
    }
    handleResetInfo = () => {
        this.props.form.resetFields();
    }
    //模拟上传jpg -- 直接从官网复制过来即可 
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg: imageUrl,
            loading: false,
          }));
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span:12, 
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows: 4, 
            maxRows: 6   
        }
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                           {
                                getFieldDecorator('userName', {
                                    initialValue:'Elena',
                                    rules:[
                                        {
                                            required: true,
                                            message:'用户名不能为空'
                                        }
                                    ]
                                })(
                                <Input placeholder="请输入用户名"/>
                                )
                            }  
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue:'123456',
                                    rules:[
                                        {
                                            required: true,
                                            message:'密码不能为空'
                                        }
                                    ]
                                })(
                                <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue:'1'
                                })(
                                   <RadioGroup>
                                       <Radio value="1">女</Radio>
                                       <Radio value="2">男</Radio>
                                   </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue:'18'
                                })(
                                   <InputNumber /> 
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue:'1'
                                })(
                                   <Select>
                                       <Option value="1">咸鱼一条</Option>
                                       <Option value="2">人民公仆</Option>
                                       <Option value="3">浙传才女一枚</Option>
                                       <Option value="4">科技公司FE</Option>
                                       <Option value="5">创业者</Option>
                                   </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue:['1','3','5']
                                })(
                                   <Select mode="multiple">
                                       <Option value="1">旅行</Option>
                                       <Option value="2">读书</Option>
                                       <Option value="3">剪辑</Option>
                                       <Option value="4">拍照</Option>
                                       <Option value="5">看电影</Option>
                                   </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                  <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2019-1-1 11:14:59')
                                })(
                                  <DatePicker 
                                       showTime
                                       format="YYYY-MM-DD HH:mm:ss"
                                  />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue: '西虹市海淀区桃花公园'
                                })(
                                  <TextArea 
                                      autosize={rowObject}
                                  />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                  <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                  <Upload
                                      listType="picture-card"
                                      showUploadList={false}
                                      action="//jsonplaceholder.typicode.com/posts/"
                                      onChange={this.handleChange}
                                  >
                                  {this.state.userImg?<img src={this.state.userImg}/>:<Icon type="plus"/>}
                                  </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('imooc')(
                                   <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                             <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                             <Button style={{marginLeft:10}} onClick={this.handleResetInfo}>重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(FormRegister);