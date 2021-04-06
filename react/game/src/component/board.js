import React from "react";
import "./board.css";
import Square from "./square";

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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      turnX: true,
    };
  }

  handleClick = (i) => {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    this.state.turnX ? (squares[i] = "x") : (squares[i] = "o");
    this.setState((state) => ({
      squares: squares,
      turnX: !state.turnX,
    }));
  };
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = `Next player:${this.state.turnX ? "X" : "O"}`;
    }

    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square
            value={this.state.squares[0]}
            onClick={() => this.handleClick(0)}
          />
          <Square
            value={this.state.squares[1]}
            onClick={() => this.handleClick(1)}
          />
          <Square
            value={this.state.squares[2]}
            onClick={() => this.handleClick(2)}
          />
        </div>
        <div className="board-row">
          <Square
            value={this.state.squares[3]}
            onClick={() => this.handleClick(3)}
          />
          <Square
            value={this.state.squares[4]}
            onClick={() => this.handleClick(4)}
          />
          <Square
            value={this.state.squares[5]}
            onClick={() => this.handleClick(5)}
          />
        </div>
        <div className="board-row">
          <Square
            value={this.state.squares[6]}
            onClick={() => this.handleClick(6)}
          />
          <Square
            value={this.state.squares[7]}
            onClick={() => this.handleClick(7)}
          />
          <Square
            value={this.state.squares[8]}
            onClick={() => this.handleClick(8)}
          />
        </div>
        <br></br>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() =>
              this.setState({ squares: Array(9).fill(null), turnX: true })
            }
          >
            New Game
          </button>
        </div>
      </>
    );
  }
}

export default Board;
