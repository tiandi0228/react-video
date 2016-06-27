'use strict';

import React from 'react';
import cookie from 'react-cookie';
import $ from 'jquery';
import hex_md5 from 'md5';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 用户信息
class User extends React.Component {

     constructor(props) {
        super(props);

        // 初始
        this.state = {
            id:' ',
            email: '',
            money: '',
            username: '',
            group:'',
            groups: [],
            groupId: '',
            gid: '',
            oldPassword: ''
        };

        // 登录权限
        $.ajax({
            url: 'http://www.api.com/Index/User',
            type: 'GET',
            data: { email: cookie.load('email') },
            success: function (result) {
                this.setState({
                    groupId: result['data']['group_id']
                });
            }.bind(this)
        });

        let id = this.props.params.id;

        // 查询数据
        $.ajax({
            url: 'http://www.api.com/Index/User',
            type: 'GET',
            data: { email: id },
            success: function (result) {
                const user = result['data'];
                this.setState({
        	       id: user.id,
                    email: user.email,
                    money: user.money,
                    username: user.username,
                    oldPassword: user.password,
                    group: user.group,
                    gid: user.group_id
                });
            }.bind(this)
        });

        // 查询用户组
        $.ajax({
            url: 'http://www.api.com/Index/User/Group',
            type: 'GET',
            success: function (result) {
                    this.setState({groups: result['data']});
            }.bind(this)
        });
    }

    // 验证昵称
    handleChange(e) {
        e.preventDefault();
        $.ajax({
            url:'http://www.api.com/Index/User/Edit',
            type: 'GET',
            data: { username: this.refs.username.value},
            success: function (result) {
                const res = JSON.parse(result);
                if(res['code'] === 200){
                    $('.username .tips').html("<span class='success'>"+res['message']+"</span>");
                    $('.username .tips .success').css({'display':'block'});
                    $('.username .tips .error').css({'display':'none'});
                }else{
                    $('.username .tips').html("<span class='error'>"+res['message']+"</span>");
                    $('.username .tips .error').css({'display':'block'});
                    $('.username .tips .success').css({'display':'none'});
                }
            }.bind(this)
        });
    }

    // 改变金额
    handleChangeMoney(e){
        e.preventDefault();
        this.setState({money:this.refs.money.value});
    }

    handleChangeGroups(e){
        e.preventDefault();
        this.setState({gid:this.refs.groups.value});
    }

    // Tab
    tab(){
        const $span = $('.tab span');
        const $con = $('.edit');
        $span.click(function(){
            const $this = $(this);
            const $t = $this.index();
            $span.removeClass();
            $this.addClass('cur');
            $con.css('display','none');
            $con.eq($t).css('display','block');
        })
    }

    // 提交修改信息
    handleSubmit(e){
        e.preventDefault();
        let username = this.refs.username;
        let groups = this.refs.groups;
        let money = this.refs.money;

        if(username.value === '')
        {
            $('.username .tips').html("<div class='error'>请输入昵称!</div>");
            $('.username .tips .error').fadeIn("slow");
        }

        if(username !== undefined){
            username = username.value;
         }else{
            username = this.state.username;
         }

         if(groups !== undefined || money !== undefined){
            groups = groups.value;
            money = money.value;
        }else{
            groups = this.state.gid;
            money = this.state.money;
        }

        $.ajax({
            url:'http://www.api.com/Index/User/Edit',
            type: 'POST',
            data: { id: this.state.id, username: username, group_id: groups, money: money },
            success: function (result) {
                alert('修改成功!');
                location.reload();
            }.bind(this)
        });    
    }

