// Hằng số
const PLAYER_X = 1; // Ký hiệu cho người chơi X
const PLAYER_O = -1; // Ký hiệu cho người chơi O
const EMPTY = 0; // Ký hiệu cho ô trống
// Kích thước bảng cờ
const BOARD_SIZE = 15;

// Lượt chơi hiện tại
let currentPlayer = PLAYER_X;

// Hàm kiểm tra vị trí đã được đánh
function isMoveValid(row, col, board) {
  return (
    row >= 0 &&
    row < BOARD_SIZE &&
    col >= 0 &&
    col < BOARD_SIZE &&
    board[row][col] === EMPTY
  );
}

// Hàm thực hiện nước đi và kiểm tra kết thúc trò chơi
function makeMove(row, col, board) {
  if (isMoveValid(row, col)) {
    board[row][col] = currentPlayer;
    currentPlayer = -currentPlayer; // Đổi lượt người chơi
    return true;
  }
  return false;
}

// Hàm kiểm tra xem trò chơi đã kết thúc chưa
function isGameOver(board) {
  // Kiểm tra hàng ngang
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col <= BOARD_SIZE - 5; col++) {
      if (
        Math.abs(
          board[row][col] +
            board[row][col + 1] +
            board[row][col + 2] +
            board[row][col + 3] +
            board[row][col + 4]
        ) === 5
      ) {
        return true;
      }
    }
  }

  // Kiểm tra cột dọc
  for (let row = 0; row <= BOARD_SIZE - 5; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (
        Math.abs(
          board[row][col] +
            board[row + 1][col] +
            board[row + 2][col] +
            board[row + 3][col] +
            board[row + 4][col]
        ) === 5
      ) {
        return true;
      }
    }
  }

  // Kiểm tra đường chéo chính
  for (let row = 0; row <= BOARD_SIZE - 5; row++) {
    for (let col = 0; col <= BOARD_SIZE - 5; col++) {
      if (
        Math.abs(
          board[row][col] +
            board[row + 1][col + 1] +
            board[row + 2][col + 2] +
            board[row + 3][col + 3] +
            board[row + 4][col + 4]
        ) === 5
      ) {
        return true;
      }
    }
  }

  // Kiểm tra đường chéo phụ
  for (let row = 0; row <= BOARD_SIZE - 5; row++) {
    for (let col = BOARD_SIZE - 1; col >= 4; col--) {
      if (
        Math.abs(
          board[row][col] +
            board[row + 1][col - 1] +
            board[row + 2][col - 2] +
            board[row + 3][col - 3] +
            board[row + 4][col - 4]
        ) === 5
      ) {
        return true;
      }
    }
  }

  // Kiểm tra hòa
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === EMPTY) {
        return false;
      }
    }
  }

  return true;
}

// Hàm tính giá trị của trạng thái hiện tại
function evaluate(board) {
  let score = 0;

  // Kiểm tra hàng ngang
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col <= BOARD_SIZE - 5; col++) {
      const line = board[row].slice(col, col + 5);
      score += evaluateLine(line);
    }
  }

  // Kiểm tra cột dọc
  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row <= BOARD_SIZE - 5; row++) {
      const line = [];
      for (let i = 0; i < 5; i++) {
        line.push(board[row + i][col]);
      }
      score += evaluateLine(line);
    }
  }

  // Kiểm tra đường chéo chính
  for (let row = 0; row <= BOARD_SIZE - 5; row++) {
    for (let col = 0; col <= BOARD_SIZE - 5; col++) {
      const line = [];
      for (let i = 0; i < 5; i++) {
        line.push(board[row + i][col + i]);
      }
      score += evaluateLine(line);
    }
  }

  // Kiểm tra đường chéo phụ
  for (let row = 0; row <= BOARD_SIZE - 5; row++) {
    for (let col = BOARD_SIZE - 1; col >= 4; col--) {
      const line = [];
      for (let i = 0; i < 5; i++) {
        line.push(board[row + i][col - i]);
      }
      score += evaluateLine(line);
    }
  }

  return score;
}

// Hàm kiểm tra giá trị của một dòng (chứa 5 ô)
function evaluateLine(line) {
  const playerX = line.filter((cell) => cell === PLAYER_X).length; // Số lượng ô của người chơi X trong dòng
  const playerO = line.filter((cell) => cell === PLAYER_O).length; // Số lượng ô của người chơi O trong dòng

  if (playerX === 5) {
    return 100; // Người chơi X thắng
  } else if (playerX === 4 && playerO === 0) {
    return 10; // Người chơi X có 4 ô liên tiếp
  } else if (playerX === 3 && playerO === 0) {
    return 5; // Người chơi X có 3 ô liên tiếp
  } else if (playerX === 2 && playerO === 0) {
    return 2; // Người chơi X có 2 ô liên tiếp
  } else if (playerO === 5) {
    return -100; // Người chơi O thắng
  } else if (playerO === 4 && playerX === 0) {
    return -10; // Người chơi O có 4 ô liên tiếp
  } else if (playerO === 3 && playerX === 0) {
    return -5; // Người chơi O có 3 ô liên tiếp
  } else if (playerO === 2 && playerX === 0) {
    return -2; // Người chơi O có 2 ô liên tiếp
  } else {
    return 0; // Trạng thái không đáng kể
  }
}
// Hàm tìm kiếm nước đi tối ưu bằng thuật toán minimax với cắt tỉa alpha-beta
function findBestMove(depth, board) {
  let bestScore = -Infinity;
  let bestMove = { row: -1, col: -1 };

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === EMPTY) {
        board[row][col] = currentPlayer; // Thử nước đi

        const score = minimax(depth - 1, false, -Infinity, Infinity, board); // Tìm giá trị tối ưu dựa trên thuật toán minimax

        board[row][col] = EMPTY; // Hoàn tác nước đi

        if (score > bestScore) {
          bestScore = score;
          bestMove = { row, col };
        }
      }
    }
  }

  return bestMove;
}

// Hàm minimax với cắt tỉa alpha-beta
function minimax(depth, isMaximizingPlayer, alpha, beta, board) {
  if (depth === 0 || isGameOver()) {
    return evaluate(board);
  }

  if (isMaximizingPlayer) {
    let maxScore = -Infinity;

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === EMPTY) {
          board[row][col] = currentPlayer; // Thử nước đi

          const score = minimax(depth - 1, false, alpha, beta, board); // Gọi đệ quy để tìm giá trị tối ưu

          board[row][col] = EMPTY; // Hoàn tác nước đi

          maxScore = Math.max(maxScore, score);
          alpha = Math.max(alpha, score);
          if (alpha >= beta) {
            break; // Cắt tỉa beta
          }
        }
      }
    }

    return maxScore;
  } else {
    let minScore = Infinity;

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === EMPTY) {
          board[row][col] = -currentPlayer; // Thử nước đi

          const score = minimax(depth - 1, true, alpha, beta, board); // Gọi đệ quy để tìm giá trị tối ưu

          board[row][col] = EMPTY; // Hoàn tác nước đi

          minScore = Math.min(minScore, score);
          beta = Math.min(beta, score);
          if (beta <= alpha) {
            break; // Cắt tỉa alpha
          }
        }
      }
    }

    return minScore;
  }
}

export { makeMove, findBestMove };
