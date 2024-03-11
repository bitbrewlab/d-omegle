import { io } from "socket.io-client";

// ___For Local Development___
// export const socket = io("http://localhost:1629");

// ___For Production___
export const socket = io("https://socket.0xdomegle.com");
