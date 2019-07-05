import model from '../model/index.js';

const countTotalMines = ({ board }) => {
  let mines = 0;
  board.forEach(row => row.forEach(place => mines = mines + (place.mine ? 1 : 0)));
  return mines;
};

const countTotalPlaces = ({ board }) => {
  let places = 0;
  board.forEach(row => row.forEach(place => places++));
  return places;
};

export const gameTest = ({ describe, it, expect }) => {
  describe("Game model", () => {
    it("should create a not finished and not won game", () => {
      const game = model.game({});

      expect(game.isFinished).toEquals(false);
      expect(game.won).toEquals(false);
    });

    it("should create a board with a provided number of mines", () => {
      const expectedMines = 2;

      const game = model.game({ mines: expectedMines });

      const actualMines = countTotalMines({ board: game.board });
      expect(actualMines).toEquals(expectedMines);
      expect(game.mines).toEquals(expectedMines);
    });

    it("should create a game with a squared board", () => {
      const rows = 10;
      const expectedPlaces = rows * rows;

      const game = model.game({ rows });

      const actualPlaces = countTotalPlaces({ board: game.board });
      expect(actualPlaces).toEquals(expectedPlaces);
      expect(game.rows).toEquals(rows);
    });
  });
};

export default gameTest;
