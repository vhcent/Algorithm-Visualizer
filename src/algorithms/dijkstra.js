export function dijkstra(grid, start, finish) {
    const orderedVisitedNodes = []
    start.distance = 0;
    console.log(grid.length);
    const uncheckedNodes = []

    for (let row of grid) {
        for (let node of row) {
            uncheckedNodes.push(node);
        }
    }

    console.log(uncheckedNodes);
    while (!!uncheckedNodes.length) {
        console.log("while loop");
        sortNodes(uncheckedNodes);
        const currentNode = uncheckedNodes.shift();

        if (currentNode.isWall) continue;

        if (currentNode.distance === Infinity) {
            return orderedVisitedNodes;
        }
        currentNode.isVisited = true;
        orderedVisitedNodes.push(currentNode);
        if(currentNode === finish) {
            return orderedVisitedNodes;
        }
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

    if(row > 0) {
        if(grid[row-1][column].isVisited === false) neighbors.push(grid[row-1][column]);
    }
    if(row < grid.length-1) {
        if(grid[row+1][column].isVisited === false) neighbors.push(grid[row+1][column]);
    }
    if (column > 0) {
        if(grid[row][column-1].isVisited === false) neighbors.push(grid[row][column-1]);
    }
    if(column < grid[0].length - 1) {
        if(grid[row][column+1].isVisited === false) neighbors.push(grid[row][column+1]);
    }

    for (let neighbor of neighbors) {
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
    }
}


export function getShortestPath(finish) {
    const shortestPath = [];
    let currentNode = finish;
    console.log("getShortestPath Called");
    while(currentNode !== null) {
        shortestPath.unshift(currentNode);
        console.log("C: " + currentNode.column + "R: " + currentNode.row);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}