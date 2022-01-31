export function dijkstra(grid, start, finish) {
    const orderedVisitedNodes = []
    start.distance = 0;
    const uncheckedNodes = grid.slice();

    while (!!uncheckedNodes.length) {
        sortNodes(uncheckedNodes);
        const currentNode = uncheckedNodes.shift();
        if (currentNode.distance === Infinity) return orderedVisitedNodes;
        currentNode.isVisited = true;
        orderedVisitedNodes.push(currentNode);
        if(currentNode === finish) return orderedVisitedNodes;
        getNeighbors(currentNode, grid);
    }

}

function sortNodes(nodes) {
    nodes.sort((A, B) => A.distance - B.distance);
    
}

function getNeighbors(currentNode, grid) {
    const neighbors = [];
    const column = currentNode.column;
    const row = currentNode.row;

    if(row < grid.length-1) {
        if(grid[row][column].isVisited === false) neighbors.push(grid[row+1][column]);
    }
    if(row > 0) {
        if(grid[row][column].isVisited === false) neighbors.push(grid[row-1][column]);
    }

    if (column > 0) {
        if(grid[row][column].isVisited === false) neighbors.push(grid[row][column-1]);
    }
    if(column < grid[0].length - 1) {
        if(grid[row][column].isVisited === false) neighbors.push(grid[row][column+1]);
    }

    for (const neighbor of neighbors) {
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
    }
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