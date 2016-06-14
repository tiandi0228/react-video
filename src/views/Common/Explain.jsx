'use strict';

import React from 'react';
import request from 'superagent';

// 等级和折扣
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
                <ul key={item.id}>
                    <li>{item.level}</li>
                    <li>{item.discount}</li>
                </ul>
            );
        });
        return (
            <div className="explain mt20">
                <div className="tit">等级和折扣</div>
                <div className="con">
                    {explainItems}
                </div>
            </div>
        )
    }
};

export default Explain;