import { useState } from "react";
import { useEffect } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [updatedPoints, setUpdatedPoints] = useState(false);
  const [average, setAverage] = useState(0);

  class player {
    constructor(name) {
      this.name = name;
      this.points = 0;
    }
  }

  const getAverage = () => {
    let sum = 0;
    for (let i = 0; i < players.length; i++) {
      sum += players[i].points;
    }
    return sum / players.length;
  };

  const formHandler = (event) => {
    event.preventDefault();
    setName(event.target.name);
    let tempObject = new player(name);
    setPlayers([...players, tempObject]);
  };

  const addPoints = (playerName, points) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === playerName) {
        players[i].points = points;
        setUpdatedPoints(!updatedPoints);
      }
    }
  };
  useEffect(() => {
    setAverage(getAverage());
  }, [average]);

  return (
    <div>
      <form onSubmit={formHandler}>
        <div>
          <label>NAME:</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <button type={"submit"}>Add player</button>
      </form>
      <h3>Amount of players: {players.length}</h3>
      <h3>Average of points: {average}</h3>
      {players.map((player, index) => {
        return (
          <div key={index}>
            <h3>{player.name}</h3>
            <h3>{player.points}</h3>
            <button
              onClick={(event) => {
                addPoints(player.name, 1);
              }}
            >
              add 1 point
            </button>
            <button
              onClick={(event) => {
                addPoints(player.name, 2);
              }}
            >
              add 2 point
            </button>
            <button
              onClick={(event) => {
                addPoints(player.name, 7);
              }}
            >
              add 7 point
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
