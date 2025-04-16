import { useState, useEffect } from "react";

function WordGridGame({ gameState, onWordSubmit, currentPlayer, roomName }) {
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (gameState?.grid) {
      setGrid(gameState.grid);
    }
    if (gameState?.foundWords) {
      setFoundWords(gameState.foundWords || []);
    }
  }, [gameState]);

  const isAdjacent = (cell1, cell2) => {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
  };

  const isCellSelected = (row, col) => {
    return selectedCells.some((cell) => cell.row === row && cell.col === col);
  };

  const handleMouseDown = (row, col) => {
    const newSelectedCells = [{ row, col }];
    setSelectedCells(newSelectedCells);
    setCurrentWord(grid[row][col]);
    setIsSelecting(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isSelecting) return;

    const lastCell = selectedCells[selectedCells.length - 1];

    // Check if the cell is adjacent to the last selected cell
    if (isAdjacent(lastCell, { row, col })) {
      // Check if the cell is not already selected
      if (!isCellSelected(row, col)) {
        const newSelectedCells = [...selectedCells, { row, col }];
        setSelectedCells(newSelectedCells);
        setCurrentWord(
          newSelectedCells.map((cell) => grid[cell.row][cell.col]).join("")
        );
      }
    }
  };

  const handleMouseUp = () => {
    if (currentWord.length >= 3) {
      submitWord();
    }

    resetSelection();
  };

  const resetSelection = () => {
    setSelectedCells([]);
    setCurrentWord("");
    setIsSelecting(false);
  };

  const submitWord = () => {
    if (currentWord.length < 3) return;

    onWordSubmit(currentWord, selectedCells);
  };

  // Calculate grid size
  const gridSize = grid.length;

  return (
    <div className="p-4 rounded-lg shadow bg-card">
      <h2 className="mb-4 text-xl font-bold">Word Grid Puzzle</h2>

      <div className="mb-4">
        <p className="font-medium">
          Current Word: <span className="text-primary">{currentWord}</span>
        </p>
      </div>

      <div
        className={`grid  bg-gray-300 border border-gray-400 mb-4`}
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        onMouseLeave={() => isSelecting && resetSelection()}
      >
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const isSelected = isCellSelected(rowIndex, colIndex);
            let cellStyle = "word-grid-cell";
            if (isSelected) cellStyle += " selected";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellStyle}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              >
                {letter.toUpperCase()}
              </div>
            );
          })
        )}
      </div>

      <div className="mb-4">
        <h3 className="mb-2 font-bold">Found Words:</h3>
        <div className="flex flex-wrap gap-2">
          {foundWords.map((wordObj, index) => (
            <div
              key={index}
              className={`px-2 py-1 rounded text-sm ${
                wordObj.player === currentPlayer
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {wordObj.word} <span className="text-xs">({wordObj.player})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordGridGame;
