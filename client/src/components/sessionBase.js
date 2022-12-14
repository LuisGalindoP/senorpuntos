import axios from "axios";
import React, { useState, useEffect } from "react";

const SessionBase = (props) => {
  const { allSessions, setAllSessions } = props;
  const { id } = props;
  const [session, setSession] = useState({});

  //GET SESSION USING THE ID FROM PROPS
  useEffect(() => {
    axios
      .get(`http://localhost:8000/session/${id}`)
      .then((response) => {
        console.log(response.data);
        setSession(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Session Base component</h2>
      <div>
        <h3>Session Info</h3>
        <h4>Session Id: {id}</h4>
        {session.players ? (
          <div>
            <h4>Session Name: {session.sessionName}</h4>
            <h4>Session Owner: {session.players[0].name}</h4>
            <h4>Total participants: {session.players.length}</h4>
          </div>
        ) : null}
      </div>
      <hr />
      {/* Table for users, points and button to vote */}

      <div>
        <h3>All users in session</h3>
        {session.players ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>points</th>
                </tr>
              </thead>
              <tbody>
                {session.players.map((player, index) => {
                  return (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td>{player.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SessionBase;
