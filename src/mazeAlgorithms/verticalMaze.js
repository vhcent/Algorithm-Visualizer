let walls = [];
export function verticalMaze(grid, start, finish) {
    walls = [];
    let cols = range(grid[0].length);
    let rows = range(grid.length);
    walls.push(grid[0][0]);
    getWalls(rows, cols, start, finish, grid);
    walls.push(grid[17][49]);
    return walls;
}

function getWalls(rows, cols, start, finish, grid) {
    if(cols < 2) return;
    let rand = Math.random();
    for(let colIndex of cols) {
        if (colIndex % 2 === 0 && rand < 0.5 ) {
            //console.log("wall pushed");
            pushWall(colIndex, rows, start, finish, grid);
        }
        if (colIndex % 2 !== 0 && rand >= 0.5 ) {
            //console.log("wall pushed");
            pushWall(colIndex, rows, start, finish, grid);
        }
    }
}


function pushWall(colIndex, rows, start, finish, grid) {
    let initialWalls = [];
    let isEndpoint = false;
    for (let rowIndex of rows) {
        if(colIndex === start.row & rowIndex === start.column || rowIndex === finish.row & colIndex === finish.column) {
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