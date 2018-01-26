/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.stackUp = function(flatArray, n) {
  var result = [];
  var i = 0;
  while (result.length < n) {
    var row = flatArray.slice(i, i + n);
    result.push(row);
    i += n;
  }
  return result;
};

window.findNRooksSolution = function(n) {
  var found = false;
  var rounds = Math.pow(n, 2);
  var flatBoards = [];
  var makeBoards = function(roundsToGo, currentBoard) {

    var test = currentBoard.concat(Array(roundsToGo).fill(0));
    test = stackUp(test, n);
    test = new Board(test);

    if (test.hasAnyRowConflicts() || test.hasAnyColConflicts()) {
      return;
    }

    if (roundsToGo === 0) {
      var sum = currentBoard.reduce(function (a, b) {
        return a + b;
      });

      if (sum < n) {
        return;
      }
      
      flatBoards.push(currentBoard);
      found = true;
      return;
    }
  
    for (var i = 0; i < 2; i++) {
      var currentMove = i;
      makeBoards(roundsToGo - 1, currentBoard.concat(currentMove));
      if (found) {
        console.log('found');
        return;
      }
    }
  };
  makeBoards(rounds, []);  

  return stackUp(flatBoards[0], n);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var rounds = Math.pow(n, 2);
  var flatBoards = [];

  var makeBoards = function(roundsToGo, currentBoard) {
    var test = currentBoard.concat(Array(roundsToGo).fill(0));
    test = stackUp(test, n);
    test = new Board(test);

    if (test.hasAnyRowConflicts() || test.hasAnyColConflicts()) {
      return;
    }

    if (roundsToGo === 0) {
      var sum = currentBoard.reduce(function (a, b) {
        return a + b;
      });

      if (sum < n) {
        return;
      }
      
      flatBoards.push(currentBoard);
      return;
    }
  
    for (var i = 0; i < 2; i++) {
      var currentMove = i;
      makeBoards(roundsToGo - 1, currentBoard.concat(currentMove));
    }
  };

  makeBoards(rounds, []);  
  console.log('Number of solutions for ' + n + ' rooks:', flatBoards.length);
  return flatBoards.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var rounds = Math.pow(n, 2);
  var flatBoards = [];
  var makeBoards = function(roundsToGo, currentBoard) {
    if (roundsToGo === 0) {
      flatBoards.push(currentBoard);
      return;
    }
    for (var i = 0; i < 2; i++) {
      var currentMove = i;
      makeBoards(roundsToGo - 1, currentBoard.concat(currentMove));
    }
  };
  makeBoards(rounds, []);  

  var stackedBoards = flatBoards.map(function(board) {
    return stackUp(board, n);
  });
    
  
  var actualStackedBoards = stackedBoards.map(function(board) {
    return new Board(board);
  });

  
  
  for (var i = 0; i < actualStackedBoards.length; i++) {
    var board = actualStackedBoards[i];
    
    if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false && board.hasAnyMajorDiagonalConflicts() === false && board.hasAnyMinorDiagonalConflicts() === false) {
      var boardTotal = 0; 
      var arrayOfArrays = board.rows();

      for (var row = 0; row < arrayOfArrays.length; row++) {
        var rowTotal = 0;

        for (var square = 0; square < arrayOfArrays[row].length; square++) {
          rowTotal += arrayOfArrays[row][square];
        }
        
        boardTotal += rowTotal;
      }
      
      if (boardTotal === n) {
        console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
        return board.rows();
      }
    }
  }
  return actualStackedBoards[0].rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var rounds = Math.pow(n, 2);
  var flatBoards = [];
  var makeBoards = function(roundsToGo, currentBoard) {
    if (roundsToGo === 0) {
      flatBoards.push(currentBoard);
      return;
    }
    for (var i = 0; i < 2; i++) {
      var currentMove = i;
      makeBoards(roundsToGo - 1, currentBoard.concat(currentMove));
    } 
  };
  makeBoards(rounds, []);  

  var stackedBoards = flatBoards.map(function(board) {
    return stackUp(board, n);
  });
    
  
  var actualStackedBoards = stackedBoards.map(function(board) {
    return new Board(board);
  });

  var storage = [];
  
  for (var i = 0; i < actualStackedBoards.length; i++) {
    var board = actualStackedBoards[i];
    
    if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false && board.hasAnyMajorDiagonalConflicts() === false && board.hasAnyMinorDiagonalConflicts() === false) {
      var boardTotal = 0; 
      var arrayOfArrays = board.rows();

      for (var row = 0; row < arrayOfArrays.length; row++) {
        var rowTotal = 0;

        for (var square = 0; square < arrayOfArrays[row].length; square++) {
          rowTotal += arrayOfArrays[row][square];
        }
        
        boardTotal += rowTotal;
      }
      
      if (boardTotal === n) {
        storage.push(board.rows());
      }
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', storage.length);
  return storage.length;
};
