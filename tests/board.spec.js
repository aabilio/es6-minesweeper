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

export const boardTest = ({ describe, it, expect }) => {
  describe("Board model", () => {
    it("should create a squared board", () => {
      const rows = 10;
      const expectedPlaces = rows * rows;

      const board = model.board({ rows });

      const actualPlaces = countTotalPlaces({ board });
      expect(actualPlaces).toEquals(expectedPlaces);
    });

    it("should place mines properly", () => {
      const rows = 10;
      const mineIndexes = [0, 1];

      const board = model.board({ rows, mineIndexes });

      board.forEach((row, i) => row.forEach((place, j) => {
        if (i === 0 && mineIndexes.indexOf(j) >= 0) {
          expect(place.mine).toEquals(true);
        } else {
          expect(place.mine).toEquals(false);
        }
      }));
    });
    it("should count near mines properly", () => {
      const rows = 10;
      const mineIndexes = [0];

      const board = model.board({ rows, mineIndexes });

      const placesWithCountIdxs = [
        board[0][1].id,
        board[1][0].id,
        board[1][1].id,
      ];
      board.forEach((row, i) => row.forEach((place, j) => {
        if (placesWithCountIdxs.indexOf(place.id) >= 0) {
          expect(place.nearMines).toEquals(1);
        } else {
          expect(place.nearMines).toEquals(0);
        }
      }));
    });
  });
};

export default boardTest;
