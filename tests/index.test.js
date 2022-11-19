import * as assert from "assert";
import { Calculator, maskify, narcissistic } from "./index.js";
import { describe } from "mocha";

describe("Calculator", function () {
  const calculator = new Calculator();

  it("Sum", function () {
    assert.strictEqual(calculator.calculation(5, 7, "+"), 12);
  });

  it("Substract", function () {
    assert.strictEqual(calculator.calculation(8, 2, "-"), 6);
  });

  it("Multiply", function () {
    assert.strictEqual(calculator.calculation(5, 3, "*"), 15);
  });

  it("Divide", function () {
    assert.strictEqual(calculator.calculation(12, 4, "/"), 3);
  });

  it("Invalid arguments", function () {
    assert.strictEqual(calculator.calculation({}, 4, "/"), undefined);
  });

  it("Invalid sign", function () {
    assert.strictEqual(calculator.calculation(2, 4, "&"), undefined);
  });

  it("Text arguments", function () {
    assert.strictEqual(calculator.calculation("2", "4", "*"), 8);
  });

  it("Zero division", function () {
    assert.strictEqual(calculator.calculation(1, 0, "/"), Infinity);
  });

  it("Numbers with trailing comma", function () {
    assert.strictEqual(calculator.calculation(1.2, 0.6, "/"), 2);
  });
});

describe("Maskify", function () {
  it("Long string", function () {
    assert.strictEqual(maskify("4556364607935616"), "############5616");
  });

  it("Short string", function () {
    assert.strictEqual(maskify("64607935616"), "#######5616");
  });

  it("One symbol string", function () {
    assert.strictEqual(maskify("1"), "1");
  });

  it("No symbols", function () {
    assert.strictEqual(maskify(""), "");
  });
});

describe("Narcissistic", function () {
  it("Is narcissistic", function () {
    assert.strictEqual(narcissistic(153), true);
  });

  it("Not narcissistic", function () {
    assert.strictEqual(narcissistic(1652), false);
  });
});
