const assert = require("assert");
const calculateNumber = require("./calculateNumber");

// Test case 1: Rounding positive decimal values
assert.strictEqual(calculateNumber(3.7, 5.2), 9);

// Test case 2: Rounding negative decimal values
assert.strictEqual(calculateNumber(-2.3, -4.7), -7);

// Test case 3: Rounding zero values
assert.strictEqual(calculateNumber(0, 0), 0);

// Test case 4: Rounding positive integers
assert.strictEqual(calculateNumber(3, 5), 8);

// Test case 5: Rounding negative integers
assert.strictEqual(calculateNumber(-2, -4), -6);

// Test case 6: Rounding decimal values that result in zero
assert.strictEqual(calculateNumber(0.4, -0.4), 0);

console.log("All tests passed successfully!");
