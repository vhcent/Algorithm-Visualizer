let walls = []
export function recursiveDivision(grid, start, finish) {
    console.log("recursive called");
    walls = [];
    pushOuterWalls(grid);
    let minRow = 1;
    let minCol = 1;
    let maxRow = grid.length - 2;
    let maxCol = grid[0].length - 2;
    pushRecursiveWalls(minRow, maxRow, minCol, maxCol, grid, start, finish)
    return walls;
}

function pushRecursiveWalls(minRow, maxRow, minCol, maxCol, grid, start, finish) {
    if (maxRow - minRow < 2 || maxCol - minCol < 2) return;
    let direction;
    let rand;
    if (maxRow - minRow > maxCol - minCol) {
        direction = 0;
    }
    else {
        direction = 1;
    }
}

function pushOuterWalls(grid) {
    let width = grid[0].length;
    let height = grid.length;
    for (let i = 0; i < height; i++) {
        if (i === 0 || i === height - 1) {
            for (let j = 0; j < width; j++) {
                if (grid[i][j].isStart || grid[i][j].isFinish) continue;
                walls.push(grid[i][j]);
            }
        }
        else {
            if (!(grid[i][0].isStart || grid[i][0].isFinish))
                walls.push(grid[i][0]);
                if (!(grid[i][width - 1].isStart || grid[i][width - 1].isFinish))
            walls.push(grid[i][width-1]);
        }
    }
}

