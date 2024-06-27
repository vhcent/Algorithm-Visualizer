let walls = []
export function recursiveDivision(grid, start, finish) {
    console.log("recursive called");
    walls = [];
    pushOuterWalls(grid);
    let minRow = 1;
    let minCol = 1;
    let maxRow = grid.length - 1;
    let maxCol = grid[0].length - 2;
    pushRecursiveWalls(minRow, maxRow, minCol, maxCol, grid, start, finish);
    console.log("walls", walls);
    return walls;
}

function pushRecursiveWalls(minRow, maxRow, minCol, maxCol, grid, start, finish) {
    if (maxRow - minRow <= 2 || maxCol - minCol <= 2) return;
    let direction;
    let rand;
    if (maxRow - minRow > maxCol - minCol) {
        direction = 0; //make horizontal wall
        rand = Math.floor(Math.random() * (maxCol-minCol)) + minCol;
        if(rand % 2 == 1) rand++;
        let iRow = Math.floor((maxRow + minRow) / 4) * 2 + 1;
        // if(iRow === maxRow-1) iRow--;
        // else iRow++;
        for(let iCol = minCol; iCol < maxCol; iCol++) {
            if(iCol === rand) continue;
            if(iRow === start.row & iCol === start.column || iRow === finish.row & iCol === finish.column) {
                continue;
            }
            console.log("iRow", iRow, "iCol", iCol);
            walls.push(grid[iRow][iCol]);
        }
        pushRecursiveWalls(minRow, iRow, minCol, maxCol, grid, start, finish);
        pushRecursiveWalls(iRow + 1, maxRow, minCol, maxCol, grid, start, finish);

    }
    else {
        direction = 1;
        rand = Math.floor(Math.random() * (maxRow - minRow)) + minRow;
        if(rand % 2 == 1) rand++;
        let iCol = Math.floor((maxCol + minCol) / 4) * 2 + 1;
        // if(iCol === maxCol-1) iCol--;
        // else iCol++;
        for (let iRow = minRow; iRow < maxRow; iRow++) {
            if (iRow === rand) continue;
            if(iRow === start.row & iCol === start.column || iRow === finish.row & iCol === finish.column) {
                continue;
            }
            walls.push(grid[iRow][iCol]);
        }
        pushRecursiveWalls(minRow, maxRow, minCol, iCol, grid, start, finish);
        pushRecursiveWalls(minRow, maxRow, iCol + 1, maxCol, grid, start, finish);
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

