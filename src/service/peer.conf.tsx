import { myPeerConnection } from "./turn.server";

export const peerConnection = new RTCPeerConnection({
  iceServers: myPeerConnection,
});
