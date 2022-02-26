import {getNeighbors, sortByDistance} from "./Helper";

export function dijkstra(grid, start, finish) {
    const orderedVisited = []
    start.distance = 0;
    const uncheckedNodes = []

    for (let row of grid) {
        for (let node of row) {
            uncheckedNodes.push(node);
        }
    }

    while (!!uncheckedNodes.length) {
        sortByDistance(uncheckedNodes);
        const currentNode = uncheckedNodes.shift();

        if (currentNode.isWall) continue;


        if (currentNode.distance === Infinity) {
            return orderedVisited;
        }
        currentNode.isVisited = true;
        orderedVisited.push(currentNode);
        if(currentNode === finish) {
            return orderedVisited;
        }
        let neighbors = getNeighbors(currentNode, grid);

        for (let neighbor of neighbors) {
            neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;
        }
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