export default function GameStatus({ winner, isXNext }) {
  return (
    <h2 className="status-text">
      {winner
        ? `🏆 Winner: ${winner}`
        : `Next Player: ${isXNext ? "❌ X" : "⭕ O"}`}
    </h2>
  );
}
