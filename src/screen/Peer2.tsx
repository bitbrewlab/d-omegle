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

  const detectKeyDownEvent = (e: any) => {
    if (e.code === "Escape") {
      console.log("session restart");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDownEvent, true);

    // socket connection & disconnection
    socket.on("connected", (socket) => onConnected(socket));

    // webRTC peer connection events
    socket.on("createOffer", (data) => onOffer(data));
    socket.on("createAnswer", (data) => onAnswer(data));
    socket.on("reciveAnswer", (data) => onAnswerRecive(data));
    socket.on("IceCandidateRecived", (data) => onCandidatesRecive(data));
    socket.on("sessionEnded", onSessionEnd);

    return () => {
      peerConnection.close();
      socket.disconnect();
    };
  }, []);

  const onConnected = async (_socket: { localUserSocketID: string }) => {
    sessionObject.current = _socket;
    console.log(_socket);

    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current!.srcObject = localStream;

    remoteStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteStream;

    localStream
      .getTracks()
      .map((track) => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().map((track) => remoteStream.addTrack(track));
    };

    socket.emit("adminUser", {
      socketId: sessionObject.current.localUserSocketID,
      address: "0x0",
    });
  };

  const onOffer = async (data: any) => {
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);

    sessionObject.current.remoteUserSocketID = data.answererID;

    socket.emit("sendOffer", {
      peers: data,
      offer: offer,
    });

    generateCandidates();
  };

  const onAnswer = async (data: any) => {
    peerConnection.setRemoteDescription(data.offer);

    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);

    sessionObject.current.remoteUserSocketID = data.peers.offererID;

    socket.emit("sendAnswer", {
      answer: answer,
      peers: data.peers,
    });

    generateCandidates();
  };

  const onAnswerRecive = async (data: any) => {
    await peerConnection.setRemoteDescription(data.answer);
  };

  const generateCandidates = () => {
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("exchangeCandidates", {
          remoteSocketId: sessionObject.current.remoteUserSocketID,
          candidate: event.candidate.toJSON(),
        });
      }
    };
  };

  const onCandidatesRecive = (data: any) => {
    const candidate = new RTCIceCandidate(data);
    peerConnection
      .addIceCandidate(candidate)
      .then(() => console.log("Successfully added ICE candidate"))
      .catch((e) => console.error("Error adding ICE candidate:", e));
  };

  const onSessionEnd = () => {
    socket.disconnect();
    socket.connect();
  };

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
            className="w-96 h-72 object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
