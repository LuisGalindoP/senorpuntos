import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const SessionStart = (props) => {
  // BRING ALL SESSIONS FROM APP.JS TO READ AND UPDATE
  const { allSessions, setAllSessions } = props;
  const [newUser, setNewUser] = useState("");
  const [newSessionName, setNewSessionName] = useState("");
  const [joinSessionName, setJoinSessionName] = useState("");

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

  const addNewSession = (event) => {
    event.preventDefault();
    //CHECK IF SESSIO NAME IS IN USE
    for (let i = 0; i < allSessions.length; i++) {
      if (newSessionName === allSessions[i].sessionName)
        return alert("Session name already in use, select other");
    }
    //ADD A NEW SESSION AND ADD THE USER WHO CREATED IT
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
  };

  const joinSession = (event) => {
    event.preventDefault();
    //CHECK IF SESSION EXISTS
    console.log(allSessions);
    for (let i = 0; i < allSessions.length; i++) {
      console.log(allSessions[i].sessionName);
      if (joinSessionName === allSessions[i].sessionName) {
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
