import makeTestStuite, { getTotals } from './tests.js';
import { actionTests } from './actions.spec.js';
import { placeTest } from './place.spec.js';
import { gameTest } from './game.spec.js';
import { boardTest } from './board.spec.js';

const logger = console.log;
const { describe, it, expect } = makeTestStuite({ logger });
const testDependencies = { describe, it, expect };
const tests = [
  actionTests,
  placeTest,
  gameTest,
  boardTest
];
const testsFinished = () => {
  const { asserts, tests, fails } = getTotals();
  const setWindowBackground = fails => {
    if (window.document && document.body) {
      document.body.style.backgroundColor = fails == 0 ? '#06E2A8' : '#FE3303';
    }
  };

  logger("\n\n 📖 All tests completed: ")
  logger(`\t ⚫️ asserts: ${asserts}`);
  logger(`\t 🔵 tests:   ${tests}`);
  logger(`\t 💣 fails:   ${fails}`);
  setTimeout(() => setWindowBackground(fails), 0);
};

tests
  .forEach(test => test(testDependencies))

testsFinished();
