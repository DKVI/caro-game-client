function getWinner(board, currentPlayer) {
  console.log("Current: " + currentPlayer);
  const BOARD_SIZE = 15;
  // Kiểm tra hàng ngang
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col <= BOARD_SIZE - 5; col++) {
      if (
        board[row][col] === currentPlayer &&
        board[row][col + 1] === currentPlayer &&
        board[row][col + 2] === currentPlayer &&
        board[row][col + 3] === currentPlayer &&
        board[row][col + 4] === currentPlayer
      ) {
        return currentPlayer;
      }
    }
  }

  // Kiểm tra cột dọc
  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row <= BOARD_SIZE - 5; row++) {
      if (
        board[row][col] === currentPlayer &&
        board[row + 1][col] === currentPlayer &&
        board[row + 2][col] === currentPlayer &&
        board[row + 3][col] === currentPlayer &&
        board[row + 4][col] === currentPlayer
      ) {
        return currentPlayer;
      }
    }
  }

  // Kiểm tra đường chéo chính
  for (let row = 0; row <= BOARD_SIZE - 5; row++) {
    for (let col = 0; col <= BOARD_SIZE - 5; col++) {
      if (
        board[row][col] === currentPlayer &&
        board[row + 1][col + 1] === currentPlayer &&
        board[row + 2][col + 2] === currentPlayer &&
        board[row + 3][col + 3] === currentPlayer &&
        board[row + 4][col + 4] === currentPlayer
      ) {
        return currentPlayer;
      }
    }
  }

  // Kiểm tra đường chéo phụ
  for (let row = 0; row <= BOARD_SIZE - 5; row++) {
    for (let col = BOARD_SIZE - 1; col >= 4; col--) {
      if (
        board[row][col] === currentPlayer &&
        board[row + 1][col - 1] === currentPlayer &&
        board[row + 2][col - 2] === currentPlayer &&
        board[row + 3][col - 3] === currentPlayer &&
        board[row + 4][col - 4] === currentPlayer
      ) {
        return currentPlayer;
      }
    }
  }

  // Nếu không có người thắng thì trả về hòa
  return 0;
}

export default getWinner;
