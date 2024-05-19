/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import socket from "./useSocket";
import Peer from "../utils/interface";

export default function useSetOfferAndCreateAnswer({
  peerConnection,
}: {
  peerConnection: RTCPeerConnection;
}) {
  const createNewAnswer = async (socketResponseData: {
    peers: Peer;
    offer: RTCSessionDescriptionInit;
  }) => {
    if (peerConnection.signalingState === "stable") {
      await peerConnection.setRemoteDescription(socketResponseData.offer);
      const newAnswer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(newAnswer);

      peerConnection.onicecandidate = (e) => {
        socket.emit("exchangeCandidates", {
          remoteSocketId: socketResponseData.peers.offererId,
          candidate: e.candidate,
        });
      };

      socket.emit("sendAnswer", {
        peers: socketResponseData.peers,
        answer: newAnswer,
      });
    }

    console.log("Answerer");
    console.log("local description : ", peerConnection.localDescription);
    console.log("remote description : ", peerConnection.remoteDescription);

    // peerConnection.onicecandidate = (event) => {
    //   if (event.candidate) {
    //     console.log(`candidates : `, event.candidate);
    //   }
    // };
  };

  useEffect(() => {
    socket.on("IceCandidateRecived", (data) => console.log(data));
    socket.on("createAnswer", (data) => createNewAnswer(data));
  }, []);

  return;
}

// peerConnection.onicecandidate = (event) => {
//   console.log("Sending Ice candidates to offerer...");
//   if (event.candidate) {
//     console.log("start generating ice candidate from answerer side...");

//     socket.emit("exchangeCandidates", {
//       remoteSocketId: socketResponseData.peers.offererId,
//       candidate: event.candidate,
//     });
//   }
// };
