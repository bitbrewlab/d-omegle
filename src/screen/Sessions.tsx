import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { iceSercer } from "../service/peer.config";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";

export default function Peer2() {
  // ___For Production___
  const socket = io("https://socket.0xdomegle.com");

  // ___For Local Development___
  // const socket = io("http://localhost:1629");

  const constraints = {
    video: true,
    audio: true,
  };

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  let localStream: MediaStream;
  let remoteStream: MediaStream;

  let peerConnection = useRef<RTCPeerConnection>();
  let sessionObject = useRef<any>(null);

  let Timer: string | number | NodeJS.Timeout | undefined;

  const navigation = useNavigate();

  const detectKeyDownEvent = (e: any) => {
    if (e.code === "Escape") {
      socket.emit("changeSession", sessionObject.current);
      onSessionEnd();
    }
  };

  const peerConnectionStatus = async () => {
    if (peerConnection.current) {
      console.log(peerConnection.current.signalingState);
    }
  };

  const startTimer = async () => {
    Timer = setTimeout(onSessionEnd, 120000);
  };

  useEffect(() => {
    peerConnectionStatus();

    document.addEventListener("keydown", detectKeyDownEvent, true);

    // socket connection & disconnection
    socket.on("connected", (socket) => onConnected(socket));
    socket.on("activeUser", () =>
      socket.emit("changeSession", sessionObject.current)
    );

    // webRTC peer connection events
    socket.on("createOffer", (data) => onOffer(data));
    socket.on("createAnswer", (data) => onAnswer(data));
    socket.on("reciveAnswer", (data) => onAnswerRecive(data));
    socket.on("IceCandidateRecived", (data) => onCandidatesRecive(data));
    socket.on("sessionEnded", () => onSessionEnd());

    return () => {
      peerConnection.current?.close();
      socket.disconnect();
      peerConnectionStatus();
    };
  }, [peerConnection.current?.signalingState]);

  const onConnected = async (_socket: { localUserSocketID: string }) => {
    sessionObject.current = _socket;

    peerConnection.current = new RTCPeerConnection({
      iceServers: iceSercer,
    });

    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current!.srcObject = localStream;

    remoteStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteStream;

    localStream
      .getTracks()
      .map((track) => peerConnection.current?.addTrack(track, localStream));

    if (peerConnection.current) {
      peerConnection.current.ontrack = (event) => {
        event.streams[0]
          .getTracks()
          .map((track) => remoteStream.addTrack(track));
      };
    }

    socket.emit("adminUser", {
      socketId: sessionObject.current.localUserSocketID,
      address: "0x0",
    });
  };

  const onOffer = async (data: any) => {
    startTimer();

    const offer = await peerConnection.current!.createOffer({
      iceRestart: true,
    });
    peerConnection.current!.setLocalDescription(offer);

    sessionObject.current.remoteUserSocketID = data.answererID;

    socket.emit("sendOffer", {
      peers: data,
      offer: offer,
    });

    generateCandidates();
  };

  const onAnswer = async (data: any) => {
    startTimer();

    peerConnection.current?.setRemoteDescription(data.offer);

    const answer = await peerConnection.current?.createAnswer();
    peerConnection.current?.setLocalDescription(answer);

    sessionObject.current.remoteUserSocketID = data.peers.offererID;

    socket.emit("sendAnswer", {
      answer: answer,
      peers: data.peers,
    });

    generateCandidates();
  };

  const onAnswerRecive = async (data: any) => {
    await peerConnection.current?.setRemoteDescription(data.answer);
  };

  const generateCandidates = () => {
    if (peerConnection.current) {
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(event.candidate);
          socket.emit("exchangeCandidates", {
            remoteSocketId: sessionObject.current.remoteUserSocketID,
            candidate: event.candidate.toJSON(),
          });
        }
      };
    }
  };

  const onCandidatesRecive = (data: any) => {
    const candidate = new RTCIceCandidate(data);

    peerConnection.current
      ?.addIceCandidate(candidate)
      .then(() => {})
      .catch(() => {});
  };

  const onSessionEnd = () => {
    remoteStream.getTracks().forEach((track) => track.stop());
    remoteStream.getTracks().forEach((track) => (track.enabled = false));
    peerConnection.current?.close();
    socket.disconnect();
    socket.connect();
  };

  const exitToPlatform = async () => {
    socket.emit("changeSession", sessionObject.current);
    clearTimeout(Timer);
    await localStream.getTracks().forEach((track) => track.stop());
    await localStream.getTracks().forEach((track) => (track.enabled = false));

    await remoteStream.getTracks().forEach((track) => track.stop());
    await remoteStream.getTracks().forEach((track) => (track.enabled = false));
    peerConnection.current?.close();
    socket.disconnect();

    navigation("/");
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
            className="rounded-2xl object-cover w-96 h-72 "
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
