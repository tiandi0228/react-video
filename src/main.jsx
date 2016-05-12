import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import Header from './views/header.jsx';
import Login from './views/Login/Login.jsx';
import './assets/style/main.css';

class HelloWorld extends React.Component {
  render() {
    return (
        <div className="warp">
          <Login />
          <Header />
          <div>Hello World</div>
        </div>
        );
  }
}

render(<HelloWorld />, $('#content')[0]);
