const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];
    board.push(row);
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' ');
    }
  }
  return board;
};


const generateBombBoard = (numberOfRows, numberOfColumns, numberofBombs) => {
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
};

const getNumberOfSurroundingBombs = (bombBoard, flipRow, flipColumn) => {
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

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  let numberOfSurroundingBombs = 0;
  offsets.forEach(offset => {
    const neighborRowIndex = flipRow + offset[0];
    const neighborColumnIndex = flipColumn + offset[1];

    // Check to see if row and column are valid tile values on the board
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfSurroundingBombs++;
      }
    }
  });

  return numberOfSurroundingBombs;
};

const flipTile = (playerBoard, bombBoard, flipRow, flipColumn) => {
  // Check if tile is already flipped, if so, return
  if (playerBoard[flipRow][flipColumn] !== ' ') {
    return;
  }

  // Check if tile is bomb, if so, place bomb on player board
  if (bombBoard[flipRow][flipColumn] === 'B') {
    playerBoard[flipRow][flipColumn] = 'B';
  } else {
  // If tile is not a bomb, place number of surrounding bombs on player board
    playerBoard[flipRow][flipColumn] = getNumberOfSurroundingBombs(bombBoard, flipRow, flipColumn);
  }
};

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);

/*console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
*/

printBoard(bombBoard);
console.log(getNumberOfSurroundingBombs(bombBoard, 2, 1));
