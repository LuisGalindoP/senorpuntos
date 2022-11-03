import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const SessionStart = (props) => {
  // BRING ALL SESSIONS FROM APP.JS TO READ AND UPDATE
  const { allSessions, setAllSessions } = props;
  const [newUser, setNewUser] = useState("");
  const [newSessionName, setNewSessionName] = useState("");
  const [joinSessionName, setJoinSessionName] = useState("");

  //GET ALL SESSIONS
  useEffect(() => {
    axios
      .get("http://localhost:8000/sessions")
      .then((response) => {
        console.log(response.data);
        setAllSessions(response.data);
      })
      .catch((error) => {
        console.log("Error in useEffect getting all sessions");
      });
  }, []);

  //FUNCTION TO CREATE A NEW SESSION
  const addNewSession = (event) => {
    event.preventDefault();
    //Check if session name is in use
    for (let i = 0; i < allSessions.length; i++) {
      if (newSessionName === allSessions[i].sessionName)
        return alert("Session name already in use, select other");
    }
    //Create a new session
    //Pass the info including the user information to create the first player
    //navitage to Session component
    axios
      .post("http://localhost:8000/session/new", {
        sessionName: newSessionName,
        players: [{ name: newUser, points: 0, voted: false }],
      })
      .then((response) => {
        setAllSessions([...allSessions, response.data]);

        navigate(`/session/${response.data._id}/${newUser}`);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("allSessions from session component", allSessions);
  };

  //FUNCTION TO JOIN A SESSION
  const joinSession = (event) => {
    event.preventDefault();
    //Check if session exists
    console.log(allSessions);
    for (let i = 0; i < allSessions.length; i++) {
      console.log(allSessions[i].sessionName);
      if (joinSessionName === allSessions[i].sessionName) {
        //Copy the players in the session[i]
        const tempPlayers = allSessions[i].players;
        //Create a temporal player object to push to the right session
        let tempPlayer = {
          name: newUser,
          points: 0,
          voted: false,
        };
        tempPlayers.push(tempPlayer);

        //Update the righ session
        axios
          .put(`http://localhost:8000/session/${allSessions[i]._id}/edit`, {
            sessionName: allSessions[i].sessionName,
            players: tempPlayers,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response.data.errors);
          });

        navigate(`/joined/${joinSessionName}/${newUser}`);
        return console.log("welcome to the session", joinSessionName);
      }
    }
    console.log("Session does not exist");
  };

  return (
    <div>
      <h1>Session Start</h1>
      {/* START A NEW SESSION */}
      <h3>Start a new session</h3>
      <div>
        <label>Your Name </label>
        <input
          type="text"
          onChange={(e) => {
            setNewUser(e.target.value);
          }}
        />
        <br />
        <label>Session Name </label>
        <input
          type="text"
          onChange={(e) => {
            setNewSessionName(e.target.value);
          }}
        />
        <button onClick={addNewSession}>Create</button>
      </div>
      {/* JOIN A SESSION */}
      <h3>Join a session</h3>
      <div>
        <label>Your Name </label>
        <input
          type="text"
          onChange={(e) => {
            setNewUser(e.target.value);
          }}
        />
        <br />
        <label>Session Name </label>
        <input
          type="text"
          onChange={(e) => {
            setJoinSessionName(e.target.value);
          }}
        />
        <button onClick={joinSession}>Join</button>
      </div>
    </div>
  );
};

export default SessionStart;
