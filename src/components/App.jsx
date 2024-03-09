import React, { useState } from "react";
import "../style.css";
import Square from "./Square";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); //copies the array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // changing useState to false
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleReset = () => {
    setSquares(Array(9).fill(null));
  };

  return (
    <>
      {winner || !squares.includes(null) ? (
        <div class="container">
          <h1>{status}</h1>
          <button className="reset" onClick={handleReset}>
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="status">{status}</div>
          <div className="board">
            <div className="board-row">
              {[0, 1, 2].map((i) => (
                <Square
                  key={i}
                  className={getClassForSquare(i)}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                />
              ))}
            </div>
            <div className="board-row">
              {[3, 4, 5].map((i) => (
                <Square
                  key={i}
                  className={getClassForSquare(i)}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                />
              ))}
            </div>
            <div className="board-row">
              {[6, 7, 8].map((i) => (
                <Square
                  key={i}
                  className={getClassForSquare(i)}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function getClassForSquare(index) {
  const classes = ["square"];
  if (index === 0 || index === 3 || index === 6) {
    classes.push("l");
  }
  if (index === 2 || index === 5 || index === 8) {
    classes.push("r");
  }
  if (index === 0 || index === 1 || index === 2) {
    classes.push("t");
  }
  if (index === 6 || index === 7 || index === 8) {
    classes.push("b");
  }
  return classes.join(" ");
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
