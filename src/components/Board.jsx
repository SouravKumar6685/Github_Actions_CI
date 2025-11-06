import Cell from "./Cell";

export default function Board({ board, onCellClick }) {
  return (
    <div className="board">
      {board.map((value, i) => (
        <Cell key={i} value={value} onClick={() => onCellClick(i)} />
      ))}
    </div>
  );
}
