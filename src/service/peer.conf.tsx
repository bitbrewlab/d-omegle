import { myPeerConnection } from "./turn.server";

export const getMedia = async (constraints: {
  video: boolean;
  audio: boolean;
}) => {
  return await navigator.mediaDevices.getUserMedia(constraints);
};

export const peerConnection = new RTCPeerConnection({
  iceServers: myPeerConnection,
});

// export const iceCandidates = (_peerAddress, _sessionId) =>
//   peerConnection.addEventListener("icecandidate", (event) => {
//     if (event.candidate) {
//       return event.candidate;
//     }
//   });
