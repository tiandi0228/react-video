'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class PageNotFound extends React.Component {
  render() {
    const styles = require('./PageNotFound.css');
    return (
      <div className="PageNotFound">
        <h1>对不起，没有找到页面！</h1>
        <p><Link to="/">返回首页</Link></p>
      </div>
    )
  }
};

export default PageNotFound;