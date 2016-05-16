'use strict';

import React from 'react';
import request from 'superagent';

// 价格
class Price extends React.Component {

    constructor() {
        super();

        // 初始
        this.state = {
            data: []
        };
        // AJAX
        request
            .get('video.json')
            .end(function (err, res) {
                if (err) throw err;
                var price = JSON.parse(res.text).price;
                this.setState({ data: price });
            }.bind(this));
    }

    render() {
        const styles = require('./Common.css');
        const priceItems = this.state.data.map(function (item) {
            return (
                <ul key={item.id}>
                    <li>{item.name}</li>
                    <li>{item.content}</li>
                    <li>{item.status}</li>
                </ul>
            );
        });
        return (
            <div className="price fr">
                <div className="tit">价格</div>
                <div className="con">

                    {priceItems}

                </div>
            </div>
        )
    }
};

export default Price;