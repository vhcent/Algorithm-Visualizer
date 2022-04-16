let walls = [];
export function horizontalMaze(grid, start, finish) {
    walls = [];
    // console.log("horizontal maze called")
    let cols = range(grid[0].length);
    let rows = range(grid.length);
    // console.log(cols);

    getWalls(rows, cols, start, finish, grid);
    return walls;
}

function getWalls(rows, cols, start, finish, grid) {
    if(rows < 2) return;
    let rand = Math.random();
    console.log("rand ", rand);
    for(let rowIndex of rows) {
        if (rowIndex % 2 === 0 && rand < 0.5 ) {
            
            pushWall(rowIndex, cols, start, finish, grid);
        }
        if (rowIndex % 2 !== 0 && rand >= 0.5 ) {
            
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
            console.log("No Wall: ", rowIndex, colIndex);
            continue;
        }
        else {
            // console.log("wall pushed at ", colIndex, " ", rowIndex);
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