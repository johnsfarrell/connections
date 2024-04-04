import { useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { connections } from "./connections";

const checkMatch = (values) => {
  for (let i = 0; i < connections.length; i++) {
    if (connections[i].slice(1).every((value) => values.includes(value))) {
      return true;
    }
  }
  return false;
};

const getMatchCategory = (values) => {
  for (let i = 0; i < connections.length; i++) {
    if (connections[i].slice(1).every((value) => values.includes(value))) {
      return connections[i][0];
    }
  }
};

function App() {
  const [currentHighlighted, setCurrentHighlighted] = useState([]);
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState(
    "Click below to submit your selections."
  );

  const handleSubmit = () => {
    if (currentHighlighted.length !== 4) {
      setMessage("You must select 4 values to submit.");
      return;
    }

    if (checkMatch(currentHighlighted)) {
      setMatches((prevMatches) => [
        ...prevMatches,
        [getMatchCategory(currentHighlighted), ...currentHighlighted],
      ]);
      setMessage("Congratulations! You found a match!");
      setCurrentHighlighted([]);
      return;
    }

    setMessage("No match found. Try again.");
  };

  const handleCellClick = (value) => {
    if (currentHighlighted.includes(value)) {
      setCurrentHighlighted((prevHighlighted) =>
        prevHighlighted.filter((highlighted) => highlighted !== value)
      );
      return;
    }

    if (currentHighlighted.length === 4) {
      setMessage("You can only select 4 values at a time.");
      return;
    }

    setCurrentHighlighted((prevHighlighted) => [...prevHighlighted, value]);
    console.log(currentHighlighted);
  };

  const win = matches.length === 4;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Connections!</h1>
      </header>
      <Board
        connections={connections}
        currentHighlighted={currentHighlighted}
        matches={matches}
        handleCellClick={handleCellClick}
      />
      <p>{win ? "You Won!" : message}</p>
      {!win && (
        <button id="submit" onClick={handleSubmit}>
          <b>Submit</b>
        </button>
      )}
      <button id="reset" onClick={() => window.location.reload()}>
        <b>{!win ? "Skip" : "New Game"}</b>
      </button>
    </div>
  );
}

export default App;
