import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { peerConnection } from "../service/peer.conf";

export default function Peer2() {
  const socket = io("http://localhost:1629");

  const constraints = {
    video: true,
    audio: false,
  };

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  let localStream: MediaStream;
  let remoteStream: MediaStream;

  let sessionObject = useRef<any>(null);

  useEffect(() => {
    socket.on("connected", (socket) => onConnected(socket));

    socket.on("createOffer", (data) => onOffer(data));
    socket.on("createAnswer", (data) => onAnswer(data));
    socket.on("reciveAnswer", (data) => onAnswerRecive(data));
    socket.on("IceCandidateRecived", (data) => {
      console.log("candidate recived from server");
      peerConnection.addIceCandidate(data.candidate);
    });
    socket.on("sessionEnded", onSessionEnd);
  }, []);

  const onConnected = async (_socket: { localUserSocketID: string }) => {
    sessionObject.current = _socket;
    console.log(_socket);

    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current!.srcObject = localStream;

    remoteStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteStream;

    localStream.getTracks().map((track) => peerConnection.addTrack(track));

    socket.emit("adminUser", {
      socketId: sessionObject.current.localUserSocketID,
      address: "0x0",
    });
  };

  const onOffer = async (data: any) => {
    const offer = await peerConnection.createOffer({ iceRestart: true });
    peerConnection.setLocalDescription(offer);

    sessionObject.current.remoteUserSocketID = data.answererID;

    socket.emit("sendOffer", {
      peers: data,
      offer: offer,
    });

    console.log("offer sant to server");
    generateCandidates(data.answererID);
  };

  const onAnswer = async (data: any) => {
    peerConnection.setRemoteDescription(data.offer);
    console.log("offer recived from server");

    const answer = await peerConnection.createAnswer();

    sessionObject.current.remoteUserSocketID = data.peers.offererID;
    generateCandidates(data.peers.offererID);

    socket.emit("sendAnswer", {
      answer: answer,
      peers: data.peers,
    });

    console.log("answer sent to server");
  };

  const onAnswerRecive = async (data: any) => {
    await peerConnection.setRemoteDescription(data.answer);
    console.log("answer recived from server");
    console.log(sessionObject.current);
    // generateCandidates(data.peers.offererID);
  };

  const generateCandidates = (_peerSocketId: string) => {
    console.log("candidate sant to server", _peerSocketId);
    peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        socket.emit("exchangeCandidates", {
          remoteSocketId: _peerSocketId,
          candidate: event.candidate,
        });
      }
    });
  };

  const onSessionEnd = () => {};

  return (
    <div>
      <div className="flex gap-5">
        <div className="shadow-lg rounded-2xl saturate-150">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="rounded-2xl object-cover w-96 h-72"
          />
        </div>
        <div className=" shadow-lg rounded-2xl saturate-150">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-96 h-72 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
