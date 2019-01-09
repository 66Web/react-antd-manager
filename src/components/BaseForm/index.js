import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../utils/utils'
const FormItem = Form.Item;

class FilterForm extends React.Component{
    
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        const {getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item, i) => {
                 let label = item.label;
                 let field = item.field;
                 let initialValue = item.initialValue || '';
                 let placeholder = item.placeholder;
                 let width = item.width;
                 if(item.type === '时间查询'){
                    const begin_time = <FormItem label="订单时间" key='begin'>
                            {
                                getFieldDecorator('begin_time')(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                    </FormItem>;
                    formItemList.push(begin_time);
                    //~后省略冒号：label="~" colon={false} 
                    const end_time = <FormItem key='end'>
                            {
                                getFieldDecorator('end_time')(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                    </FormItem>;
                    formItemList.push(end_time);
                 }else if(item.type == 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                          {
                               getFieldDecorator([field])(
                                  <Input type="text" style={{width: width}} placeholder={placeholder}/>
                               )
                          }
                    </FormItem>;
                    formItemList.push(INPUT);
                }else if(item.type === 'SELECT'){
                     const SELECT = <FormItem label={label} key='select_id'>
                           {
                                getFieldDecorator([field],{
                                    initialValue: initialValue
                                })(
                                    <Select
                                        style={{width: width}}
                                        placeholder={[placeholder]}
                                    >
                                        {Utils.getOptionList(item.list)}
                                    </Select>
                                )
                           }
                     </FormItem>;
                     formItemList.push(SELECT);
                 }else if(item.type === 'CHECKBOX'){
                    const CHECKBOX = <FormItem label={label} key={field}>
                          {
                               getFieldDecorator([field],{
                                   valuePropName: 'checked',
                                   initialValue: initialValue //true | false
                               })(
                                   <Checkbox>
                                       {label}
                                   </Checkbox>
                               )
                          }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                }else if(item.type === 'DATE'){
                    const DATEPICKER = <FormItem label={label} key={field}>
                          {
                               getFieldDecorator([field])(
                                   <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                               )
                          }
                    </FormItem>;
                    formItemList.push(DATEPICKER);
                }
            })
        }
        return formItemList;
    }

    render(){
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin:'0 10px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm)