import {sortByDistance} from "./Helper";

export function dfs(grid, start, finish) {
    const orderedVisited = [];
    
    const uncheckedNodes = [];
    for (let row of grid) {
        for (let node of row) {
            uncheckedNodes.push(node);
        }
    }
    let recurseFinish;
    recurseFinish = recursiveHelper(grid, start, finish, orderedVisited);

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
            return true;
        }
        let neighbor = neighbors.pop()
        neighbor.previousNode = currentNode;
        recursiveHelper(grid, neighbor, finish, orderedVisited);
    }
    return;
}

export function getNeighbors(currentNode, grid) {
    const neighbors = [];
    const column = currentNode.column;
    const row = currentNode.row;

    if(row > 0) {
        if(grid[row-1][column].isVisited === false && grid[row-1][column].isWall === false) neighbors.push(grid[row-1][column]);
    }
    if(row < grid.length-1) {
        if(grid[row+1][column].isVisited === false && grid[row+1][column].isWall === false) neighbors.push(grid[row+1][column]);
    }
    if (column > 0) {
        if(grid[row][column-1].isVisited === false && grid[row][column-1].isWall === false) neighbors.push(grid[row][column-1]);
    }
    if(column < grid[0].length - 1) {
        if(grid[row][column+1].isVisited === false && grid[row][column+1].isWall === false) neighbors.push(grid[row][column+1]);
    }

    return neighbors;
}
    
export function getShortestPath(orderedVisited, start) {
    const shortestPath = [];
    shortestPath = orderedVisited;
    // let currentNode = finish;
    // while(currentNode !== null) {
    //     shortestPath.unshift(currentNode);
    //     currentNode = currentNode.previousNode;
    // }
    return shortestPath;
}