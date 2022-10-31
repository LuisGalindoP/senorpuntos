import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

const SocketTest = () => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [allData, setAllData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const joinRoom = () => {
    let tempData = {
      user: user,
      room: room,
    };
    if (user === "" || room === "") {
      alert("Name and room are required");
    } else {
      console.log(`Data to joinRoom ${tempData}`);
      socket.emit("joinRoom", tempData);
    }
  };

  const sendPoints = async () => {
    const messageData = {
      room: room,
      user: user,
      points: userPoints,
    };
    await socket.emit("sendPoints", messageData);
  };

  // Main useEffect to receive data from Websocket
  useEffect(() => {
    console.log("useEffect fired");
    socket.on("receivedAllData", (data) => {
      setAllData((allData) => [...allData, data]);
    });
    socket.on("users", (data) => {
      console.log(data.user);
      setAllUsers(allUsers.push({ user: data.user, points: 0 }));
      console.log(allUsers);
    });
  }, [socket]);

  return (
    <div>
      <h3>Join a room</h3>
      <input
        type="text"
        placeholder="Your Name..."
        onChange={(event) => {
          setUser(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join</button>
      <hr />
      {/* CHAT example */}
      <div>
        <h3>You are connected to {room} room</h3>
        <div>
          <input
            type="number"
            onChange={(event) => {
              setUserPoints(event.target.value);
            }}
          />
          <button onClick={sendPoints}>Send</button>
        </div>
      </div>
      {/* Map for data sent */}
      <div>
        {allData.map((datos, index) => {
          return (
            <div key={index}>
              <h3>
                {datos.length}
                {datos.user}
                {datos.points}
                {datos.room}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocketTest;
