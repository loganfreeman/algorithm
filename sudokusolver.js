/**
 * This is an implementation of a backtracking algorithm to solve a 9x9 soduku puzzle
 *
 * @type {SudokuSolver}
 */

var SudokuSolver = function (){
    var UNASSIGNED = 0;

    function solve(puzzle) {
        // TODO check for valid puzzle

        var location = {
            row: 0,
            col: 0
        };

        if(!findNextLocation(puzzle, location)) {
            return true; // No more unassigned locations, must be solved
        }

        // Iterate through possible choices
        for(var num = 1; num <= 9; num++) {
            if(noConflicts(puzzle, location, num)) {  // Check for conflicts
                puzzle[location.row][location.col] = num;  // No conflicts, assign num and try to solve the rest of the puzzle

                // Try to solve the rest of the puzzle with this solution
                if(solve(puzzle)) {
                    // Solved!
                    return true;
                }

                // Solution not valid
                // Backtrack and try a different number
                puzzle[location.row][location.col] = UNASSIGNED;
            }
        }
        return false;
    }

    function findNextLocation(puzzle, location) {
        for(var i = 0; i < puzzle.length; i++) {
            var row = puzzle[i];

            for(var j = 0; j < row.length; j++) {
                if(row[j] === UNASSIGNED) {
                    location.row = i;
                    location.col = j;
                    return true;
                }
            }
        }
        return false;
    }

    function noConflicts(puzzle, location, num) {
        return checkRow(puzzle, location.row, num) &&
            checkCol(puzzle, location.col, num) &&
            checkSq(puzzle, location.row, location.col, num);
    }

    function checkRow(puzzle, row, num) {
        for(var i = 0; i < 9; i ++) {
            if(puzzle[row][i] === num) {
                return false;
            }
        }
        return true;
    }

    function checkCol(puzzle, col, num) {
        for(var i = 0; i < 9; i ++) {
            if(puzzle[i][col] === num) {
                return false;
            }
        }
        return true;
    }

    function checkSq(puzzle, row, col, num) {
        for(var i = row - (row % 3); i < 3; i++) {
            for(var j = col - (col % 3); j < 3; j++) {
                if(puzzle[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    return {
        solve: solve
    }
}();

