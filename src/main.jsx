import React from 'react';
import { render } from 'react-dom';
import Login from './views/Login/Login.jsx';

// 默认
const Video = React.createClass({
  render: function () {
    const styles = require('./main.css');
    return (
      <div>
          <Login />
      </div>
    );
  }
});

render(<Video />, document.getElementById('app'), function () { console.log('渲染成功！') });