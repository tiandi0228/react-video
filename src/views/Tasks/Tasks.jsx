'use strict';

import React from 'react';
import cookie from 'react-cookie';
import $ from 'jquery';
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
            data: [],
            username: cookie.load('username'),
        };

        const username = this.state.username;

        // 获取列表
        request
            .get('http://www.api.com/task')
            .query({ username: + username })
            .end(function (err, res) {
                if (err) throw err;
                const tasks = JSON.parse(res.text);
                this.setState({ data: tasks });
            }.bind(this));
    }

    // 删除
    handleDel(e) {
        const r = confirm("确定要删除？");
        if (r == true) {
            const delIndex = e.target.getAttribute('data-key');
            request
                .del('http://www.api.com/delTask')
                .query({ id: + delIndex })
                .end(function (err, res) {
                    console.log(res);
                }.bind(this));
        }
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
        const tasksItems = this.state.data.map(function (item) {
            if (item) {
                return (
                    <ul key={item.id}>
                        <li>{item.id}</li>
                        <li title={item.url}>{item.url}</li>
                        <li>{item.initial}</li>
                        <li>{item.aims}</li>
                        <li>{item.complete}</li>
                        <li>{item.status}</li>
                        <li>{item.time}</li>
                        <li><a onClick={this.handleDel} data-key={item.id}>[删除]</a></li>
                    </ul>
                );
            } else {
                return (
                    <div className="no-data" key={item.id}>对不起，暂无数据！</div>
                )
            }
        }.bind(this));
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
                        {tasksItems}
                    </div>
                </div>
                <Create />
                <Footer />
            </div >
        )
    }
};

export default Tasks;