    // 修改密码
    handleChangeSubmitPW(e){
        e.preventDefault();
        let oldPassword = this.refs.oldPassword.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;

        if(this.state.gid !== '1'){
            // 验证旧密码是否为空
            if(oldPassword.length === 0){
                $('.oldPassword .tips').html("<div class='error'>请输入旧密码!</div>");
                $('.oldPassword .tips .error').fadeIn("slow");
                return false;
            }

            // 判断旧密码正确性
            if(this.state.oldPassword !== hex_md5(oldPassword)){
                $('.oldPassword .tips').html("<div class='error'>请输入正确的旧密码!</div>");
                $('.oldPassword .tips .error').fadeIn("slow");
                return false;
            }
        }

        // 判断密码长度
        if (password.length < 6){
            $('.password .tips').html("<div class='error'>密码长度不能小于6位!</div>");
            $('.password .tips .error').fadeIn("slow");
            return false;
        }else if(password.length > 32){
            $('.password .tips').html("<div class='error'>密码长度不能大于32位!</div>");
            $('.password .tips .error').fadeIn("slow");
            return false;
        }else{
            $('.password .tips .error').fadeOut("slow");
        };

        if (password !== confirmPassword){
            $('.confirmPassword .tips').html("<div class='error'>两次填写的密码不一致!</div>");
            $('.confirmPassword .tips .error').fadeIn("slow");
            return false;
        }else{
            $('.confirmPassword .tips .error').fadeOut("slow");
        };

        $.ajax({
            url:'http://www.api.com/Index/User/ChangePassword',
            type: 'POST',
            data: { id: this.state.id, password: password },
            success: function (result) {
                alert('修改成功!');
                location.reload();
            }.bind(this)
        }); 
    }

    render() {
        const styles = require('./User.css');
        let nickname;
        let prompt;
        let group;
        let gold;

        // 输出用户组
        const groups = this.state.groups.map(function (item) {
            return (
                <option value={item.id} key={item.id} >{item.group}</option>
            );
        }.bind(this));

        // 判断昵称
        if(this.state.username === ''){
            nickname = <input type="text" ref="username" onChange={this.handleChange.bind(this)} />;
            prompt = <div className='error' style={{display:'block'}}>只能修改一次！</div>;
        }else{
            nickname = <span className="username">{this.state.username}</span>;
            prompt = <span></span>;
        }
        // 判断用户组
        if (this.state.groupId === '1'){
            group = <select ref="groups" value={this.state.gid} onChange={this.handleChangeGroups.bind(this)}>{groups}</select>;
        }else{
            group = <span className="group">{this.state.group}</span>;
        }
        // 判断金额
        if(this.state.groupId === '1'){
            gold = <input type="text" ref="money" value={this.state.money} onChange={this.handleChangeMoney.bind(this)} />;
        }else{
            gold = <span className="prices">{this.state.money}</span>;
        }

        return (
            <div>
                <Header />
                <div className="user-edit">
                    <div className="tab" onClick={this.tab}>
                        <span className="cur">个人资料</span>
                        <span>修改密码</span>
                    </div>
                    <div className="edit">
                        	 <div className="ipt username">
                	        <label>昵称：</label>
                                   {nickname}
                                   <div className="tips">{prompt}</div>
                        	 </div>
                            <div className="ipt">
                                    <label>邮箱：</label>
                                    <span className="email">{this.state.email}</span>
                            </div>
                            <div className="ipt">
                                    <label>用户组：</label>
                                    {group}
                            </div>
                            <div className="ipt">
                                    <label>金额：</label>
                                    {gold}
                            </div>
                            <div className="ipt">
                                    <button type="submit" className="btn" onClick={this.handleSubmit.bind(this)}>修 改</button>
                            </div>
                    </div>
                    <div className="edit changePassword">
                            <div className="ipt oldPassword">
                                    <label>旧密码：</label>
                                    <input type="password" ref="oldPassword" />
                                    <div className="tips"></div>
                            </div>
                            <div className="ipt password">
                                    <label>新密码：</label>
                                    <input type="password" ref="password" />
                                    <div className="tips"></div>
                            </div>
                            <div className="ipt confirmPassword">
                                    <label>确认密码：</label>
                                    <input type="password" ref="confirmPassword" />
                                    <div className="tips"></div>
                            </div>
                            <div className="ipt">
                                    <button type="submit" className="btn" onClick={this.handleChangeSubmitPW.bind(this)}>修 改</button>
                            </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default User;