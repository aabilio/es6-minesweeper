const _setVisibleEmptyNeighbours = ({ board, i, j }) => {
  const positionOnBoard = (ii, jj) => ii > -1 && jj > -1 && ii < board.length && jj < board[ii].length;
  const positionNotVisble = (ii, jj) => !(board[ii][jj].visible);
  const positionIsNotMine = (ii, jj) => !(board[ii][jj].mine);
  const positionIsEmpty = (ii, jj) => board[ii][jj].nearMines == 0;
  const setVisibleAndSearchNeighbours = (ii, jj) =>
    positionOnBoard(ii, jj) && positionNotVisble(ii, jj) && positionIsNotMine(ii, jj)
  const neighboursCoords = [
    { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
    { x: 0, y: -1 } , { x: 0, y: 0 } , { x: 0, y: 1 },
    { x: 1, y: -1 } , { x: 1, y: 0 } , { x: 1, y: 1 },
  ];

  for (let c = 0; c < neighboursCoords.length; c++) {
    const coord = neighboursCoords[c];
    const ii = i + coord.x;
    const jj = j + coord.y;
    if (setVisibleAndSearchNeighbours(ii, jj)) {
      board[ii][jj].visible = true;
      if (positionIsEmpty(ii, jj)) {
        _setVisibleEmptyNeighbours({ board, i: ii, j: jj });
      }
    }
  }

  return board;
};

export const setPlaceVisible = ({ game, placeId }) => {
  const board = [...game.board];
  for (let i = 0; i < board.length; i ++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].id === placeId) {
        if (!board[i][j].visible) {
          if (board[i][j].nearMines == 0 && !board[i][j].mine) {
            _setVisibleEmptyNeighbours({ board, i, j });
          }

          board[i][j].visible = true;
          break;
        }
      }
    }
  }

  return { ...game, board };
};

export const setGameFinished = ({ game, won }) => ({
  ...game,
  isFinished: true,
  won
});

export const checkGameCompletion = ({ game }) => {
  const { isFinished, won } = (function({ game }) {
    const countTotalMines = ({ board }) => {
      let mines = 0;
      board.forEach(row => row.forEach(place => mines = mines + (place.mine ? 1 : 0)));
      return mines;
    };
    const board = game.board;
    const rows = board.length;
    const mines = countTotalMines({ board });
    const totalPlaces = rows * rows;
    let visiblePlaces = 0;
    let won = false;
    let isFinished = false;

    for (let i = 0; i < rows; i++) {
      for(let j = 0; j < rows; j++) {
        const place = board[i][j];
        if (place.visible) {
          visiblePlaces++;
        }

        const allNotMinePlacesAreVisibles = visiblePlaces >= totalPlaces - mines;
        isFinished = (place.visible && place.mine) || allNotMinePlacesAreVisibles;
        won = allNotMinePlacesAreVisibles

        if (isFinished) {
          return { isFinished, won };
        }
      }
    }

    return { isFinished, won };
  })({ game })

  return {
    ...game,
    isFinished,
    won
  }
};

export const actions = {
  setPlaceVisible,
  setGameFinished,
  checkGameCompletion
}

export default actions;
