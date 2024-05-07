function createOffer({
  peerConnection,
}: {
  peerConnection: RTCPeerConnection;
}) {
  return peerConnection.createOffer();
}

export default createOffer;
