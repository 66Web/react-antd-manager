import React from 'react';
import {Link} from 'react-router-dom'

class Home extends React.Component{
  render(){
      return( 
              <div>
                  {/*页面导航的配置*/}
                  <ul>
                      <li>
                          <Link to="/main">Home</Link>
                      </li>
                      <li>
                          <Link to="/about">About</Link>
                      </li>
                      <li>
                          <Link to="/topics">Topics</Link>
                      </li>
                      <li>
                          <Link to="/imooc">Imooc1</Link>
                      </li>
                  </ul>
                  <hr />
                  {/*找到路由匹配的组件后呈现的位置*/}
                  {this.props.children}  
              </div> 
      );
  }
}
export default Home;　