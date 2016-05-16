'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';

// 首页
class Tasks extends React.Component {

    render() {
        const styles = require('./Tasks.css');
        return (
            <div>
                <Header />
                <div className="tasks">
                    <div className="tit">
                        <h2 className="fl">任务</h2>
                        <span className="fr">添加</span>
                    </div>
                </div>
                <Footer />
            </div >
        )
    }
};

export default Tasks;