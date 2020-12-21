function sudoku(matrix) {
	if (solveSudoku(matrix) === true) {
		return matrix;
	}
	return "No solution found";
}

function solveSudoku(matrix) {
	var checkSpaces = false;
	for (var row = 0; row < matrix.length; row++) {
		for (var col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] === 0) {
				checkSpaces = true;
				break;
			}
		}

		if (checkSpaces === true) {
			break;
		}
	}

	if (checkSpaces === false) {
		return true;
	}

	for (var num = 1; num <= 9; num++) {
		if (isSafe(matrix, row, col, num)) {
			matrix[row][col] = num;
			if (solveSudoku(matrix)) {
				return true;
			}

			matrix[row][col] = 0;
		}
	}

	return false;
}

function isSafe(matrix, row, col, num) {
	return (
		!checkRow(matrix, row, num) &&
		!checkCol(matrix, col, num) &&
		!checkBox(matrix, row - (row % 3), col - (col % 3), num)
	);
}

function checkRow(matrix, row, num) {
	for (var col = 0; col < matrix.length; col++) {
		if (matrix[row][col] === num) {
			return true;
		}
	}
	return false;
}
function checkCol(matrix, col, num) {
	for (var row = 0; row < matrix.length; row++) {
		if (matrix[row][col] === num) {
			return true;
		}
	}
	return false;
}
function checkBox(matrix, startRow, startCol, num) {
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 3; col++) {
			if (matrix[row + startRow][col + startCol] === num) {
				return true;
			}
		}
	}
	return false;
}

var inputs = document.querySelectorAll("input");

document.querySelector(".solve").addEventListener("click", function (e) {
	var grid = [];
	inputs.forEach((item) => {
		for (var i = 0; i < 9; i++) {
			grid[i] = [];
			for (var j = 0; j < 9; j++) {
				grid[i][j] = 0;
			}
		}
		if (item.value) {
			grid[item.dataset.row][item.dataset.column] = parseInt(item.value);
		}
		item.value = "";
	});
	const solution = sudoku(grid);
	display(solution);
});

function display(solved) {
	document.querySelector(".display").classList.add("show");
	solved.forEach((el) => {
		document.querySelector(".display").insertAdjacentHTML(
			"beforeend",
			`
            <tr>
         <td><input type="text" value=${el[0]} /></td>
         <td><input type="text" value=${el[1]} /></td>
         <td><input type="text" value=${el[2]} /></td>
         <td><input type="text" value=${el[3]} /></td>
        <td><input type="text" value=${el[4]} /></td>
        <td><input type="text" value=${el[5]} /></td>
        <td><input type="text" value=${el[6]} /></td>
        <td><input type="text" value=${el[7]} /></td>
        <td><input type="text" value=${el[8]} /></td>
         </tr>
        
       
        
       
        
        
        
        
        
        `
		);
	});
}
