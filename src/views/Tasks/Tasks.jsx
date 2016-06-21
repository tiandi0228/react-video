'use strict';

import React from 'react';
import cookie from 'react-cookie';
import $ from 'jquery';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';
import Create from './../Create/Create.jsx';
import Page from './../Common/Page.jsx';

// 任务
class Tasks extends React.Component {

    constructor(props) {
        super(props);

        // 初始
        this.state = {
            data: []
        };

        const email = cookie.load('email');

        // 获取列表
        $.ajax({
            url: 'http://www.api.com/Index/Task',
            type: 'GET',
            data: { email: email,limit: 12 },
            success: function (result) {
                this.setState({ data: result['data'] });
            }.bind(this)
        });
    }

    // 删除
    handleDel(e) {
        const r = confirm("确定要删除？");
        if (r === true) {
            const delIndex = e.target.getAttribute('data-key');
            $.ajax({
                url: 'http://www.api.com/Index/Task/Del',
                type: 'DELETE',
                dataType: 'text',
                data: { id: delIndex },
                success: function (result) {
                    $('#' + delIndex).fadeOut("slow");
                }
            });
        }
    }

    //添加
    create() {
        $(".create").animate({top: '150px',opacity: '1'},"slow");
        $(".make").css("display","block");

    }

    render() {
        const styles = require('./Tasks.css');
        let status;
        const tasksItems = this.state.data.map(function (item) {
            if(item.status === '运行'){
                status = <span style={{color:'red'}}>运行</span>;
            }else{
                status = <span style={{color:'rgb(62, 173, 5)'}}>完成</span>;
            }
            return (
                <ul key={item.id} id={item.id}>
                    <li>{item.id}</li>
                    <li title={item.url}>{item.url}</li>
                    <li>{item.initial}</li>
                    <li>{item.target}</li>
                    <li>{item.brush}</li>
                    <li>{status}</li>
                    <li>{item.time}</li>
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
                        </ol>
                        {tasksItems}
                        <Page total="10" />
                    </div>
                </div>
                <Create />
                <Footer />
            </div >
        )
    }
};

export default Tasks;