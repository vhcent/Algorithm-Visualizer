//import { render } from "@testing-library/react";
import React from "react";
import "./App.css";

//components
import Node from "./components/Node";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 18; row++) {
            const currentRow = [];
            for (let column = 0; column < 50; column++) {
                const currentNode = {
                    column, 
                    row, 
                    isStart: row == 10 && column == 10, 
                    isFinish: row == 10 && column == 40,
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        // for(var i = 0; i < nodes.length; i++) {
        //     console.log("node: " + nodes[i].print());
        // }
        // console.log("NODES: " + nodes);
        this.setState({ nodes: nodes });
    }

    render() {
        const grid = this.state.nodes;

        return (
                <div className="header">
                    <div className="title">
                        Pathfinding Algorithm Visualizer
                    </div>
                    <div className="dropdown-container">
                    <div className="dropdown">
                        Algorithms
                        <div className="dropdown-content">
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Dijkstra's
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                A*
                            </button>
                        </div>
                    </div>
                    <div className="dropdown">
                        Terrain
                        <div className="dropdown-content">
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Recursive Maze
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                A*
                            </button>
                        </div>
                    </div>
                    <div className="dropdown">
                        Speed
                        <div className="dropdown-content">
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Slow
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Medium
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Fast
                            </button>
                        </div>
                    </div>
                    <div className="dropdown">
                        Reset
                        <div className="dropdown-content">
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Reset Board
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Clear Walls
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Clear Path
                            </button>
                        </div>
                    </div>
                    </div>
                    <div className="spacing">

                    </div>
                    <div className="grid">
                        {grid.map((row, rowIndex) => {
                            return (
                                <div class="row">
                                    {row.map((node, nodeIndex) => {
                                        const {isFinish, isStart} = node;
                                        return (
                                        <Node
                                        key={nodeIndex}
                                        isFinish={isFinish}
                                        isStart={isStart}>
                                        </Node>
                                        )
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
        );
    }
}

const createNode = (column, row) => {
    return {
        column,
        row,
        isStart: row === 10 && column === 10,
        isFinish: row === 10 && column === 30,
        isWall: false,
        
    }
}