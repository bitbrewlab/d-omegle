export const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:asia.relay.metered.ca:80",
      username: "a6d24450d0bb94535a638bf9",
      credential: "z+a2xBF8Guz8LkSF",
    },
    {
      urls: "turn:asia.relay.metered.ca:80?transport=tcp",
      username: "a6d24450d0bb94535a638bf9",
      credential: "z+a2xBF8Guz8LkSF",
    },
    {
      urls: "turn:asia.relay.metered.ca:443",
      username: "a6d24450d0bb94535a638bf9",
      credential: "z+a2xBF8Guz8LkSF",
    },
    {
      urls: "turns:asia.relay.metered.ca:443?transport=tcp",
      username: "a6d24450d0bb94535a638bf9",
      credential: "z+a2xBF8Guz8LkSF",
    },
  ],
});

export const chatChannel = peerConnection.createDataChannel("chat");
