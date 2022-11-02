import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

const SocketTest = () => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [allUsersConnected, setAllUsersConnected] = useState([]);
  const [allData, setAllData] = useState([]);

  const joinRoom = () => {
    let tempData = {
      user: user,
      room: room,
    };
    if (user === "" || room === "") {
      alert("Name and room are required");
    } else {
      console.log(tempData);
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

  const uno = { name: "luis", puntos: 2 };

  useEffect(() => {
    console.log("useEffect fired");
    socket.on("addUser", (userToAdd) => {
      console.log(`Received user to add ${userToAdd}`);
      setAllUsersConnected((allUsersConnected) => [
        ...allUsersConnected,
        userToAdd,
      ]);
      console.log(allUsersConnected);
    });

    socket.on("receivedAllData", (data) => {
      console.log(`Received data after submit ${data}`);
      setAllData((allData) => [...allData, data]);
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
          <button
            onClick={(e) => {
              setUserPoints(1);
            }}
          >
            1
          </button>
          <button
            onClick={(e) => {
              setUserPoints(3);
            }}
          >
            3
          </button>
          <button
            onClick={(e) => {
              setUserPoints(5);
            }}
          >
            5
          </button>
          <button onClick={sendPoints}>Submit</button>
        </div>
      </div>
      <div>
        {allData.map((datos, index) => {
          return (
            <div key={index}>
              <h3>
                {datos.user}
                {datos.points}
                {datos.room}
              </h3>
            </div>
          );
        })}
      </div>
      <div>
        <h2>All users connected</h2>
        {allUsersConnected.map((user, index) => {
          return (
            <div key={index}>
              <h3>{user}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocketTest;
