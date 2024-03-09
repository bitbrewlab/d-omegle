export const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: "a50e46b99ff2436b69bf5032",
      credential: "OCqbuiUCs0+ryn6Q",
    },
    {
      urls: "turn:standard.relay.metered.ca:80?transport=tcp",
      username: "a50e46b99ff2436b69bf5032",
      credential: "OCqbuiUCs0+ryn6Q",
    },
    {
      urls: "turn:standard.relay.metered.ca:443",
      username: "a50e46b99ff2436b69bf5032",
      credential: "OCqbuiUCs0+ryn6Q",
    },
    {
      urls: "turns:standard.relay.metered.ca:443?transport=tcp",
      username: "a50e46b99ff2436b69bf5032",
      credential: "OCqbuiUCs0+ryn6Q",
    },
  ],
});

export const chatChannel = peerConnection.createDataChannel("chat");
