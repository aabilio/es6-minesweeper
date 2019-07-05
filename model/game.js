const getRandomNumber = ({ min, max }) => {
  const min_ = Math.ceil(min);
  const max_ = Math.floor(max);
  return Math.floor(Math.random() * (max_ - min_ + 1)) + min_;
};
const getRandomNumbers = ({ min, max, count = 1 }) => {
  const randomNumbers = [];
  for (let i = 0; i < count; i ++) {
    let randomNumber;
    do {
      randomNumber = getRandomNumber({ min, max });
    } while (randomNumbers.indexOf(randomNumber) >= 0);
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};

export const makeGame = ({ board }) => ({ rows = 20, mines = 8 }) => {
  const mineIndexes = getRandomNumbers({ min: 0, max: rows * rows, count: mines });

  return {
    board: board({ rows, mineIndexes }),
    isFinished: false,
    won: false,
    mines,
    rows
  };
};

export default makeGame;
