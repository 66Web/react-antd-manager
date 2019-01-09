import React from 'react'
import {HashRouter as Router,Route,Switch} from 'react-router-dom' 
import Main from './Main';
import About from './About';
import Topics from './Topics';
// import User from './User';
import Info from './Info';
import Home from './Home'
import NoMatch from './NoMatch'

export default class IRouter extends React.Component{

    render(){
        return (
            <Router>
                <Home>
                    <Switch>
                        {/*根据导航配置找到对应的组件*/}
                        <Route path="/main" render={() => 
                            <Main>
                                <Route path="/main/:value" component={Info}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topics}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        )
    }
}