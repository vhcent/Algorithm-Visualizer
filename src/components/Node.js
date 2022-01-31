import React, { Component } from 'react';
import "./Node.css";

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {row, column, isStart, isFinish, isWall} = this.props;
        var extraClassName='';
        if (isStart) {
            extraClassName='start';
            console.log("IS START WAS TRUE");
        }
        else if (isFinish) {
            extraClassName='finish';
        }
        else {
            extraClassName='';
        }
        return <div id={`node ${row} ${column}`} className={`node ${extraClassName}`}></div>
    }
}

