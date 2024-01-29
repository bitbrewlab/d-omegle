const express = require('express');
const http = require('http');
var cors = require('cors')

<<<<<<< HEAD
=======
const { MainAlgo, User } = require("./algo");
const mainAlgoInstance = new MainAlgo();

>>>>>>> 550a1ba (matching algorithm addded)
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
<<<<<<< HEAD
=======

    const user1 = new User("1", "1");
    const user2 = new User("2", "2");
    const user3 = new User("3", "3");
    const user4 = new User("4", "4");
    const user5 = new User("5", "5");
    const user6 = new User("6", "6");
    // const user7 = new User("7", "7");

    mainAlgoInstance.admitUser(user1);
    mainAlgoInstance.admitUser(user2);
    mainAlgoInstance.admitUser(user3);
    mainAlgoInstance.admitUser(user4);
    mainAlgoInstance.admitUser(user5);
    mainAlgoInstance.admitUser(user6);
    // mainAlgoInstance.admitUser(user7);

    mainAlgoInstance.matchUser();
    mainAlgoInstance.matchUser();
    mainAlgoInstance.matchUser();
    mainAlgoInstance.matchUser();
    mainAlgoInstance.matchUser();
>>>>>>> 550a1ba (matching algorithm addded)
});
