/**
 * 引入createStore保存数据源
 */

import {createStore} from 'redux'
import reducer from './../reducer'
//调试工具插件方法
// import { composeWithDevTools } from 'redux-devtools-extension'  

export default () => createStore(reducer)
