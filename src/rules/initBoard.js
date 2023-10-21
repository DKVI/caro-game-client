function initializeBoard(BOARD_SIZE) {
  const EMPTY = 0;
  let board = new Array(BOARD_SIZE)
    .fill(EMPTY)
    .map(() => new Array(BOARD_SIZE).fill(EMPTY));
  return board;
}

export default initializeBoard;
