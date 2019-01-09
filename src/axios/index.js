import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
import Utils from './../utils/utils'

export default class Axios{

     static requestList(_this, url, params, isMock){
         var data = {
             params: params,
             isMock //使用Mock数据
         }
         this.ajax({
             url,
             data
         }).then((data) => {
             if(data && data.list){
                let list = data.list.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    selectedRowKeys: [],//重置
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
             }
         })
     }

     static jsonp(options){
         new Promise((resolve, reject) => {
             JsonP(options.url,{
                 param:'callback'
             }, function (err, response) {
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
             })
         })
     }

     static ajax(options){
         let loading;
         if(options.data && options.data.isShowLoading !== false){
             loading = document.getElementById('ajaxLoading');
             loading.style.display = 'block';
         }
         let baseApi = 'https://www.easy-mock.com/mock/5c2c7c1b580d6209d1e2aa88/mockapi'
         //  let baseApi = '';
         //  if(options.isMock){
         //      baseApi = 'https://www.easy-mock.com/mock/5c2c7c1b580d6209d1e2aa88/mockapi'
         //  }else{
         //      baseApi = 'https://www.easy-mock.com'//改为真实的服务端接口地址
         //  }
         
         return new Promise((resolve,reject) => {
              axios({
                    url: options.url,
                    method:'get',
                    baseURL: baseApi,
                    timeout: 5000,
                    params: (options.data && options.data.params) || ''
              }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status === 200){
                      let res = response.data;
                      if(res.code === 0){
                          resolve(res);
                      }else{
                          Modal.info({
                              title: '提示',
                              content: res.msg
                          })
                      }   
                }else{
                      reject(response.data)
                }
              })
         });
     }
}