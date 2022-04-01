let walls = [];
export function horizontalMaze(grid, start, finish) {
    console.log("horizontal maze called")
    let cols = range(grid[0].length);
    let rows = range(grid.length);

    getWalls(rows, cols, start, finish, grid);
    return walls;
}

function getWalls(rows, cols, start, finish, grid) {
    if(rows < 1) return;
    let rand = Math.floor(Math.random());
    for(let rowIndex of rows) {
        if (rowIndex % 2 === 0 && rand < 0.5 ) {
            console.log("wall pushed");
            pushWall(rowIndex, cols, start, finish, grid);
        }
        if (rowIndex % 2 !== 0 && rand >= 0.1 ) {
            console.log("wall pushed");
            pushWall(rowIndex, cols, start, finish, grid);
        }
    }
}


function pushWall(rowIndex, cols, start, finish, grid) {
    let initialWalls = [];
    let isEndpoint = false;
    for (let colIndex of cols) {
        if(rowIndex === start.row & colIndex === start.column || rowIndex === finish.row & colIndex === finish.column) {
            isEndpoint = true;
            continue;
        }
        else {
            initialWalls.push(grid[rowIndex][colIndex]);
        }
        
    }
    if (!isEndpoint) {
        initialWalls.splice(Math.floor(Math.random() * initialWalls.length), 1)
    }

    for (let node of initialWalls) {
        walls.push(node);
    }
}

function range(length) {
    let temp = [];
    for (let i = 0; i < length; i++) {
        temp.push(i);
    }
    return temp;
}