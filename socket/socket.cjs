const express = require('express');
const http = require('http');
var cors = require('cors')

const { MainAlgo, User } = require("./algo");
const mainAlgoInstance = new MainAlgo();

const { Server } = require("socket.io");


const app = express();
app.use(cors());

const server = http.createServer({}, app);
const io = new Server(server, {
    cors: {
        origins: "http://localhost:5173/",
    }
});

const port = process.env.PORT || 8080;

io.on('connection', (socket) => {
    const userName = socket.handshake.auth.userName;
    console.log("domegle connection esablish on", socket.id);

    mainAlgoInstance.connectSocket.push({
        socketId: socket.id,
        userName
    });

    socket.emit('connection-success', {
        status: "connection-success",
        socketId: socket.id,
    })

    socket.on("disconnect", () => {
        console.log("connection disconnected on", socket.id);
    });

    socket.on('admitUser', data => {
        var user = new User(socket.id, data.userAddress, data.offer);
        mainAlgoInstance.users.push(user);
        socket.broadcast.emit('newUser', mainAlgoInstance.users.slice(-1))
    });

    socket.on("addIceCandidate", data => {
        let offer = mainAlgoInstance.users.find(user => user.address == data.userAddress);
        if (offer) {
            offer.ICEcandidate.push(data.candidate);
        }
        // socket.broadcast.emit("addIceCandidate", offer);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
