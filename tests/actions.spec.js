import {
  setPlaceVisible,
  setGameFinished,
  checkGameCompletion
} from '../actions/index.js';

import { place } from '../model/index.js';

const makeTestBoard = ({ visible = false, nearMines = null }) => {
  let id = 0;
  const createNotVisiblePlace = () => place({ id: ++id, visible, nearMines });
  return [
    [createNotVisiblePlace(), createNotVisiblePlace(), createNotVisiblePlace()],
    [createNotVisiblePlace(), createNotVisiblePlace(), createNotVisiblePlace()],
    [createNotVisiblePlace(), createNotVisiblePlace(), createNotVisiblePlace()],
  ];
};

export const actionTests = ({ describe, it, expect }) => {
  describe("Actions", () => {
    it("should set game as finished", () => {
      const game = {
        board: {},
        isFinished: false,
        won: false
      };
      const expected = {
        board: {},
        isFinished: true,
        won: true
      };

      const newGame = setGameFinished({ game, won: true });

      expect(newGame).toEqualsObject(expected);
    });
  });

  it("should set place visible with mutate original board", () => {
    const originalBoard = makeTestBoard({ vsible: false });
    const originalBoarCopy = [...originalBoard];
    const expectedBoard = originalBoard.map(p => p.id === 1 ? { ...p, visible: true } : p);
    const originalGame = { board: originalBoard };
    const newGame = setPlaceVisible({ game: originalGame, placeId: 1 });

    expect(newGame.board).toEqualsObject(expectedBoard);
    expect(originalBoard).toEqualsObject(originalBoarCopy);
  });

  it("should return original board if place is not on the board", () => {
    const originalBoard = makeTestBoard({ visible: false });
    const originalGame = { board: originalBoard };
    const newGame = setPlaceVisible({ game: originalGame, placeId: 100 });

    expect(newGame.board).toEqualsObject(originalBoard);
  });

  it("should make visible neighbours of empty selected place", () => {
    const originalBoard = makeTestBoard({ visible: false, nearMines: 0 });
    const originalGame = { board: originalBoard };
    const newGame = setPlaceVisible({ game: originalGame, placeId: 1 });

    newGame.board.forEach(row => row.forEach(place => {
      expect(place.visible).toEquals(true);
    }));
  });

  it("should finish game and won to false if mine is visible", () => {
    const originalBoard = makeTestBoard({ visible: false });
    originalBoard[0][0] = { ...originalBoard[0][0], mine: true, visible: true };
    const originalGame = { board: originalBoard, isFinished: false, won: false };

    const newGame = checkGameCompletion({ game: originalGame });

    expect(newGame.isFinished).toEquals(true);
    expect(newGame.won).toEquals(false);
  });

  it("should finish game and won to true if all places without bombs are visible", () => {
    const originalBoard = makeTestBoard({ visible: true });
    originalBoard[0][0] = { ...originalBoard[0][0], mine: true, visible: false };
    originalBoard[2][1] = { ...originalBoard[2][1], mine: true, visible: false };
    const originalGame = { board: originalBoard, isFinished: false, won: false };

    const newGame = checkGameCompletion({ game: originalGame });

    expect(newGame.isFinished).toEquals(true);
    expect(newGame.won).toEquals(true);
  });

  it("should not finish game if not all places without bombs are visible", () => {
    const originalBoard = makeTestBoard({ visible: true });
    originalBoard[0][0] = { ...originalBoard[0][0], mine: true, visible: false };
    originalBoard[2][1] = { ...originalBoard[2][1], mine: false, visible: false };
    const originalGame = { board: originalBoard, isFinished: false, won: false };

    const newGame = checkGameCompletion({ game: originalGame });

    expect(newGame.isFinished).toEquals(false);
    expect(newGame.won).toEquals(false);
  });
};

export default actionTests;
