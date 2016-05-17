'use strict';

import React from 'react';
import request from 'superagent';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Select, Button } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

// 创建任务
const Create = React.createClass({

    // 关闭窗口
    close(e) {
        const oCreate = document.getElementById('create');
        const oMake = document.getElementById('make');
        oCreate.className = 'create';
        oMake.style.display = 'none';
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    },

    render() {
        const styles = require('./Create.css');
        const width = '100%';
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <div className="create" id="create">
                    <div className="close" onClick={this.close}>X</div>
                    <div>
                        <Form horizontal form={this.props.form}>
                            <FormItem
                                {...formItemLayout}
                                label="购买项目：">
                                <Select showSearch
                                    style={{ width: width }}
                                    placeholder="请选择要购买的项目"
                                    optionFilterProp="children"
                                    validateStatus="error"
                                    hasFeedback="true"
                                    >
                                    <Option value="1">优酷移动端[带指数]1元/1万</Option>
                                    <Option value="2">土豆移动端[带指数]1元/1万</Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="视频地址：">
                                <Input {...urlProps} style={{ width: width }} placeholder="请输入视频地址" onChange={this.onInput} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="目标数量：">
                                <InputNumber style={{ width: width }} min={1} max={10000000} defaultValue={10000} onChange={this.onChange} />
                            </FormItem>
                            <FormItem
                                wrapperCol={{ span: 12, offset: 7 }} >
                                <Button type="primary" onClick={this.handleSubmit}>添 加</Button>
                                &nbsp; &nbsp; &nbsp;
                                <Button type="ghost" onClick={this.handleReset}>重 置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className="make" id="make"></div>
            </div>
        )
    }
});

export default Create;