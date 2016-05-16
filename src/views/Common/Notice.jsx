'use strict';

import React from 'react';
import request from 'superagent';

// 公告
class Notice extends React.Component {
   
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
                var notice = JSON.parse(res.text).notice;
                this.setState({data: notice});
            }.bind(this));
    }

    render() {
        const styles = require('./Common.css');
        const noticeItems = this.state.data.map(function (item) {
            return (
                <li key={item.id}>{item.content}</li>
            );
        });
        return (
            <div className="notice fl">
                <div className="tit">公告</div>
                <div className="con">
                    <ul>
                        {noticeItems}
                    </ul>
                </div>
            </div>
        )
    }
};

export default Notice;