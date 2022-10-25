import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

const SocketTest = () => {
  const [points, setPoints] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  //function to send a message to the backend
  const sendPoints = () => {
    socket.emit("send_1", { points: points });
  };

  //this useEffect will listen to changes on the socket variable
  //it will alert when a new message is received
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data);
    });
  }, [socket]);

  return (
    <div>
      <input
        type="number"
        onChange={(event) => {
          setPoints(event.target.value);
        }}
      />
      <button onClick={sendPoints}>Send</button>
      <h2>{messageReceived}</h2>
    </div>
  );
};

export default SocketTest;
