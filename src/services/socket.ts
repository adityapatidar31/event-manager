import { io } from "socket.io-client";
import { BASE_URL } from "./backend";

export const socket = io(BASE_URL, {
  transports: ["websocket", "polling"], // Ensures WebSocket fallback
  withCredentials: true, // Needed if cookies/sessions are used
  autoConnect: false,
});
