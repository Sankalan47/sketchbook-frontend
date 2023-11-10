import { io, Socket } from "socket.io-client";

export const socketInstance: Socket = io("http://localhost:8080");
