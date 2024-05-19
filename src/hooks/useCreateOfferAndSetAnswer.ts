/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import socket from "./useSocket";
import Peer, { peer } from "../utils/interface";

export default function useCreateOfferAndSetAnswer({
  peerConnection,
}: {
  peerConnection: RTCPeerConnection;
}) {
  const createNewOffer = async (socketResponseData: Peer) => {
    if (peerConnection.signalingState === "stable") {
      const newOffer = await peerConnection.createOffer({
        iceRestart: true,
      });
      peerConnection.setLocalDescription(newOffer);

      peerConnection.onicecandidate = (e) => {
        socket.emit("exchangeCandidates", {
          remoteSocketId: socketResponseData.answererId,
          candidate: e.candidate,
        });
      };

      socket.emit("sendOffer", {
        peers: peer(
          socketResponseData.offererId,
          socketResponseData.answererId
        ),
        offer: newOffer,
      });
    }
  };

  const setSessionAnswer = async (socketResponseData: {
    peers: Peer;
    answer: RTCSessionDescriptionInit;
  }) => {
    console.log(socketResponseData);
    if (peerConnection.signalingState === "have-local-offer") {
      await peerConnection.setRemoteDescription(socketResponseData.answer);
    }

    console.log("Offerer");
    console.log("local description : ", peerConnection.localDescription);
    console.log("remote description : ", peerConnection.remoteDescription);
  };

  useEffect(() => {
    socket.on("createOffer", (data) => createNewOffer(data));
    socket.on("reciveAnswer", (data) => setSessionAnswer(data));
  }, []);
}
