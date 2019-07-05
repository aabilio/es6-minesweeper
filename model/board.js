export const makeBoard = ({ place }) => ({ rows = 20, mineIndexes = [] }) => {
  const index1d = (i, j) => (i * rows) + j;
  const shouldPlaceMine = (i, j, mineIndexes) => mineIndexes.indexOf(index1d(i, j)) >= 0;
  const countNearMines = (i, j, board) => {
    const positionIsNotCurrent = (ii, jj) => i !== ii || j !== jj;
    const positionOnBoard = (ii, jj) => ii > -1 && jj > -1 && ii < board.length && jj < board[ii].length;
    const validPositon = (ii, jj) => positionOnBoard(ii, jj) && positionIsNotCurrent(ii, jj);

    let mines = 0;
    for (let ii = i - 1; ii <= i + 1; ii++) {
      for (let jj = j - 1; jj <= j + 1; jj++) {
        if (validPositon(ii, jj) && board[ii][jj].mine) {
          mines++;
        }
      }
    }

    return mines;
  };

  const board = [];
  let id = 0;
  for (let i = 0; i < rows; i++) {
    const columns = [];
    for (let j = 0; j < rows; j++) {
      columns.push(place({ id: ++id, mine: shouldPlaceMine(i, j, mineIndexes) }));
    }
    board.push(columns)
  }

  return board.map((row, i) => row.map((place, j) => {
    const nearMines = countNearMines(i, j, board);
    return {
      ...place,
      nearMines: nearMines
    }
  }));
};

export default makeBoard;
