import React, {Component} from 'react';

var Page = React.createClass({
    getInitialState: function() {
        return {current: 1, value : ''};
    },
    handClick : function(e){
        let sel = this;
        return function(){
            sel.setState({current : e});
        }
    },
    handChange : function(e){
        this.setState({value : e.target.value})
    },
    goNext : function(){
        let cur = this.state.current;
        if(cur < this.props.total){
            this.setState({current : cur + 1});
        }
    },
    goPrev : function(){
        let cur = this.state.current;
        if(cur > 1){
            this.setState({current : cur - 1});
        }
    },
    goPage : function(){
        var val = this.state.value;
        if(!/^[1-9]\d*$/.test(val)){
            alert('页码只能输入大于1的正整数');
        }else if(parseInt(val) > parseInt(this.props.total)){
            alert('没有这么多页');
        }else{
            this.setState({current : val});
        }
    },
    render : function(){
        let self = this;
        let total = this.props.total;
        let cur = this.state.current;
        let items = [];
        let begin;
        let len;
        if(total > 5){
            len = 5;
            if(cur >= (total-2)){
                begin = total - 4;
            }else if(cur <= 3){
                begin = 1;
            }else{
                begin = cur - 2;
            }
        }else{
            len = total;
            begin = 1;
        }
        for(let i = 0; i < len; i ++){
            let cur = this.state.current;
            let showI = begin + i;
            if(cur == showI){
                items.push({num : showI, cur : true});
            }else{
                items.push({num : showI, cur : false});
            }
            
        }
        return  <div className="ui-pagnation">
                    <a className={this.state.current == 1? 'prev disable' : 'prev'} onClick={this.goPrev}></a>
                    <span className="pagnation-cols">
                        {
                            items.map(function(item){
                                return <a onClick={self.handClick(item.num)} className={item.cur? 'num current' : 'num'}>{item.num}</a>
                            })
                        }
                    </span>
                    <a className={this.state.current == this.props.total? 'next disable' : 'next'} onClick={this.goNext}></a>
                    <div className="fl">
                        共
                        <span className="num-total">{total}</span>
                        页，到第
                        <input type="text" value={self.state.value} onChange={this.handChange} />
                        页
                    </div>
                    <a onClick={this.goPage} className="page-go">确定</a>
                </div>
    }
});

export default Page;