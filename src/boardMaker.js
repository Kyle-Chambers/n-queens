//make an array of arrays
var boardMaker = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);  
    }
    board.push(row);
  }
  return board;
};

//add a piece to the board by row and column
var addPiece = function(board, row, col) {
  board[row][col] = 1;
  return board;
};

//not sure if this works
var addPieceBySquare = function(n, board, square) {
  var rowCol = getRowCol(n, square);
  addPiece(board, ...rowCol);
};

//get row and col of array by square number using modulus!
var getRowCol = function(n, square) {
  var row = Math.floor(square / n);
  var col = square % n;
  return [row, col];
};

var board = boardMaker(3);
var row = 0;
var col = 0;
addPieceBySquare(2, board, 0);
