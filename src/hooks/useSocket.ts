import { io } from "socket.io-client";

const socket = io("http://localhost:1629");
export default socket;
