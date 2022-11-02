import { useState, useEffect } from "react";
import axios from "axios";
import { Router } from "@reach/router";

import SessionStart from "./components/sessionStart";
import Session from "./components/session";

function App() {
  const [allSessions, setAllSessions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sessions")
      .then((response) => {
        setAllSessions(response.data);
      })
      .catch((error) => {
        console.log("Error in useEffect getting all sessions");
      });
  }, []);

  return (
    <div>
      <Router>
        <SessionStart
          path={"/"}
          allSessions={allSessions}
          setAllSessions={setAllSessions}
        />
        <Session path={"/session/:id/:user"} allSessions={allSessions} />
      </Router>
    </div>
  );
}

export default App;
