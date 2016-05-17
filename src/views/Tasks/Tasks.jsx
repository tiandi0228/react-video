'use strict';

import React from 'react';
import Header from './../Common/Header.jsx';
import Footer from './../Common/Footer.jsx';
import Create from './../Create/Create.jsx';

// 任务
class Tasks extends React.Component {
    
    //添加
    create(e) {
        e.preventDefault();
        const oCreate = document.getElementById('create');
        const oMake = document.getElementById('make');
        oCreate.className = 'create cur';
        oMake.style.display = 'block';
    }

    render() {
        const styles = require('./Tasks.css');
        return (
            <div>
                <Header />
                <div className="tasks">
                    <div className="tit">
                        <h2 className="fl">任务</h2>
                        <span className="fr" onClick={this.create}>添加</span>
                    </div>
                </div>
                <Create />
                <Footer />
            </div >
        )
    }
};

export default Tasks;