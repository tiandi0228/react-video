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
            email: cookie.load('email'),
            preferential: ''
        },

        // 获取金额
        $.ajax({
            url: 'http://www.api.com/Index/Task/Create',
            type: 'GET',
            data: { email: this.state.email },
            success: function (result) {
                const user = result['data'][0];
                this.setState({
                    money: user.money,
                    preferential: user.preferential
                });
            }.bind(this)
        });
    }

    // 验证金额
    handleChange(e) {
        e.preventDefault();
        const num = this.refs.num.value;
        const price = this.refs.price.value;
        const n = num * price * this.state.preferential;
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
        $(".create").animate({top: '-300px',opacity: '0'},"10000");
        $(".make").css("display","none");
    }

    // 验证是否默认金额
    handleChangeSelect(e){
        e.preventDefault();
        const price = this.refs.price.value;
        const num = this.refs.num.value;
        const n = num * price * this.state.preferential;
        const amount = this.state.money - n.toFixed(2);
        if (price != "0") {
            this.setState({ amounts: amount});
        }

        const key = $("select").find("option:selected").attr("data-key");
        switch (key) {
            case 'youku':
                $('.tips').fadeIn("slow");
                $('.tips').html('<p>优酷地址：http://v.youku.com/v_show/id_XMTU4OTg4MTc4MA==.html</p>');
                break;
            default:
                $('.tips').fadeOut("slow");
        }
    }

    // 验证
    handleSubmit(e) {
        e.preventDefault();
        const price = this.refs.price;
        const url = this.refs.url;
        const num = this.refs.num;
        const isUrl = /v_show\/id_(.*?)\.html/i;///^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g;
        const isNumber = /^\d+$/;
        const post = {
            price: price.value,
            url: url.value,
            num: num.value
        }
        const n = post['num'] * post['price'] * this.state.preferential;
        const amount = this.state.money - n.toFixed(2);
        let flag = false;
        let flag1 = false;
        let flag2 = false;
        let flag3 = false;

        // 判断选择项目
        if (post['price'] === "0") {
            $('.prices .error').fadeIn("slow");
            $('.prices .error').html('<span>请选择项目</span>')
        } else {
            $('.prices .error').fadeOut("slow");
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
            $('.url .error').fadeIn("slow");
            $('.url .error').html("<span>请输入正确的视频地址</span>")
        } else {
            $('.url .error').fadeOut("slow");
            flag2 = true;
        }

        // 判断数量
        if (!isNumber.test(post['num'])) {
            $('.num .error').fadeIn("slow");
            $('.num .error').html("<span>请输入购买数量</span>")
        } else if (post['num'] < 10000) {
            $('.num .error').fadeIn("slow");
            $('.num .error').html("<span>最小数量是10000</span>")
        } else if (post['num'] > 10000000) {
            $('.num .error').fadeIn("slow");
            $('.num .error').html("<span>最大数量是10000000</span>")
        } else {
            $('.num .error').fadeOut("slow");
            flag3 = true;
        }

        if (flag && flag1 && flag2 && flag3) {
            // 创建任务
            $.ajax({
                url: 'http://www.api.com/Index/Task/Create',
                type: 'POST',
                data: { url: post['url'], target: post['num'], email: this.state.email, money: this.state.amounts },
                success: function () {
                    $(".create").animate({top: '-300px',opacity: '1'},"slow");
                    $(".make").css("display","none");
                    location.reload();
                }
            });

            // 提交消费记录
            $.ajax({
                url: 'http://www.api.com/Index/Pay',
                type: 'POST',
                data: { num: post['num'], email: this.state.email, money: n },
                success: function () {
                   console.log('成功');
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
                            <div className="ipt prices">
                                <label className="label-name">选择项目：</label>
                                <select defaultValue="0" ref="price" onChange={ this.handleChangeSelect.bind(this) }>
                                    <option value="0">请选择项目</option>
                                    <option value="0.0001" data-key="youku">优酷刷访问数[带指数]1元/1万</option>
                                </select>
                                <div className="error"></div>
                            </div>
                            <div className="ipt url">
                                <label className="label-name">视频地址：</label>
                                <input type="text" className="url" ref="url" placeholder="请输入视频地址" />
                                <div className="error"></div>
                                <div className="tips"></div>
                            </div>
                            <div className="ipt num">
                                <label className="label-name">项目数量：</label>
                                <input type="number" className="number" ref="num" defaultValue={10000} onChange={this.handleChange.bind(this) } />
                                <div className="error"></div>
                            </div>
                            <div className="ipt">
                                <label className="label-name">总共价格：</label>
                                <span className="prices">{this.state.prices}</span>
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