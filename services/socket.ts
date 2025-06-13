import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001"; // change to your backend socket URL

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: false, // if needed for auth
});

export default socket;