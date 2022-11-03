import { useState, useEffect } from "react";
import axios from "axios";
import { Router } from "@reach/router";

import SessionBase from "./components/sessionBase";
import Landing from "./components/landing";

function App() {
  const [allSessions, setAllSessions] = useState([]);

  return (
    <div>
      <Router>
        <SessionBase path={"/session/:id"} />
        <Landing path={"/"} />
      </Router>
    </div>
  );
}

export default App;
