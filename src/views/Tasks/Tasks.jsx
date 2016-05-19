'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';
import Create from './../Create/Create.jsx';
import request from 'superagent';

// 任务
class Tasks extends React.Component {
    
    constructor() {
        super();
        
        // 初始
        this.state = {
            data: []
        };
        
        // AJAX
        request
            .get('video.json')
            .end(function (err, res) {
                if (err) throw err;
                var price = JSON.parse(res.text).price;
                this.setState({data: price});
            }.bind(this));
    }
    
    //添加
    create(e) {
        e.preventDefault();
        const oCreate = document.getElementById('create');
        const oMake = document.getElementById('make');
        clearInterval(oCreate.timer);
        oCreate.timer = setInterval(function () {
            if (oCreate.offsetTop == 150) {
                clearInterval(oCreate.timer);
            } else {
                var iSpeed = (150 - oCreate.offsetTop) / 6;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                oCreate.style.top = oCreate.offsetTop + iSpeed + 'px';
                oMake.style.display = 'block';
            }
        }, 100)
    }
    
    render() {
        const styles = require('./Tasks.css');
        const noticeItems = this.state.data.map(function (item) {
            return (
                <ul key={item.id}>
                    <li>{item.id}</li>
                    <li title={item.content}>{item.content}</li>
                    <li>10000</li>
                    <li>20000</li>
                    <li>19999</li>
                    <li>{item.status}</li>
                    <li>2016-05-19</li>
                    <li>[删除]</li>
                </ul>
            );
        });
        return (
            <div>
                <Header />
                <div className="tasks">
                    <div className="tit">
                        <h2 className="fl">任务</h2>
                        <span className="fr" onClick={this.create}>添加</span>
                    </div>
                    <div className="list">
                        <ol>
                            <li>编号</li>
                            <li>视频地址</li>
                            <li>初始数量</li>
                            <li>目标数量</li>
                            <li>完成数量</li>
                            <li>状态</li>
                            <li>创建于</li>
                            <li>操作</li>
                        </ol>
                        {noticeItems}
                    </div>
                </div>
                <Create />
                <Footer />
            </div >
        )
    }
};

export default Tasks;