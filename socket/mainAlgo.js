// interface User {
//   socketId: string;
//   address: string;
// }

class Session {
    constructor(_sessionId) {
        this.sessionId = "";
        this.sessionLive = false;
        this.offerer = {
            socketId: "",
            address: "",
            offer: {},
            iceCandidates: []
        };
        this.answerer = {
            socketId: "",
            address: "",
            answer: {},
            iceCandidates: []
        };
    }


}

// interface Session {
//   sessionId: string;
//   sessionLive: boolean;
//   offerer: {
//     socketId: string;
//     address: string;
//     offer: RTCSessionDescriptionInit;
//     iceCandidates: RTCIceCandidate[];
//   };
//   answerer: {
//     socketId: string;
//     address: string;
//     answer: RTCSessionDescriptionInit;
//     iceCandidates: RTCIceCandidate[];
//   };
// }

// export const watingPool: User[] = [];
// export const sessionList: Session[] = [];
