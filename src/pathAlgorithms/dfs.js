import {getNeighbors} from "./Helper";

export function dfs(grid, start, finish) {
    const orderedVisited = [];
    
    const uncheckedNodes = [];
    for (let row of grid) {
        for (let node of row) {
            uncheckedNodes.push(node);
        }
    }
    recursiveHelper(grid, start, finish, orderedVisited);

    // for(let i = 1; i < orderedVisited.length; i++) {
    //     if(orderedVisited[i] === start) break;
    //     orderedVisited[i].previousNode = orderedVisited[i - 1];
    // }
    return orderedVisited;
}

function recursiveHelper(grid, currentNode, finish, orderedVisited) {
    currentNode.isVisited = true;

    orderedVisited.push(currentNode);
    let neighbors = getNeighbors(currentNode, grid);
    while (neighbors.length !== 0) {
        if (orderedVisited[orderedVisited.length - 1] === finish) {
            return;
        }
        let neighbor = neighbors.pop()
        neighbor.previousNode = currentNode;
        recursiveHelper(grid, neighbor, finish, orderedVisited);
    }
    return;
}
    
// export function getShortestPath(orderedVisited, start) {
//     const shortestPath = [];
//     shortestPath = orderedVisited;
//     // let currentNode = finish;
//     // while(currentNode !== null) {
//     //     shortestPath.unshift(currentNode);
//     //     currentNode = currentNode.previousNode;
//     // }
//     return shortestPath;
// }