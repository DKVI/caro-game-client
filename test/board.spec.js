const assert = require("assert");
const innitBoard = require("../src/rules/initBoard");
const { makeMove, findBestMove } = require("../src/rules/nextMove");
describe("Testing for next move", () => {
  const board = innitBoard(15);
  it("1. init board", () => {
    assert.equal(typeof board, "object");
  });
  it("2. board size", () => {
    assert.equal(board.length, 15);
  });
  board[3][3] = 1;
  it("3. make move", () => {
    const { row, col } = findBestMove(1, board);
    assert.notEqual(row, 0);
    assert.notEqual(col, 0);
  });
});
