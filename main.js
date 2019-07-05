import { model } from './model/index.js';
import { actions } from './actions/index.js';
import { ui, PLACE_CLASS } from './ui/index.js';

const GAME_OPTIONS_ROWS = 8;
const GAME_OPTIONS_MINES = 10;

const loop = ({ game }) => {
  function placeClicklistener ($event) {
    const $target = $event.target !== $event.currentTarget
      ? $event.target.parentNode
      : $event.target;

    if (!$target.matches(`.${PLACE_CLASS}`)) {
      return;
    }

    $event.preventDefault();

    const placeId = +$target.id.replace("place-id-", "");
    const newGame = actions.setPlaceVisible({ game, placeId });
    const { isFinished, won } = actions.checkGameCompletion({ game: newGame });

    if (isFinished) {
      ui.drawGame({ game: newGame });
      setTimeout(() => alert(won ? "YOU WIN" : "YOU LOST!"), 100);
      return false;
    }

    loop({ game: newGame });
  };
  const addListeners = () => {
    const elements = document.querySelectorAll(`.${PLACE_CLASS}`);
    elements.forEach(element => element.onclick = placeClicklistener);
  }

  ui.drawGame({ game });
  addListeners();
};

const main = () => {
  const game = model.game({
    rows: GAME_OPTIONS_ROWS,
    mines: GAME_OPTIONS_MINES
  });

  loop({ game });
};

main();
