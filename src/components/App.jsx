import React, { useState } from "react";
import "../style.css";
import Square from "./Square";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [s, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (s[i] || calculateWinner(s)) {
      return;
    }
    const nextSquares = s.slice(); //copies the array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // changing useState to false
  }

  const winner = calculateWinner(s);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

    let handleReset = () => {
        setSquares(Array(9).fill(null));
    }
 
  return (
    <>
      {winner ? 
      ( <div class="container"  >
      <h1>Winner is {winner}</h1>
      <button className="reset" onClick={handleReset}>Play Again</button></div>) : 
      <>
      <div className="status">{status}</div>
         <div className="board">
            <div className="board-row">
          <Square
            className="bl bt"
            value={s[0]}
            onSquareClick={() => handleClick(0)}
          />
          <Square
            
            value={s[1]}
            onSquareClick={() => handleClick(1)}
          />
          <Square
            value={s[2]}
            onSquareClick={() => handleClick(2)}
          />
            </div>
            <div className="board-row">
          <Square
            value={s[3]}
            onSquareClick={() => handleClick(3)}
          />
          <Square
            className="b"
            value={s[4]}
            onSquareClick={() => handleClick(4)}
          />
          <Square
            className="br"
            value={s[5]}
            onSquareClick={() => handleClick(5)}
          />
            </div>
            <div className="board-row">
          <Square
            value={s[6]}
            onSquareClick={() => handleClick(6)}
          />
          <Square
            className="bb"
            value={s[7]}
            onSquareClick={() => handleClick(7)}
          />
          <Square
            className="bb br"
            value={s[8]}
            onSquareClick={() => handleClick(8)}
          />
            </div>
         </div>
      </>}
   </>
  );
}

function calculateWinner(s) {
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
    if (s[a] && s[a] === s[b] && s[a] === s[c]) {
      return s[a];
    }
  }
  return null;
}
