import express from "express";
import { createServer } from "http";
import { Server } from "socket.io"; // Importing Server from socket.io
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS to allow cross-origin requests

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

// Listen for new connections
io.on("connection", (socket) => {
  // Listen for incoming messages from the client
  socket.on("sendMessage", (messageData) => {
    // Broadcast the message to all clients
    io.emit("receiveMessage", messageData);
  });

  // Handle disconnection
  socket.on("disconnect", () => {});
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {});
