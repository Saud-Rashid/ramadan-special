import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const buses = new Map();

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // Send existing buses
  socket.emit("initialLocations", Array.from(buses.entries()));

  socket.on("locationUpdate", ({ busId, lat, lng }) => {
    if (!busId) return;

    buses.set(busId, { lat, lng, socketId: socket.id });

    io.emit("locationUpdate", { busId, lat, lng });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    for (const [busId, data] of buses.entries()) {
      if (data.socketId === socket.id) {
        buses.delete(busId);
        io.emit("busRemoved", busId);
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});