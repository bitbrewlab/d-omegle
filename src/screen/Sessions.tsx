import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { io } from "socket.io-client";
import { iceSercer } from "../service/peer.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faDice,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/navbar";
import { useDisconnect } from "wagmi";

import Logo from "../assets/eng_logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Peer2() {
  // ___For Production___
  const socket = io("https://socket.0xdomegle.com");

  // ___For Local Development___
  // const socket = io("http://localhost:1629");

  const account = useAccount();
  const userState = useSelector((state: RootState) => {
    return state.domegleData; // Add 'return' statement to return the state
  });

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

  const { disconnect } = useDisconnect();

  const detectKeyDownEvent = (e: any) => {
    if (e.code === "Escape") {
      socket.emit("changeSession", sessionObject.current);
      onSessionEnd();
    }
  };

  const startTimer = async () => {
    Timer = setTimeout(onSessionEnd, 120000);
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDownEvent, true);

    // socket connection & disconnection
    socket.on("connected", (socket) => onConnected(socket));
    socket.on("activeUser", () =>
      socket.emit("changeSession", sessionObject.current as any)
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
      console.log("Timer Stoped");
      clearTimeout(Timer);
    };
  }, [peerConnection.current?.signalingState]);

  const onConnected = async (_socket: { localUserSocketID: string }) => {
    console.log("socket connected");
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
    console.log("Timer Stoped");
    clearTimeout(Timer);
    peerConnection.current?.close();
    socket.disconnect();
    socket.connect();
  };

  const exitToPlatform = async () => {
    socket.emit("changeSession", sessionObject.current);
    console.log("Timer Stoped");
    clearTimeout(Timer);

    if (localStream) {
      await localStream.getTracks().forEach((track) => track.stop());
      await localStream.getTracks().forEach((track) => (track.enabled = false));
    }

    if (remoteStream) {
      await remoteStream.getTracks().forEach((track) => track.stop());
      await remoteStream
        .getTracks()
        .forEach((track) => (track.enabled = false));
    }
    peerConnection.current?.close();
    socket.disconnect();

    await disconnect();
  };

  return (
    <div className="max-h-dvh">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="saturate-150 flex flex-col md:flex-row md:mt-14 gap-5">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="rounded-2xl object-cover w-1/4 h-1/6 md:w-96 md:h-96 absolute bottom-10 right-5 md:sticky shadow-lg"
          />
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="md:rounded-2xl object-cover h-dvh md:w-96 md:h-96 shadow-lg"
          />
        </div>
      </div>

      <div className="absolute bottom-5 w-screen md:flex md:flex-col justify-center items-center hidden ">
        <p className="text-sm text-gray-400">
          <span className="font-bold">More Tip:</span> Make your move in 2 mins
        </p>
        <p>@Developed by BitsBrewLab with ❤️</p>
      </div>

      <div className="absolute top-5 w-screen flex justify-center items-center md:hidden">
        <img src={Logo} alt="0xdomegle.com" className="w-1/2" />
      </div>

      <div className="z-10 absolute bottom-5 ml-5 md:right-5 bg-white  py-3 px-8 flex gap-7 rounded-full text-xl shadow-lg border-2 border-black border-spacing-20">
        <button>
          <FontAwesomeIcon icon={faMessage} />
        </button>
        <button onClick={onSessionEnd}>
          <FontAwesomeIcon icon={faDice} />
        </button>
        <button onClick={exitToPlatform}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="text-red-500"
          />
        </button>
      </div>
    </div>
  );
}
