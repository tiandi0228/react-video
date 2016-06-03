'use strict';

import React from 'react';
import request from 'superagent';

// 充值教程
class Recharge extends React.Component {

    constructor(props) {
        super(props);

        // 初始
        this.state = {
            data: []
        };

        // AJAX
        request
            .get('video.json')
            .end(function (err, res) {
                if (err) throw err;
                var recharge = JSON.parse(res.text).recharge;
                this.setState({ data: recharge });
            }.bind(this));
    }

    render() {
        const styles = require('./Common.css');
        const rechargeItems = this.state.data.map(function (item) {
            return (
                <li key={item.id}>{item.content}</li>
            );
        });
        return (
            <div className="recharge mt20">
                <div className="tit">充值</div>
                <div className="con">
                    <ul>
                        {rechargeItems}
                    </ul>
                </div>
            </div>
        )
    }
};

export default Recharge;