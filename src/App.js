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
            grid: [],
            visited: [],
            speed: 10,
            mousePressed: false
        };
    }

    componentDidMount() {
        const grid = [];
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
                    previousNode: null,
                    mouseDown: false,
                    mouseEnter: false,
                    mouseUp: false,
                };
                currentRow.push(currentNode);
            }
            grid.push(currentRow);
        }
        // for(var i = 0; i < grid.length; i++) {
        //     console.log("node: " + grid[i].print());
        // }
        // console.log("NODES: " + grid);
        this.setState({ grid: grid });
    }

    handleMouseDown(row, column) {

        const updatedGrid = this.state.grid.slice();
        if (updatedGrid[row][column].isStart || updatedGrid[row][column].isFinish) return;
        updatedGrid[row][column].isWall = !this.state.grid[row][column].isWall;
        this.setState({grid: updatedGrid, mousePressed: true});
    }
    handleMouseEnter(row, column) {
        if (this.state.mousePressed) {
            const updatedGrid = this.state.grid.slice();
            if (updatedGrid[row][column].isStart || updatedGrid[row][column].isFinish) return;
            updatedGrid[row][column].isWall = !this.state.grid[row][column].isWall;
            this.setState({grid: updatedGrid, mousePressed: true});

        }
    }
    handleMouseUp() {
        this.setState({ mousePressed:false});
    }

    visualizeDijkstra() {
        const grid = this.state.grid
        const start = grid[5][10];
        const finish = grid[10][40];
        this.visualizeSearch(dijkstra(grid, start, finish));
        console.log("Visited: " + this.state.visited);
        // this.visualizeShortestPath(getShortestPath(finish));
    }

    visualizeSearch(visitedNodesInOrder) {
        const grid = this.state.grid
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
            }, i * this.state.speed);
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
            }, i * this.state.speed * 5);
        }
    }

    render() {
        const grid = this.state.grid;

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
                                onClick={() => {this.state.speed = 100}}
                            >
                                Slow
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {this.state.speed = 50}}
                            >
                                Medium
                            </button>
                            <button
                                className="dropdown-button"
                                onClick={() => {this.state.speed = 10}}
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
                                        const {row, column, isFinish, isStart, nodeColor, isWall} = node;
                                        return (
                                        <Node
                                        key={nodeIndex}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        row = {rowIndex}
                                        column = {nodeIndex}
                                        onMouseDown={(row, column) => this.handleMouseDown(row, column)}
                                        onMouseEnter={(row, column) => this.handleMouseEnter(row, column)}
                                        onMouseUp={() => this.handleMouseUp()}>
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