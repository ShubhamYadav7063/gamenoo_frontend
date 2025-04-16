import { useState, useEffect } from "react";

function SudokuGame({ gameState, onCellUpdate, currentPlayer, roomName }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [board, setBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(0))
  );
  const [prefilled, setPrefilled] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(false))
  );
  const [cellOwners, setCellOwners] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(null))
  );

  useEffect(() => {
    if (gameState?.board) {
      setBoard(gameState.board);
    }
    if (gameState?.prefilled) {
      setPrefilled(gameState.prefilled);
    }
    if (gameState?.cellOwners) {
      setCellOwners(gameState.cellOwners);
    }
  }, [gameState]);

  const handleCellClick = (row, col) => {
    if (prefilled[row][col]) return;
    setSelectedCell({ row, col });
  };

  const handleKeyDown = (e) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    // Handle number inputs (1-9)
    if (e.key >= "1" && e.key <= "9") {
      const value = parseInt(e.key);
      handleCellValueChange(row, col, value);
    }
    // Handle backspace or delete to clear cell
    else if (e.key === "Backspace" || e.key === "Delete") {
      handleCellValueChange(row, col, 0);
    }
    // Handle arrow keys for navigation
    else if (e.key === "ArrowUp" && row > 0) {
      setSelectedCell({ row: row - 1, col });
    } else if (e.key === "ArrowDown" && row < 8) {
      setSelectedCell({ row: row + 1, col });
    } else if (e.key === "ArrowLeft" && col > 0) {
      setSelectedCell({ row, col: col - 1 });
    } else if (e.key === "ArrowRight" && col < 8) {
      setSelectedCell({ row, col: col + 1 });
    }
  };

  const handleCellValueChange = (row, col, value) => {
    if (prefilled[row][col]) return;

    // Update locally first for faster feedback
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);

    // Send update to server
    onCellUpdate(row, col, value);
  };

  const handleNumberButtonClick = (number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    handleCellValueChange(row, col, number);
  };

  const isCellValid = (row, col, value) => {
    if (value === 0) return true; // Empty cell is valid

    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === value) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === value) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const r = boxRow + i;
        const c = boxCol + j;
        if ((r !== row || c !== col) && board[r][c] === value) return false;
      }
    }

    return true;
  };

  return (
    <div
      className="p-4 rounded-lg shadow bg-card"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <h2 className="mb-4 text-xl font-bold">Sudoku Puzzle</h2>

      <div className="grid grid-cols-9 mb-4 overflow-hidden bg-gray-300 border border-gray-400">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isPreFilled = prefilled[rowIndex][colIndex];
            const owner = cellOwners[rowIndex][colIndex];
            const isValid = isCellValid(rowIndex, colIndex, cell);

            // Start with base light border for every cell
            let cellStyle = "sudoku-cell ";

            // Add thick border every 3 cells
            if (rowIndex % 3 === 0) cellStyle += " border-t-2 border-gray-400";
            if (colIndex % 3 === 0) cellStyle += " border-l-2 border-gray-400";
            if (rowIndex === 8) cellStyle += " border-b-2 border-gray-400";
            if (colIndex === 8) cellStyle += " border-r-2 border-gray-400";

            // Dynamic styles
            if (isPreFilled) cellStyle += " prefilled";
            if (isSelected) cellStyle += " selected";
            if (!isValid) cellStyle += " bg-red-100";
            if (owner && owner !== currentPlayer)
              cellStyle += " border-2 border-blue-400";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellStyle}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell > 0 ? cell : ""}
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            className="flex items-center justify-center w-10 h-10 text-lg font-medium bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => handleNumberButtonClick(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="flex items-center justify-center w-16 h-10 text-lg font-medium bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() =>
            selectedCell &&
            handleCellValueChange(selectedCell.row, selectedCell.col, 0)
          }
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SudokuGame;
