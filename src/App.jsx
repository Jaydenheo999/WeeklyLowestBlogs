import React, { useState } from 'react';
import './App.css';

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const isValidSudoku = (board) => {
  const rows = Array(9).fill(0).map(() => new Set());
  const cols = Array(9).fill(0).map(() => new Set());
  const boxes = Array(9).fill(0).map(() => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num === 0) continue;
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }

      rows[i].add(num);
      cols[j].add(num);
      boxes[boxIndex].add(num);
    }
  }

  return true;
};

function App() {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (row, col, value) => {
    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? parseInt(value) || 0 : c))
    );
    setBoard(newBoard);
  };

  const handleCheck = () => {
    if (isValidSudoku(board)) {
      alert('Success');
    } else {
      alert('Wrong');
    } 
  };

  return ( 
    <div className="sudoku-container">
      <table className="sudoku-board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="sudoku-cell">
                  <input
                    type="text"
                    maxLength="1"
                    value={cell !== 0 ? cell : ''}
                    onChange={(e) =>
                      handleChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCheck} className="check-button">Check</button>
    </div>
  );
}

export default App;