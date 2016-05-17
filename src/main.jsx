'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Home from './views/Home/Home.jsx';
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';
import Tasks from './views/Tasks/Tasks.jsx';

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

render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="tasks" component={Tasks} />
    </Route>
  </Router>
), document.getElementById('app'), function () { console.log('渲染成功！') });