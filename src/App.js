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
        for (let row = 0; row < 15; row++) {
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
        );
    }
}
