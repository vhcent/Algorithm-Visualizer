import React, { Component } from 'react';
import "./Node.css";

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {row, column, isStart, isFinish, isWall, nodeColor} = this.props;
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
        // console.log('R:' + row + ": " + column);
        return <div style={{ backgroundColor: nodeColor}} id={`node-${row}-${column}`} className={`node ${extraClassName}`}></div>
    }
}

