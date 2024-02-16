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
    console.log("domegle connection esablish on", socket.id);

    socket.emit('connection-success', {
        status: "connection-success",
        socketId: socket.id,
    })

    socket.on("disconnect", () => {
        console.log("connection disconnected on", socket.id);
    });

    socket.on('admitUser', data => {
        var user = new User(socket.id, data.userAddress);
        mainAlgoInstance.admitUser(user);

        socket.broadcast.emit('new user admit', user)

        //TODO: start from here
        // io.emit('wating pool', mainAlgoInstance.users);
        // io.emit('sdp', data);
    });

    socket.on('offer', data => {
        mainAlgoInstance.setOffer(data);
        socket.broadcast.emit('offer emit', data.offer);
        // io.emit('offer', data);
    });

    socket.on('candidate', data => {
        console.log(data);
        io.emit('candidate', data);
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
