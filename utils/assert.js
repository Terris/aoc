/**
 * @param {boolean} condition
 * @param {string} [message]
 */
export function assertTrue(condition, message) {
  if (!condition) {
    const errorMessage = message
      ? `Assertion failed: ${message}`
      : "Assertion failed";
    throw new Error(errorMessage);
  }
}

/**
 * @template T
 *
 * @param {T} expected
 * @param {T} actual
 * @param {string} [message]
 */
export function assertEquals(expected, actual, message) {
  let assertMessage = `Expected ${expected} to equal ${actual}; actually was ${actual}`;
  if (message) {
    assertMessage = `${message}. ${assertMessage}`;
  }
  assertTrue(expected === actual, assertMessage);
}
