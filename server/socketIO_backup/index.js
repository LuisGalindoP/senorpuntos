// IMPORTANT!!!! CHANGE THE MAIN INSIDE PACKAGE.JASON TO INDEX.JS BEFORE RUNNING THIS SERVER

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

let amountOfUsers = 0;
let users = [];
let userPoints = [];

io.on("connection", (socket) => {
  console.log(`Usuario ${socket.id} connected`);

  //Socket to join a Room
  socket.on("joinRoom", (data) => {
    socket.join(data.room);
    console.log(`User ${data.user} joined ${data.room} room`);
<<<<<<< HEAD:server/socketIO_backup/index.js
    io.to(data.room).emit("addUser", data.user);
    console.log(`User to add ${data.user}`);
=======
    io.to(data.room).emit("users", data);
>>>>>>> b0e4c962a72b67aa13349dc1b4c6776705632fb9:server/index.js
  });

  //Socket to sendPoints and info aboutback to fronEnd
  socket.on("sendPoints", (data) => {
    console.log(data);
    io.to(data.room).emit("receivedAllData", data);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario ${socket.id} disconnected`);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001 loco");
});
