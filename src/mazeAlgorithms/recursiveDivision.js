let walls = []
export function recursiveDivision(grid, start, finish) {
    console.log("recursive called");
    walls = [];
    pushOuterWalls(grid);
    return walls;
}

function pushOuterWalls(grid) {
    let width = grid[0].length;
    let height = grid.length;
    for (let i = 0; i < height; i++) {
        if (i == 0 || i == height - 1) {
            for (let j = 0; j < width; j++) {
                walls.push(grid[i][j]);
            }
        }
        else {
            walls.push(grid[i][0]);
            walls.push(grid[i][width-1]);
        }
    }
}

