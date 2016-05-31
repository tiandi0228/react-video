'use strict';

import React from 'react';
import cookie from 'react-cookie';
import $ from 'jquery';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';
import Create from './../Create/Create.jsx';

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
        $.ajax({
            url: 'http://www.api.com/task',
            type: 'GET',
            data: { username: username },
            success: function (result) {
                this.setState({ data: result });
            }.bind(this)
        });
    }

    // 删除
    handleDel(e) {
        const r = confirm("确定要删除？");
        if (r === true) {
            const delIndex = e.target.getAttribute('data-key');
            $.ajax({
                url: 'http://www.api.com/delTask',
                type: 'GET',
                dataType: 'text',
                data: { id: delIndex },
                success: function (response) {
                    $('#' + delIndex).fadeOut("slow");
                }
            });
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
            return (
                <ul key={item.id} id={item.id}>
                    <li>{item.id}</li>
                    <li title={item.url}>{item.url}</li>
                    <li>{item.initial}</li>
                    <li>{item.target}</li>
                    <li>{item.brush}</li>
                    <li>{item.status}</li>
                    <li>{item.time}</li>
                    <li><a onClick={this.handleDel} data-key={item.id}>[删除]</a></li>
                </ul>
            );
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
                            <li>已刷数量</li>
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