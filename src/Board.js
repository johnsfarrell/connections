import { useEffect, useState } from "react";
import "./Board.css";

const Cell = ({ value, handleClick, currentHighlighted, matches }) => {
  const handleCellClick = () => {
    handleClick(value);
  };

  const highlighted = currentHighlighted.includes(value);
  const matched = matches.some((match) => match.includes(value));

  let classString = !highlighted ? "cell" : "cell highlighted";
  classString = matched ? "cell matched" : classString;

  return (
    <button className={classString} onClick={handleCellClick}>
      {value}
    </button>
  );
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const Board = ({
  connections,
  handleCellClick,
  currentHighlighted,
  matches,
}) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const newBoard = [];
    const shuffledConnections = shuffle(connections);
    const fourConnections = shuffledConnections.slice(0, 4);
    let connectionValues = [];
    for (let i = 0; i < 4; i++) {
      const row = fourConnections[i].slice(1);
      const shuffledRow = shuffle(row);
      const rowVals = shuffledRow.slice(0, 4);
      connectionValues = connectionValues.concat(...rowVals);
    }
    const shuffledValues = shuffle(connectionValues);
    for (let i = 0; i < 4; i++) {
      newBoard.push(shuffledValues.slice(i * 4, i * 4 + 4));
    }
    setBoard(newBoard);
  }, [connections]);

  return (
    <>
      {matches.map((match, i) => (
        <div key={i} className={`match color${i + 1}`}>
          <h3>{match[0]}</h3>
          <p>{match.slice(1).join(", ")}</p>
        </div>
      ))}
      <div className="board">
        {board.flat().map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            currentHighlighted={currentHighlighted}
            handleClick={handleCellClick}
            matches={matches}
          />
        ))}
      </div>
    </>
  );
};
