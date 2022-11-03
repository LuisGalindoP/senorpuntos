import axios from "axios";
import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

const Landing = () => {
  const [allSessions, setAllSessions] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newSessionName, setNewSessionName] = useState("");
  const [reload, setReload] = useState(false);

  //GET ALL SESSIONS
  useEffect(() => {
    axios
      .get("http://localhost:8000/sessions")
      .then((response) => {
        console.log("response.data from useEffect", response.data);
        setAllSessions(response.data);
      })
      .catch((error) => {
        console.log("Error in useEffect getting all sessions");
      });
  }, [reload]);

  //CREATE NEW SESSION
  const createNewSession = (event) => {
    event.preventDefault();
    console.log("createNewSession fired");
    //Check if newSessionName exists
    for (let i = 0; i < allSessions.length; i++) {
      if (newSessionName === allSessions[i].sessionName) {
        return alert("This session name is taken");
      }
    }
    //Post the new session
    axios
      .post("http://localhost:8000/session/new", {
        sessionName: newSessionName,
        players: [{ name: newUser, points: 0, voted: false }],
      })
      .then((response) => {
        setAllSessions([...allSessions, response.data]);
        setReload(!reload);
        navigate(`/session/${response.data._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Landing</h3>
      <div>
        <h3>Create a new Session</h3>
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
        <button onClick={createNewSession}>Create</button>
      </div>
    </div>
  );
};

export default Landing;
