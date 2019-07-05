let assertsCount = 0;
let testsCount = 0;
let failsCount = 0;

export const makeDescribe = ({ logger = console.log }) => (moduleName, moduleFunction) => {
  logger(`\n🤞 ${moduleName}`);
  moduleFunction();
};

export const makeIt = ({ logger = console.log }) => (testName, testFunction) => {
  testsCount++;
  try {
    testFunction();
    logger(` ✅ ${testName}`);
  } catch (e) {
    failsCount++;
    logger(` ❌ ${testName}: \n\t${e}`);
    logger(`\t${e.stack}`);
  }
};

export const expect = (actual) => ({
  toEquals: (expected) => {
    assertsCount++;
    if (actual !== expected) {
      throw new Error(`toEqueals() "${expected}" !== "${actual}"`);
    }
  },
  toEqualsObject: (expected) => {
    assertsCount++;
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`toEquealsObject() "${JSON.stringify(expected)}" !== "${JSON.stringify(actual)}"`);
    }
  }
});

export const getTotals = () => ({
  asserts: assertsCount,
  tests: testsCount,
  fails: failsCount
});

export const makeTestStuite = ({ logger = console.log }) => ({
  describe: makeDescribe({ logger }),
  it: makeIt({ logger }),
  expect
});

export default makeTestStuite
