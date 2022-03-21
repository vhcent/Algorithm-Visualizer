export function sortByDistance(nodes) {
    nodes.sort((A, B) => A.distance - B.distance);
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

export function getShortestPath(finish) {
    const shortestPath = [];
    let currentNode = finish;
    while(currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}