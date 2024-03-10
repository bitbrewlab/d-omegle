export const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:174.138.123.102:3478",
    },
    {
      urls: "turn:174.138.123.102:3478",
      username: "domegleturn",
      credential: "cytbow-zimnij-Werju2",
    },
  ],
});

export const chatChannel = peerConnection.createDataChannel("chat");
