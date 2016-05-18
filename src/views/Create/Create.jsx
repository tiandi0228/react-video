'use strict';

import React from 'react';
import request from 'superagent';

// 创建任务
const Create = React.createClass({
    
    getInitialState () {
      return {
          prices: '1'
        };
    },
     
    handleChange () {
        const prices = this.refs.num.value;
        const n = prices * 0.0001;
        this.setState({prices: n.toFixed(2)});
    },
    
    // 关闭窗口
    close() {
        const oCreate = document.getElementById('create');
        const oMake = document.getElementById('make');
        oCreate.className = 'create';
        oMake.style.display = 'none';
    },
    
    handleSubmit(e) {
        e.preventDefault();
        const oPrice = document.getElementById('price');
        const oUrl = document.getElementById('url');
        const oNumber = document.getElementById('number');
        const isUrl =  /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g;
        const isNumber = /^\d+$/;
        const post = {
            price: this.refs.price.value,
            url: this.refs.url.value,
            num: this.refs.num.value
        }
        
        // 判断选择项目
        if(post['price'] === "0"){
            oPrice.nextSibling.innerHTML = '请选择项目';
            oPrice.nextSibling.style.color = 'red';
        }else{
            oPrice.nextSibling.innerHTML = '';
            oPrice.nextSibling.style.color = '';
        }
        
        // 判断视频地址
        if(!isUrl.test(post['url'])){
            oUrl.nextSibling.innerHTML = '请输入视频地址';
            oUrl.nextSibling.style.color = 'red';
        }else{
            oUrl.nextSibling.innerHTML = '';
            oUrl.nextSibling.style.color = '';
        }
        
        // 判断数量
        if(!isNumber.test(post['num'])){
            oNumber.nextSibling.innerHTML = '请输入整数';
            oNumber.nextSibling.style.color = 'red';
        }else if(post['num']<10000){
            oNumber.nextSibling.innerHTML = '最小数量是10000';
            oNumber.nextSibling.style.color = 'red';
        } else if(post['num']>10000000){
            oNumber.nextSibling.innerHTML = '最大数量是10000000';
            oNumber.nextSibling.style.color = 'red';
        }else{
            oNumber.nextSibling.innerHTML = '';
            oNumber.nextSibling.style.color = '';
        }
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
                                <select defaultValue="0" ref="price" id="price">
                                    <option value="0">请选择项目</option>
                                    <option value="0.0001" price="0.0001">优酷刷访问数[带指数]1元/1万</option>
                                </select>
                                <span></span>
                            </div>
                            <div className="ipt">
                                <label className="label-name">视频地址：</label>
                                <input type="text" className="url" id="url" ref="url" placeholder="请输入视频地址" />
                                <span></span>
                            </div>
                            <div className="ipt">
                                <label className="label-name">项目数量：</label>
                                <input type="number" name="number" className="number" id="number" ref="num" defaultValue={10000} onChange={this.handleChange} />
                                <span></span>
                            </div>
                            <div className="ipt">
                                <label className="label-name">总共价格：</label>
                                <span style={{color:'#ff000'}}>{this.state.prices} 元</span>
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