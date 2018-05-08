class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over! Here is the final board:');
      this._board.print();
    } else if (!this._board.hasNonBombEmptySpaces()) {
      console.log('You won!');
      this._board.print();
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
  this._numberOfBombs = numberOfBombs;
  this._numberOfEmptySpaces = numberOfRows * numberOfColumns;
  this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
  this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    // Check if tile is already flipped, if so, return
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      return;
    }

    // Check if tile is bomb, if so, place bomb on player board
    if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
    // If tile is not a bomb, place number of surrounding bombs on player board
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfSurroundingBombs(rowIndex, columnIndex);
    }
    this._numberOfEmptySpaces--;
  }

  getNumberOfSurroundingBombs(rowIndex, columnIndex) {
    const offsets = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1]
    ];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfSurroundingBombs = 0;
    offsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      // Check to see if row and column are valid tile values on the board
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfSurroundingBombs++;
        }
      }
    });

    return numberOfSurroundingBombs;
  }

  hasNonBombEmptySpaces(){
    return this._numberOfEmptySpaces !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      board.push(row);
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberofBombs) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      board.push(row);
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberofBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
