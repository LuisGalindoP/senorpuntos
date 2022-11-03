import React, { useState, useEffect } from "react";
import axios from "axios";

const SessionJoin = (props) => {
  const [allSessions, setAllSessions] = useState([]);
  const { user, sessionName } = props;
  const [session, setSession] = useState({});
  const [userAdded, setUserAdded] = useState(false);

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
    //Create a new player with the we will push
    const newPlayer = {
      name: user,
      points: 0,
      voted: false,
    };
  }, []);

  //Use the sessionName to find the right session inside allSessions and set it to session
  useEffect(() => {
    if (allSessions) {
      for (let i = 0; i < allSessions.length; i++) {
        if (sessionName === allSessions[i].sessionName) {
          console.log(allSessions[i].sessionName);
          return setSession(allSessions[i]);
        }
      }
    }
  }, [allSessions]);

  //   //   Add the user to the session.players anb update in db
  //   useEffect(() => {
  //     //   Create a new player with the we will push
  //     const newPlayer = {
  //       name: user,
  //       points: 0,
  //       voted: false,
  //     };
  //     //Push the new player to the tempSession
  //     if (session.players) {
  //       const tempSession = session;
  //       console.log("tempSession", tempSession);
  //       tempSession.players.push(newPlayer);
  //       console.log("tempSession with new player", tempSession);
  //       //Update the session object in the database
  //       axios
  //         .put(`http://localhost:8000/session/${session._id}/edit`, {
  //           sessionName: session.sessionName,
  //           players: tempSession.players,
  //         })
  //         .then((response) => {
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.log(error.response.data.errors);
  //         });
  //     }
  //   }, []);

  return (
    <div>
      <h2>This is SessionJoin</h2>
      <h3>User {user}</h3>
      <h3>session name {sessionName}</h3>
      {session ? <h3>Id: {session._id}</h3> : null}
      {/* Set Session players and points */}
      {session.players
        ? session.players.map((player, index) => {
            return (
              <h3 key={index}>
                {player.name} : {player.points}
              </h3>
            );
          })
        : null}
    </div>
  );
};

export default SessionJoin;
