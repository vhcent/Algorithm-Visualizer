//import { render } from "@testing-library/react";
import React from "react";
import "./App.css";

//components
import Node from "./components/Node";

//algorithms
import { dijkstra, getShortestPath } from "./algorithms/dijkstra";
import {astar} from "./algorithms/astar";
import {bfs} from "./algorithms/bfs";

let startRow = 5;
let startColumn = 10;
let finishRow = 10;
let finishColumn = 40;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            visited: [],
            speed: 5,
            mousePressed: false,
            moveStart: false,
            moveFinish: false,
            nodeType: "Wall", // Can be "Wall", "LightWeight", or "HeavyWeight"
            running: false,
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
                    isStart: row === startRow && column === startColumn,
                    isFinish: row === finishRow && column === finishColumn,
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                    isLightWeight: false,
                    isHeavyWeight: false,
                    previousNode: null,
                    mouseDown: false,
                    mouseEnter: false,
                    mouseUp: false,
                    //astar
                    fcost: Infinity, //distance from startNode to node to endNode
                    gcost: Infinity, //distance from startNode
                    hcost: Infinity, //distance from End Node
                };
                currentRow.push(currentNode);
            }
            grid.push(currentRow);
        }
        this.setState({ grid: grid });
    }

    setWall() {
        this.setState({nodeType: "Wall"})
    }
    setLightWeight() {
        this.setState({nodeType: "LightWeight"})
    }
    setHeavyWeight() {
        this.setState({nodeType: "HeavyWeight"})
    }

    clearWalls() {
        const newGrid = this.state.grid.slice();
        for (let row of newGrid) {
            for (let node of row) {
                node.isWall = false;
            }
        }
        this.setState({ grid: newGrid });
    }

    clearWeights() {
        const newGrid = this.state.grid.slice();
        for (let row of newGrid) {
            for (let node of row) {
                node.isLightWeight = false;
                node.isHeavyWeight = false;
            }
        }
        this.setState({ grid: newGrid });
    }

    clearPath() {
        const newGrid = this.state.grid.slice();
        for (let row of newGrid) {
            for (let node of row) {
                node.isVisited = false;
                node.fcost = Infinity;
                node.gcost = Infinity;
                node.hcost = Infinity;
                node.distance = Infinity;
                node.previousNode = null;
                if(!node.isLightWeight && !node.isHeavyWeight && !node.isWall && !node.isStart && !node.isFinish) {
                    document.getElementById(
                        `node-${node.row}-${node.column}`
                    ).className = `node`;
                }
            }
        }
        this.setState({ grid: newGrid });
    }

    resetBoard() {
        this.clearWalls();
        this.clearWeights();
        this.clearPath();
        const newGrid = this.state.grid.slice();
        for (let row of newGrid) {
            for(let node of row) {
                if(node.isStart) {
                    node.isStart = false;
                }
                if(node.isFinish) {
                    node.isFinish = false;
                }
            }
        }

        startRow = 5;
        startColumn = 10;
        finishRow = 10;
        finishColumn = 40; 

        newGrid[startRow][startColumn].isStart = true;
        newGrid[finishRow][finishColumn].isFinish = true;

        this.setState({ grid: newGrid });

    }

    handleMouseDown(row, column) {
        if (this.state.running) return;
        const updatedGrid = this.state.grid.slice();
        if (updatedGrid[row][column].isStart) {
            this.setState({ moveStart: true });
        } else if (updatedGrid[row][column].isFinish) {
            this.setState({ moveFinish: true });
        } else {
            if(this.state.nodeType === "Wall")
            {
                updatedGrid[row][column].isLightWeight = false;
                updatedGrid[row][column].isHeavyWeight = false;
                updatedGrid[row][column].isWall =
                !this.state.grid[row][column].isWall;
                
            }
            else if(this.state.nodeType === "LightWeight")
            {
                updatedGrid[row][column].isWall = false;
                updatedGrid[row][column].isHeavyWeight = false;
                updatedGrid[row][column].isLightWeight =
                !this.state.grid[row][column].isLightWeight;
            }

            else if(this.state.nodeType === "HeavyWeight")
            {
                console.log("HeavyWieight Selected");
                updatedGrid[row][column].isWall = false;
                updatedGrid[row][column].isLightWeight = false;
                updatedGrid[row][column].isHeavyWeight =
                !this.state.grid[row][column].isHeavyWeight;
            }
            
        }
        this.setState({ grid: updatedGrid, mousePressed: true });
    }
    handleMouseEnter(row, column) {
        if (this.state.running) return;
        if (this.state.mousePressed) {
            const updatedGrid = this.state.grid.slice();
            if (this.state.moveStart) {
                updatedGrid[startRow][startColumn].isStart = false;
                updatedGrid[row][column].isStart = !updatedGrid[row][column].isStart;
                startRow = row;
                startColumn = column;
            } else if (this.state.moveFinish) {
                updatedGrid[finishRow][finishColumn].isFinish = false;
                updatedGrid[row][column].isFinish = !updatedGrid[row][column].isFinish;
                finishRow = row;
                finishColumn = column;
            } else if (this.state.nodeType === "Wall") {
                updatedGrid[row][column].isLightWeight = false;
                updatedGrid[row][column].isHeavyWeight = false;
                updatedGrid[row][column].isWall =
                    !this.state.grid[row][column].isWall;
            }
            else if (this.state.nodeType === "LightWeight")
            {
                updatedGrid[row][column].isWall = false;
                updatedGrid[row][column].isHeavyWeight = false;
                updatedGrid[row][column].isLightWeight =
                !this.state.grid[row][column].isLightWeight;
            }
            else if(this.state.nodeType === "HeavyWeight")
            {
                updatedGrid[row][column].isWall = false;
                updatedGrid[row][column].isLightWeight = false;
                updatedGrid[row][column].isHeavyWeight =
                !this.state.grid[row][column].isHeavyWeight;
            }
            this.setState({ grid: updatedGrid, mousePressed: true });
        }
    }
    handleMouseUp() {
        if (this.state.running) return;
        this.setState({ mousePressed: false, moveStart: false, moveFinish: false });
    }

    visualizeDijkstra() {
        this.setState({running: true});
        this.clearPath();
        const grid = this.state.grid;
        const start = grid[startRow][startColumn];
        const finish = grid[finishRow][finishColumn];
        this.visualizeSearch(dijkstra(grid, start, finish));
    }

    visualizeAStar() {
        this.setState({running: true});
        this.clearPath();
        const grid = this.state.grid;
        const start = grid[startRow][startColumn];
        const finish = grid[finishRow][finishColumn];
        this.visualizeSearch(astar(grid, start, finish));
    }
    visualizeBFS() {
        this.clearWeights();
        this.setState({running: true});
        this.clearPath();
        const grid = this.state.grid;
        const start = grid[startRow][startColumn];
        const finish = grid[finishRow][finishColumn];
        this.visualizeSearch(bfs(grid, start, finish));
    }

    visualizeSearch(visitedNodesInOrder) {
        const grid = this.state.grid;
        const finish = grid[finishRow][finishColumn];
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (visitedNodesInOrder[i].isLightWeight || visitedNodesInOrder[i].isHeavyWeight)
                {
                    continue;
                }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (i === visitedNodesInOrder.length - 1)
                    this.visualizeShortestPath(getShortestPath(finish));
                
                if (i !== 0 && i !== visitedNodesInOrder.length - 1) {
                    document.getElementById(
                        `node-${node.row}-${node.column}`
                    ).className = "node node-visited";
                }
            }, i * this.state.speed);
        }
    }

    visualizeShortestPath(shortestPath) {
        for (let i = 0; i < shortestPath.length; i++) {
            if (shortestPath[i].isLightWeight || shortestPath[i].isHeavyWeight)
                {
                    continue;
                }
            setTimeout(() => {
                const node = shortestPath[i];

                if (i !== 0 && i !== shortestPath.length - 1) {
                    document.getElementById(
                        `node-${node.row}-${node.column}`
                    ).className = "node node-shortest-path";
                }
            }, i * this.state.speed * 5);

            if (i >= shortestPath.length - 1)
            {
                this.setState({running: false})
            }
        }
    }

    render() {
        const grid = this.state.grid;

        return (
            <div className="header">
                <div className="title">Pathfinding Algorithm Visualizer</div>
                <div className="dropdown-container">
                    <div className="dropdown">
                        Algorithms
                        <div className="dropdown-content">
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.visualizeDijkstra()}
                            >
                                Dijkstra's Algorithm
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.visualizeAStar()}
                            >
                                A* Algorithm
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.visualizeBFS()}
                            >
                                Breadth-First Search (clears weights)
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.visualizeAStar()}
                            >
                                Depth-First Search (clears weights)
                            </button>
                        </div>
                    </div>
                    <div className="dropdown">
                        Terrain
                        <div className="dropdown-content">
                            <button
                                disabled={this.state.running}
                                className="dropdown-button"
                                onClick={() => {}}
                            >
                                Recursive Maze
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
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
                                disabled={this.state.running}
                                onClick={() => {
                                    this.setState({ speed: 100 });
                                }}
                            >
                                Slow
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => {
                                    this.setState({ speed: 50 });
                                }}
                            >
                                Medium
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => {
                                    this.setState({ speed: 5 });
                                }}
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
                                disabled={this.state.running}
                                onClick={() => this.resetBoard()}
                            >
                                Reset Board
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.clearWalls()}
                            >
                                Clear Walls
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.clearWeights()}
                            >
                                Clear Weights
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.clearPath()}
                            >
                                Clear Path
                            </button>
                        </div>
                    </div>
                    <div className="dropdown">
                        Node
                        <div className="dropdown-content">
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.setWall()}
                            >
                                Wall
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.setLightWeight()}
                            >
                                Light Weight
                            </button>
                            <button
                                className="dropdown-button"
                                disabled={this.state.running}
                                onClick={() => this.setHeavyWeight()}
                            >
                                Heavy Weight
                            </button>
                        </div>
                    </div>
                </div>
                <div className="spacing"></div>
                <div className="grid">
                    {grid.map((row, rowIndex) => {
                        return (
                            <div class="row">
                                {row.map((node, nodeIndex) => {
                                    // console.log("row: " + rowIndex + "col: " + nodeIndex);
                                    const {
                                        // row,
                                        // column,
                                        isFinish,
                                        isStart,
                                        isWall,
                                        isLightWeight,
                                        isHeavyWeight,
                                    } = node;
                                    return (
                                        <Node
                                            key={nodeIndex}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            isLightWeight={isLightWeight}
                                            isHeavyWeight={isHeavyWeight}
                                            row={rowIndex}
                                            column={nodeIndex}
                                            onMouseDown={(row, column) =>
                                                this.handleMouseDown(
                                                    row,
                                                    column
                                                )
                                            }
                                            onMouseEnter={(row, column) =>
                                                this.handleMouseEnter(
                                                    row,
                                                    column
                                                )
                                            }
                                            onMouseUp={() =>
                                                this.handleMouseUp()
                                            }
                                        ></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}