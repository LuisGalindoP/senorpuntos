import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const Session = (props) => {
  const { allSessions, setAllSessions } = props;
  const { id } = props;
  const [session, setSession] = useState({});
  const { user } = props;
  const [userIdArray, setUserIdArray] = useState(4); //4 is used to be sure is updating
  const [userPoints, setUserPoints] = useState(0);
  const [reload, setReload] = useState(false);

  //GET THE SESSION INFORMATION USING THE ID
  useEffect(() => {
    axios
      .get(`http://localhost:8000/session/${id}`)
      .then((response) => {
        console.log("response data from geting session", response.data);
        setSession(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("User", user);
    console.log("ID", id);
    console.log("userIdArray", userIdArray);
  }, [reload]);

  //Get the index number inside the session.players array to update it
  useEffect(() => {
    if (session.players) {
      for (let i = 0; i < session.players.length; i++) {
        console.log(session.players[i]);
        if (user === session.players[i].name) {
          setUserIdArray(i);
        }
      }
    }
  }, [session]);

  //update the players points and voted status
  //Use axios to update the whole object
  const handlePointsVote = () => {
    const tempSession = session;
    tempSession.players[userIdArray] = {
      name: user,
      points: userPoints,
      voted: true,
    };

    axios
      .put(`http://localhost:8000/session/${id}/edit`, {
        sessionName: session.sessionName,
        players: session.players,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });

    setSession(tempSession);
    setReload(!reload);
  };

  return (
    <div>
      <h2>Session Id is {id} </h2>
      <h2>User is {user} </h2>
      <h2>Session name is {session.sessionName}</h2>
      <h2>Session player id array is {userIdArray}</h2>
      {session.players ? (
        <h2>
          Session master is: {session.players[0].name}{" "}
          {session.players[0].points}
        </h2>
      ) : null}
      {/* CHANGES TO VOTE */}
      <div>
        <button
          onClick={(e) => {
            setUserPoints(1);
          }}
        >
          1
        </button>
        <button
          onClick={(e) => {
            setUserPoints(3);
          }}
        >
          3
        </button>
        <button
          onClick={(e) => {
            setUserPoints(5);
          }}
        >
          5
        </button>
        <button onClick={handlePointsVote}>Submit</button>
      </div>
    </div>
  );
};

export default Session;
