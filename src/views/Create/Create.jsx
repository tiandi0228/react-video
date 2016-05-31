'use strict';

import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';

// 创建任务
const Create = React.createClass({

    getInitialState() {
        return {
            prices: '1.00',
            username: cookie.load('username'),
        };
    },

    handleChange() {
        const num = this.refs.num.value;
        const price = this.refs.price.value;
        if (price != '0') {
            const n = num * price;
            this.setState({ prices: n.toFixed(2) });
        }
    },

    // 关闭窗口
    close() {
        const oCreate = document.getElementById('create');
        const oMake = document.getElementById('make');
        clearInterval(oCreate.timer);
        oCreate.timer = setInterval(function () {
            if (oCreate.offsetTop == -300) {
                clearInterval(oCreate.timer);
            } else {
                var iSpeed = (-300 - oCreate.offsetTop) / 6;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                oCreate.style.top = oCreate.offsetTop + iSpeed + 'px';
                oMake.style.display = 'none';
            }
        }, 100)
    },

    // 验证
    handleSubmit(e) {
        e.preventDefault();
        const price = this.refs.price;
        const url = this.refs.url;
        const num = this.refs.num;
        const isUrl = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g;
        const isNumber = /^\d+$/;
        const post = {
            price: price.value,
            url: url.value,
            num: num.value
        }

        // 判断选择项目
        if (post['price'] === "0") {
            price.nextSibling.innerHTML = '请选择项目';
            price.nextSibling.style.color = 'red';
        } else {
            price.nextSibling.innerHTML = '';
            price.nextSibling.style.color = '';
        }

        if (post['price'] != "0") {
            const n = post['num'] * post['price'];
            this.setState({ prices: n.toFixed(2) });
        }

        // 判断视频地址
        if (!isUrl.test(post['url'])) {
            url.nextSibling.innerHTML = '请输入视频地址';
            url.nextSibling.style.color = 'red';
        } else {
            url.nextSibling.innerHTML = '';
            url.nextSibling.style.color = '';
        }

        // 判断数量
        if (!isNumber.test(post['num'])) {
            num.nextSibling.innerHTML = '请输入整数';
            num.nextSibling.style.color = 'red';
        } else if (post['num'] < 10000) {
            num.nextSibling.innerHTML = '最小数量是10000';
            num.nextSibling.style.color = 'red';
        } else if (post['num'] > 10000000) {
            num.nextSibling.innerHTML = '最大数量是10000000';
            num.nextSibling.style.color = 'red';
        } else {
            num.nextSibling.innerHTML = '';
            num.nextSibling.style.color = '';
        }

        // AJAX
        $.ajax({
            url: 'http://www.api.com/createTask',
            type: 'POST',
            data: { url: post['url'], target: post['num'], username: this.state.username, price: this.state.prices },
            success: function (data) {
                console.log('添加成功');
            }
        });
    },

    handleReset() {
        document.form.reset();
    },

    render() {
        const styles = require('./Create.css');
        return (
            <div>
                <div className="create" id="create">
                    <div className="close" onClick={this.close}>X</div>
                    <div>
                        <form name="form" id="form" onSubmit={this.handleSubmit}>
                            <div className="ipt">
                                <label className="label-name">选择项目：</label>
                                <select defaultValue="0" ref="price">
                                    <option value="0">请选择项目</option>
                                    <option value="0.0001">优酷刷访问数[带指数]1元/1万</option>
                                </select>
                                <span></span>
                            </div>
                            <div className="ipt">
                                <label className="label-name">视频地址：</label>
                                <input type="text" className="url" ref="url" placeholder="请输入视频地址" />
                                <span></span>
                            </div>
                            <div className="ipt">
                                <label className="label-name">项目数量：</label>
                                <input type="number" className="number" ref="num" defaultValue={10000} onChange={this.handleChange} />
                                <span></span>
                            </div>
                            <div className="ipt">
                                <label className="label-name">总共价格：</label>
                                <span style={{ color: '#ff0000' }}>{this.state.prices} 元</span>
                            </div>
                            <div className="ipt">
                                <button type="submit" className="btn">添 加</button>
                                &nbsp; &nbsp; &nbsp;
                                <button type="reset" onClick={this.handleReset}>重 置</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="make" id="make"></div>
            </div>
        )
    }
});

export default Create;