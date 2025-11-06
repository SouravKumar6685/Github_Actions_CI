import { useState } from "react";
import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
import { calculateWinner } from "./utils/calculateWinner";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleCellClick(index) {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const winner = calculateWinner(board);

  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe 💜</h1>
      <GameStatus winner={winner} isXNext={isXNext} />
      <Board board={board} onCellClick={handleCellClick} />
      <button className="reset-btn" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}
