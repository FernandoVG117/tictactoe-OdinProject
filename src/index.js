let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

document.getElementById("resetButton").addEventListener("click", resetGame);

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute("data-index"));

  if (board[index] === "") {
    board[index] = currentPlayer;
    renderBoard();
    if (checkWin()) {
      statusElement.textContent = `${currentPlayer} wins!`;
      disableBoard();
      return;
    }
    if (checkDraw()) {
      statusElement.textContent = "It's a draw!";
      disableBoard();
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Current player: ${currentPlayer}`;
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
  });
}

function checkDraw() {
  return board.every(cell => cell !== "");
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  renderBoard();
  statusElement.textContent = "Current player: X";
  enableBoard();
}

function disableBoard() {
  cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
}

function enableBoard() {
  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
}

function renderBoard() {
  cells.forEach((cell, index) => cell.textContent = board[index]);
}
