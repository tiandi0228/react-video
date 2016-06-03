'use strict';

import React from 'react';
import request from 'superagent';

// 说明
class Explain extends React.Component {

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
                var explain = JSON.parse(res.text).explain;
                this.setState({ data: explain });
            }.bind(this));
    }

    render() {
        const styles = require('./Common.css');
        const explainItems = this.state.data.map(function (item) {
            return (
                <li key={item.id}>{item.content}</li>
            );
        });
        return (
            <div className="recharge mt20">
                <div className="tit">说明</div>
                <div className="con">
                    <ul>
                        {explainItems}
                    </ul>
                </div>
            </div>
        )
    }
};

export default Explain;