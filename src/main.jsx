'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import Home from './views/Home/Home.jsx';
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';
import Tasks from './views/Tasks/Tasks.jsx';
import Users from './views/Users/Users.jsx';
import User from './views/Users/User.jsx';
import Pay from './views/Pay/Pay.jsx';
import Record from './views/Users/Record.jsx';
import PageNotFound from './views/PageNotFound/PageNotFound.jsx'

class Main extends React.Component {
  render() {
    const styles = require('./main.css');
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
};

// 配置路由
render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="tasks" component={Tasks} />
      <Route path="users" component={Users} />
      <Route path="user/:id" component={User} />
      <Route path="record/:id" component={Record} />
      <Route path="pay" component={Pay} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Router>
), document.getElementById('app'), function () { console.log('渲染成功！') });