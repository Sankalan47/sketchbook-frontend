import { io, Socket } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://sankalan-sketchbook-server.onrender.com"
    : "http://localhost:8080";

export const socketInstance: Socket = io(URL);
