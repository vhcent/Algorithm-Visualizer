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
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
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
                                    {row.map((node, nodeIndex) => (
                                        <Node></Node>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
        );
    }
}