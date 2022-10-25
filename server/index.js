const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //   console.log(`Usuario ${socket.id} connected`);

  socket.on("send_1", (data) => {
    console.log(data.points);
    let result = Number(data.points) + 1;
    io.emit("receive_message", result);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001 loco");
});
