const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

// creates the Socket.IO server.
const io = new Server(server);

app.use(express.static("public"));

// "Whenever a client establishes a Socket.IO connection, execute this function."
io.on("connection", (socket) => {

    console.log("User connected: ", socket.id);

    // Server ==> Browser
    //socket.emit("message", "Hello from the server!");

    // Browser ==> Server
    // Listen for an event called "message"
    // so everytime socket.emit("message") run, this function run
    //socket.on("message", (message) => {
    //    console.log("Message received:", message);
    //});


    // -------------------------
    // User joins the chat
    socket.on("join", (username) => {

        socket.username = username;

        console.log(username, "joined the chat");

        socket.broadcast.emit("userJoined", username);

    });

    // -------------------------
    // User sends message
    socket.on("message", (data) => {
        
        io.emit("message", data);

    });

    // -------------------------
    //socket.on("message", (message) => {
        //console.log("Message received:", message);
        // io.emit send message to everyone
        //io.emit("message", message);
    //});


    // -------------------------
    // User disconnects
    socket.on("disconnect", () => {
        console.log("A user disconnected!");

        if (socket.username) {

            socket.broadcast.emit(
                "user left",
                socket.username
            );

        }
    });

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});