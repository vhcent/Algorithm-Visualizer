import React, { Component } from 'react';
import "./Node.css";

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {isStart, isFinish, isWall} = this.props;
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
        return <div className={`node ${extraClassName}`}></div>
    }
}

