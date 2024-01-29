const express = require('express');
const http = require('http');
var cors = require('cors')

const { Server } = require("socket.io");


const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origins: "http://localhost:5173/",
    }

});

// const io = socketIO(server, {
//     path: '/webrtc',
//     cors: {
//         origins: "http://localhost:5173/",
//     }
// });

const port = process.env.PORT || 8080;

io.on('connection', (socket) => {
    console.log("domegle connection esablish on", socket.id);

    socket.on("disconnect", () => {
        console.log("connection disconnected on", socket.id);
    });

    socket.on('sdp', data => {
        console.log(data)
        io.emit('sdp', data);
    })

    socket.on('candidate', data => {
        console.log(data);
        io.emit('candidate', data);
    })
});

// io.listen(server);
// const domegleSpace = io.of("/domegle")

// domegleSpace.on("connection", socket => {
//     console.log("socket connection esablish on", socket.id);

//     socket.emit('connection-success', {
//         status: "connection-success",
//         socketId: socket.id,
//     })

//     socket.on("disconnect", () => {
//         console.log("connection disconnected on", socket.id);
//     })

//     socket.on('sdp', data => {
//         console.log(data)
//         socket.broadcast.emit('sdp', data);
//     })

//     socket.on('candidate', data => {
//         console.log(data);
//         socket.broadcast.emit('candidate', data);
//     })

// });

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
