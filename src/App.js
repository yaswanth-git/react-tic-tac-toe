import "./styles.css";
import { useState } from "react";

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [board, setboard] = useState(
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
      return {
        id: i,
        clickedBy: ""
      };
    })
  );
  const handleClick = (x) => {
    if (winner === "") {
      const temp = [...board];
      temp[x].clickedBy = currentPlayer;
      setboard(temp);
      checkWin();
    }
  };
  const checkWin = () => {
    if (winner === "") {
      if (
        (board[0].clickedBy === currentPlayer &&
          board[1].clickedBy === currentPlayer &&
          board[2].clickedBy === currentPlayer) ||
        (board[3].clickedBy === currentPlayer &&
          board[4].clickedBy === currentPlayer &&
          board[5].clickedBy === currentPlayer) ||
        (board[6].clickedBy === currentPlayer &&
          board[7].clickedBy === currentPlayer &&
          board[8].clickedBy === currentPlayer) ||
        (board[0].clickedBy === currentPlayer &&
          board[4].clickedBy === currentPlayer &&
          board[8].clickedBy === currentPlayer) ||
        (board[2].clickedBy === currentPlayer &&
          board[4].clickedBy === currentPlayer &&
          board[6].clickedBy === currentPlayer) ||
        (board[0].clickedBy === currentPlayer &&
          board[3].clickedBy === currentPlayer &&
          board[6].clickedBy === currentPlayer) ||
        (board[1].clickedBy === currentPlayer &&
          board[4].clickedBy === currentPlayer &&
          board[7].clickedBy === currentPlayer) ||
        (board[2].clickedBy === currentPlayer &&
          board[5].clickedBy === currentPlayer &&
          board[8].clickedBy === currentPlayer)
      ) {
        setWinner(currentPlayer);
      } else {
        let flag = true;
        for (let i = 0; i < 9; i++) {
          if (board[i].clickedBy === "") {
            flag = false;
          }
        }
        if (flag) {
          setWinner("draw");
        } else {
          setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
      }
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>

      <div className="board">
        {board.map((i) => {
          if (i.clickedBy !== "") {
            return (
              <div className="cell" key={i.id} id={i.id}>
                <div className="player">{i.clickedBy}</div>
              </div>
            );
          } else {
            return (
              <div
                key={i.id}
                id={i.id}
                className="cell"
                onClick={() => {
                  handleClick(i.id);
                }}
              ></div>
            );
          }
        })}
      </div>
      {winner !== "" ? (
        winner !== "draw" ? (
          <h1>Player {winner} won the game.</h1>
        ) : (
          <h1>It is a draw</h1>
        )
      ) : (
        <></>
      )}
      {winner === "" ? <h3>Current Player is {currentPlayer}</h3> : <></>}
    </div>
  );
}
