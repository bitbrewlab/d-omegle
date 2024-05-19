const generateIceCandidates = async (
  peerConnection: RTCPeerConnection,
  remoteSocketId: string
) => {
  peerConnection.onicecandidate = (event) => {
    console.log(event.candidate, ` send to ${remoteSocketId}`);
  };
};

export default generateIceCandidates;
