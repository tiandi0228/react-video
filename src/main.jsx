'use strict';

import React from 'react';
import { render } from 'react-dom';
import cookie from 'react-cookie';
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';

// 默认
const Video = React.createClass({

  componentDidMount: function () {
    console.log(cookie.load('username'));
  },

  render: function () {
    const styles = require('./main.css');
    return (
      <div>
        <Register />
        <Login />
      </div>
    );
  }
});

render(<Video />, document.getElementById('app'), function () { console.log('渲染成功！') });