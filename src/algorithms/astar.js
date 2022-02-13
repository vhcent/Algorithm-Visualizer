import {getNeighbors} from "./Helper";

class PriorityQueue 
{
    constructor() {
        this.array = [];
    }

    push(node) {
        var addSuccessful = false;
        for(let i = 0; i < this.array.length; i++) {
            if(node.fcost < this.array[i].fcost) {
                this.array.splice(i, 0, node);
                addSuccessful = true;
                break;
            }
        }
        if(!addSuccessful) {
            this.array.push(node);
        }
    }

    pop() {
        if(this.array.length === 0) return;
        return this.array.shift();
    }

    size() {
        return this.array.length;
    }

    front()
    {
        if(this.array.length === 0) return;
        return this.array[0]
    }

    end()
    {
        if(this.array.length === 0) return;
        return this.array[this.array.length - 1]
    }

    includes(node) {
        return this.array.includes(node); //returns true or false
    } 
} 

export function astar(grid, start, finish) {
    let pQueue = new PriorityQueue();

    start.gcost = 0;
    start.hcost = distance(start, finish);
    start.fcost = start.gcost + start.hcost;
    
    pQueue.push(start);

    const orderedVisited = [];

    while(pQueue.size() > 0) {
        const currentNode = pQueue.pop();

        if (currentNode.isWall) continue;

        currentNode.visited = true;
        orderedVisited.push(currentNode);

        const neighbors = getNeighbors(currentNode, grid);

        if (currentNode === finish) return orderedVisited;

        for(let neighbor of neighbors) {
            if(currentNode.gcost + 1 < neighbor.gcost) {
                console.log("loop 1");
                neighbor.previousNode = currentNode;
                neighbor.gcost = currentNode.gcost + 1;
                neighbor.hcost = distance(neighbor, finish);
                neighbor.fcost = neighbor.gcost + neighbor.hcost;
                if(!pQueue.includes(neighbor)) {
                    pQueue.push(neighbor);
                    console.log("neighbor pushed");
                }
            }
        }
        
    }

    return orderedVisited;
}


function distance(node1, node2) {
    return Math.sqrt(Math.pow(node2.row - node1.row, 2) + Math.pow(node2.column - node1.column, 2));
}