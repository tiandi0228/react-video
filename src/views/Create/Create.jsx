'use strict';

import React from 'react';
import request from 'superagent';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

// 创建任务
class Create extends React.Component {

    // 关闭窗口
    close(e) {
        const oCreate = document.getElementById('create');
        const oMake = document.getElementById('make');
        oCreate.className = 'create';
        oMake.style.display = 'none';
    }

    handleChange(value) {
        console.log('selected', value);
    }

    onChange(value) {
        console.log('changed', value);
    }

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
                        <FormItem
                            {...formItemLayout}
                            label="购买项目：">
                            <Select showSearch
                                style={{ width: width }}
                                placeholder="请选择要购买的项目"
                                optionFilterProp="children"
                                validateStatus="error"
                                hasFeedback="true"
                                onChange={this.handleChange}>
                                <Option value="1">优酷移动端[带指数](1元) /10000</Option>
                                <Option value="2">土豆移动端[带指数](1元) /10000</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="视频地址：">
                            <Input style={{ width: width }} id="defaultInput" placeholder="请输入视频地址" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="访问数量：">
                            <InputNumber style={{ width: width }} min={1} max={10000000} defaultValue={3} onChange={this.onChange} />
                        </FormItem>
                    </div>
                </div>
                <div className="make" id="make"></div>
            </div>
        )
    }
};

export default Create;