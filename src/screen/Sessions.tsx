import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { iceSercer } from "../service/peer.config";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faDice,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/navbar";

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
      console.log("Timer Stoped");
      clearTimeout(Timer);
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
    await localStream.getTracks().forEach((track) => track.stop());
    await localStream.getTracks().forEach((track) => (track.enabled = false));

    await remoteStream.getTracks().forEach((track) => track.stop());
    await remoteStream.getTracks().forEach((track) => (track.enabled = false));
    peerConnection.current?.close();
    socket.disconnect();

    navigation("/");
  };

  return (
    // <div>
    //   <Navbar />
    //   <div className="flex flex-col md:flex-row gap-5 justify-center items-center my-10">
    //     <div className="shadow-lg rounded-2xl saturate-150 w-max">
    //       <video
    //         ref={localVideoRef}
    //         autoPlay
    //         muted
    //         playsInline
    //         className="rounded-2xl object-cover w-96 h-72 "
    //       />
    //     </div>
    //     <div className=" shadow-lg rounded-2xl saturate-150 w-max">
    //       <video
    //         ref={remoteVideoRef}
    //         autoPlay
    //         playsInline
    //         className="w-96 h-72 object-cover rounded-2xl"
    //       />
    //     </div>
    //   </div>
    //   <div className="w-full hidden lg:flex absolute bottom-0 py-5 px-10 justify-center items-center">
    //     <p>@Developed by BitsBrewLab with ❤️</p>
    //     <button
    //       className="text-white bg-red-500 py-3 px-8 font-bold rounded-lg absolute right-10 bottom-5"
    //       onClick={exitToPlatform}
    //     >
    //       Disconnect
    //     </button>
    //   </div>
    // </div>
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
            className="rounded-2xl object-cover w-1/4 h-1/6 md:w-96 md:h-96 absolute bottom-5 right-5 md:sticky shadow-lg"
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

      <div className="z-10 absolute bottom-5 ml-5 md:right-5 bg-white py-3 px-8 flex gap-7 rounded-full text-xl shadow-lg border-2 border-black border-spacing-20">
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

    // <div className="h-svh relative ">
    //   <div className="hidden md:block">
    //     <Navbar />
    //   </div>
    //   <div className="md:w-screen md:flex md:justify-center md:gap-5 md:mt-12 md:px-12">
    //     <video
    //       ref={localVideoRef}
    //       autoPlay
    //       muted
    //       playsInline
    //       className="rounded-2xl object-cover absolute w-1/4 h-1/6 bottom-5 right-5 z-10 shadow-lg saturate-150 md:static md:max-w-80 md:max-h-96"
    //     />

    //     <div className="md:max-w-80 md:max-h-96 md:rounded-2xl shadow-lg">
    //       <video
    //         ref={remoteVideoRef}
    //         autoPlay
    //         playsInline
    //         className="w-full h-dvh object-cover saturate-150 md:static md:max-w-80 md:max-h-96 md:rounded-2xl shadow-lg"
    //       />
    //     </div>
    //   </div>

    //   <div className="absolute bottom-5 left-5 flex justify-center items-center gap-5 md:w-screen">
    //     <button onClick={exitToPlatform}>
    //       <div className="bg-red-500 text-white text-xl p-3 rounded-lg w-14 h-14 flex justify-center items-center shadow-lg">
    //         <FontAwesomeIcon icon={faArrowRightFromBracket} />
    //       </div>
    //     </button>

    //     <button onClick={onSessionEnd}>
    //       <div className="bg-white text-black text-xl p-3 rounded-lg w-14 h-14 flex justify-center items-center shadow-lg">
    //         <FontAwesomeIcon icon={faDice} />
    //       </div>
    //     </button>
    //   </div>
    // </div>
  );
}
