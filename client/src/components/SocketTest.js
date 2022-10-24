import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

const SocketTest = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  //function to send a message to the backend
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  //this useEffect will listen to changes on the socket variable
  //it will alert when a new message is received
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SocketTest;
