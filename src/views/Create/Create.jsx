'use strict';

import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';

// 创建任务
class Create extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prices: '1.00 元',
            money: '',
            amounts: '',
            username: cookie.load('username'),
        };

        // 获取金额
        $.ajax({
            url: 'http://www.api.com/user',
            type: 'POST',
            data: { username: this.state.username },
            success: function (result) {
                const user = result[0];
                this.setState({
                    money: user.money
                });
            }.bind(this)
        });
    }

    // 验证金额
    handleChange(e) {
        e.preventDefault();
        const num = this.refs.num.value;
        const price = this.refs.price.value;
        const n = num * price;
        const amount = this.state.money - n.toFixed(2);
        if (price != '0') {
            this.setState({ prices: n.toFixed(2) + ' 元' });
        }
        if (n > parseFloat(this.state.money)) {
            this.setState({ prices: '余额不足！' });
        } else {
            this.setState({ amounts: amount });
        }
    }

    // 关闭窗口
    close() {
        $(".create").animate({top: '-300px',opacity: '1'},"slow");
        $(".make").css("display","none");
    }

    // 验证是否默认金额
    handleChangeSelect(e){
        e.preventDefault();
        const price = this.refs.price.value;
        const num = this.refs.num.value;
        const n = num * price;
        const amount = this.state.money - n.toFixed(2);
        if (price != "0") {
            this.setState({ amounts: amount});
        }
    }

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
        const n = post['num'] * post['price'];
        const amount = this.state.money - n.toFixed(2);
        console.log(amount);
        console.log(this.state.amounts);
        let flag = false;
        let flag1 = false;
        let flag2 = false;
        let flag3 = false;

        // 判断选择项目
        if (post['price'] === "0") {
            price.nextSibling.innerHTML = '请选择项目';
            price.nextSibling.style.color = 'red';
        } else {
            price.nextSibling.innerHTML = '';
            price.nextSibling.style.color = '';
            flag = true;
        }

        if (post['price'] != "0") {
            this.setState({ prices: n.toFixed(2) + ' 元' });
        }

        if (n > parseFloat(this.state.money)) {
            this.setState({ prices: '余额不足！' });
        } else {
            this.setState({ amounts: amount });
            flag1 = true;
        }

        // 判断视频地址
        if (!isUrl.test(post['url'])) {
            url.nextSibling.innerHTML = '请输入视频地址';
            url.nextSibling.style.color = 'red';
        } else {
            url.nextSibling.innerHTML = '';
            url.nextSibling.style.color = '';
            flag2 = true;
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
            flag3 = true;
        }

        if (flag && flag1 && flag2 && flag3) {
            // AJAX
            $.ajax({
                url: 'http://www.api.com/createTask',
                type: 'POST',
                data: { url: post['url'], target: post['num'], username: this.state.username, money: this.state.amounts },
                success: function () {
                    $(".create").animate({top: '-300px',opacity: '1'},"slow");
                    $(".make").css("display","none");
                }
            });
        };

    }

    handleReset() {
        document.form.reset();
    }

    render() {
        const styles = require('./Create.css');
        return (
            <div>
                <div className="create" id="create">
                    <div className="close" onClick={this.close}>X</div>
                    <div>
                        <form name="form" id="form" onSubmit={this.handleSubmit.bind(this) }>
                            <div className="ipt">
                                <label className="label-name">选择项目：</label>
                                <select defaultValue="0" ref="price" onChange={this.handleChangeSelect.bind(this) }>
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
                                <input type="number" className="number" ref="num" defaultValue={10000} onChange={this.handleChange.bind(this) } />
                                <span></span>
                            </div>
                            <div className="ipt">
                                <label className="label-name">总共价格：</label>
                                <span style={{ color: '#ff0000' }}>{this.state.prices}</span>
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
};

export default Create;