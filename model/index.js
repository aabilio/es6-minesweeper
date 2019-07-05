import { place } from './place.js';
import { makeBoard } from './board.js';
import { makeGame } from './game.js';

const board = makeBoard({ place });
const game = makeGame({ board });

export { place, board, game };
export const model = { place, board, game };

export default model;
