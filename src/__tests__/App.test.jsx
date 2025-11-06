/* eslint-env vitest */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";


describe("Tic Tac Toe Game", () => {
  test("renders the game title", () => {
    render(<App />);
    expect(screen.getByText(/Tic Tac Toe 💜/i)).toBeInTheDocument();
  });

  test("allows players to make moves", () => {
    render(<App />);
    const cells = screen.getAllByRole("button", { name: "" });

    // First click - X
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent("X");

    // Second click - O
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent("O");
  });

  test("resets the board when Restart button is clicked", () => {
    render(<App />);
    const cells = screen.getAllByRole("button", { name: "" });
    const resetButton = screen.getByText(/Restart Game/i);

    fireEvent.click(cells[0]); // Make a move
    fireEvent.click(resetButton); // Reset
    expect(cells[0]).toHaveTextContent(""); // Should be empty again
  });
});
