export const PLACE_CLASS = "game-container__board__place";
export const PLACE_CLASS_VISIBLE = "game-container__board__place--visible";
export const PLACE_BOMB_CLASS = "game-container__board__place--bomb";
export const PLACE_EMPTY_CLASS = "game-container__board__place--empty";
export const GAME_CONTAINER_ID = "game-container__board";

const drawPlace = ({ place }) => {
  const content = place.mine
    ? `<span class="${PLACE_BOMB_CLASS}">•</span>`
    : place.nearMines > 0
      ? `<span>${place.nearMines}</span>`
      : `<span class="${PLACE_EMPTY_CLASS}">&nbsp;</span>`;

  const parent = document.createElement("div");
  parent.innerHTML = `
    <div
      id="place-id-${place.id}"
      class="${PLACE_CLASS}${place.visible ? ` ${PLACE_CLASS_VISIBLE}` : ''}"
    >
      ${place.visible
        ? content
        : "<span>&nbsp;</span>"
      }
    </div>
  `.trim();

  return parent.firstChild;
};

export const drawBoard = ({ board }) => {
  const gameContainerSelector = `#${GAME_CONTAINER_ID}`;
  const gameContainer = document.querySelector(gameContainerSelector);
  const makeNextLine = () => document.createElement("br");

  gameContainer.innerHTML = "";
  board.forEach(row => {
    row.forEach(place => {
      gameContainer.appendChild(drawPlace({ place }));
    });
    gameContainer.appendChild(makeNextLine());
  });
};

export const drawGame = ({ game }) => {
  drawBoard({ board: game.board });
};

export const ui = {
  drawBoard: drawBoard,
  drawGame: drawGame
};

export default ui;
