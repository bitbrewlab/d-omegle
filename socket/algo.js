class User {
    constructor(_socketId, _address, _offer) {
        this.socketId = _socketId;
        this.address = _address;
        this.available = true;
        this.roomId = null;
        this.offer = _offer;
        this.ICEcandidate = [];
    }
}

class Room {
    constructor(_roomId, _user1, _user2) {
        this.roomId = _roomId;
        this.user1 = _user1;
        this.user2 = _user2;
    }
}

class MainAlgo {
    constructor() {
        this.users = [];
        this.connectSocket = [];
    }

    admitUser(_user) {
    }

    setIceCandidate(_data) {
    }

    setAnswer(_data, _userId) {

    }

    generateRandomId() {
        return Math.floor(Math.random() * this.users.length);
    }

    createRoom(user1id, user2id) {
        const user1 = this.users[user1id];
        const user2 = this.users[user2id];

        this.users.splice(user1id, 1);
        this.users.splice(user2id > user1id ? user2id - 1 : user2id, 1);

        const room = new Room(Date.now(), user1, user2);
        user1.available = false;
        user2.available = false;

        return room;
    }

    matchUser() {
        const maxRetries = 10;

        if (this.connectSocket.length >= 2) {
            for (let retry = 0; retry < maxRetries; retry++) {
                const user1id = this.generateRandomId();
                const user2id = this.generateRandomId();

                if (
                    user1id !== user2id &&
                    this.users[user1id].available &&
                    this.users[user2id].available
                ) {
                    const room = this.createRoom(user1id, user2id);
                    console.log(room);
                    return;
                }
            }
        }

        else if (this.users.length === 2) {
            this.createRoom(0, 1);
        }
        else {
            console.log("=== error ===");
            console.log("none user in pending state.. wait for while..")
        }
    }
}

module.exports = { User, MainAlgo };
