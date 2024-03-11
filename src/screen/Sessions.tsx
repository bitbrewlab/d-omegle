import { useEffect, useRef } from "react";
import { socket } from "../utils/socket_connection";
import { chatChannel, peerConnection } from "../service/peer.config";
import Navbar from "../component/navbar";

export default function Peer2() {
  const constraints = {
    video: true,
    audio: true,
  };

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  let localStream: MediaStream;
  let remoteStream: MediaStream;

  let sessionObject = useRef<any>(null);

  const detectKeyDownEvent = (e: any) => {
    if (e.code === "Escape") {
      console.log("session restart");
      socket.emit("changeSession", sessionObject.current.remoteUserSocketID);
      onSessionEnd();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDownEvent, true);

    chatChannel.onopen = () => console.log("able to communicate");
    // socket connection & disconnection
    socket.on("connected", (socket) => onConnected(socket));

    socket.on("activeUser", (data) => console.log(data));

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
    console.log("create new one");
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
        console.log(event.candidate);
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
    remoteStream.getTracks().map((tracks) => tracks.stop());
    socket.disconnect();
    socket.connect();
  };

  const exitToPlatform = () => {
    peerConnection.close();
    socket.disconnect();
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center my-10">
        <div className="shadow-lg rounded-2xl saturate-150 w-max">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="rounded-2xl object-cover w-96 h-72"
          />
        </div>
        <div className=" shadow-lg rounded-2xl saturate-150 w-max">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-96 h-72 object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="w-full hidden lg:flex absolute bottom-0 py-5 px-10 justify-center items-center">
        <p>@Developed by BitsBrewLab with ❤️</p>
        <button
          className="text-white bg-red-500 py-3 px-8 font-bold rounded-lg absolute right-10 bottom-5"
          onClick={exitToPlatform}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
