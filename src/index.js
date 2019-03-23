module.exports = function solveSudoku(matrix) {
  const matrixTest = [];
  const indextTest = [];
  // copy matrix instance
  for (let i = 0, len = matrix.length; i < len; i++) {
    matrixTest.push(matrix[i].slice());
  }

  // get array with nulls
  for (let i = 0, len = matrixTest.length; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (matrixTest[i][j] == 0) {
        //console.log(i, j)
        indextTest.push([i, j])
      }
    }
  }
  // iterate and check possible combination

  for (let n = 0, len = indextTest.length; n < len; n++) {
    let i = indextTest[n][0];
    let j = indextTest[n][1];
    matrixTest[i][j]++; // increase value for checking
    while (!checker(i, j, matrixTest)) {
      matrixTest[i][j]++;
      if (matrixTest[i][j] == 10) {
        n--;
        break;
      }
    }
  }
  //console.log(matrixTest)
  return matrixTest;
}
// check possibility if number can be in current position;
function checker(i, j, matrix) {
  for (let m = 0; m < 9; m++) {
    let xBalance = matrix[m][j] == matrix[i][j] && m != i;
    let yBalance = matrix[i][m] == matrix[i][j] && m != j;
    if (xBalance || yBalance) {
      return false;
    }
  }
  let checking = true;
  let cellX, cellY;
  i < 3 ? cellX = [0, 1, 2] : i < 6 ? cellX = [3, 4, 5] : cellX = [6, 7, 8];
  j < 3 ? cellY = [0, 1, 2] : j < 6 ? cellY = [3, 4, 5] : cellY = [6, 7, 8];

  // check cell
  cellX.map((x) => {
    cellY.map((y) => {
      let cell = matrix[x][y] == matrix[i][j] && (x != i && y != j);
      if (cell) {
        checking = false;
      }
    });
  });
  return checking;
}
