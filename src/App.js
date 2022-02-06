//import { render } from "@testing-library/react";
import React from "react";
import "./App.css";

//components
import Node from "./components/Node";

//algorithms
import {dijkstra, getShortestPath} from "./algorithms/dijkstra"
import { wait } from "@testing-library/user-event/dist/utils";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            visited: [],
        };
        console.log("includes: " + this.state.visited.indexOf([11, 11]));
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 18; row++) {
            const currentRow = [];
            for (let column = 0; column < 50; column++) {
                const currentNode = {
                    column, 
                    row, 
                    isStart: row == 5 && column == 10, 
                    isFinish: row == 10 && column == 40,
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                    previousNode: null
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

    visualizeDijkstra() {
        const grid = this.state.nodes
        const start = grid[5][10];
        const finish = grid[10][40];
        this.visualizeSearch(dijkstra(grid, start, finish));
        console.log("Visited: " + this.state.visited);
        // this.visualizeShortestPath(getShortestPath(finish));
    }

    visualizeSearch(visitedNodesInOrder) {
        const grid = this.state.nodes
        const finish = grid[10][40];
        console.log(visitedNodesInOrder);
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                console.log("HI");
                if(i === visitedNodesInOrder.length - 1) this.visualizeShortestPath(getShortestPath(finish));
                if(i !== 0 && i !== visitedNodesInOrder.length - 1) {
                document.getElementById(`node-${node.row}-${node.column}`).className ='node node-visited';
                }
            }, i * 10);
        }  
    }

    visualizeShortestPath(shortestPath) {
        console.log(shortestPath);
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                
                if(i !== 0 && i !== shortestPath.length - 1) {
                    document.getElementById(`node-${node.row}-${node.column}`).className ='node node-shortest-path';
                }
            }, i * 50);
        }
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
                                onClick={() => this.visualizeDijkstra()}
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
                                        // console.log("row: " + rowIndex + "col: " + nodeIndex);
                                        const {row, column, isFinish, isStart, nodeColor} = node;
                                        return (
                                        <Node
                                        key={nodeIndex}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        row = {rowIndex}
                                        column = {nodeIndex}>
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

// const createNode = (column, row) => {
//     return {
//         column,
//         row,
//         isStart: row === 10 && column === 10,
//         isFinish: row === 10 && column === 30,
//         isWall: false,
        
//     }
// }