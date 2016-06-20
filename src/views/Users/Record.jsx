'use strict';

import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 消费记录
class Record extends React.Component {

    constructor(props) {
        super(props);

        // 初始
        this.state = {
            data: []
        };

        let id = this.props.params.id;

        // 获取列表
        $.ajax({
            url: 'http://www.api.com/Index/User/Record',
            type: 'GET',
            data: { email: id },
            success: function (result) {
                this.setState({ data: result['data'] });
            }.bind(this)
        });
    }

    render() {
        const styles = require('./../Pay/Pay.css');
        let pay;
        const payItems = this.state.data.map(function (item) {
            if(item.content === '充值'){
                pay = <li>+{item.money}</li>;
            }else{
                pay = <li>-{item.money}</li>;
            }
            return (
                <ul key={item.id} id={item.id}>
                    <li>{item.time}</li>
                    <li>{item.content}</li>
                    {pay}
                    <li>{item.status}</li>
                </ul>
            );
        }.bind(this));
        return (
            <div>
                <Header />
                <div className="pays">
                    <div className="tit">
                        <h2 className="fl">消费记录</h2>
                    </div>
                    <div className="list">
                        <ol>
                            <li>消费日期</li>
                            <li>内容</li>
                            <li>金额</li>
                            <li>状态</li>
                        </ol>
                        {payItems}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Record;