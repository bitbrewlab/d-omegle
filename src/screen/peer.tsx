import { useEffect, useRef } from "react";
import { peerConnection } from "../service/peer.conf";
import Navbar from "../component/navbar";

import { useAccount, useDisconnect } from "wagmi";

import { io } from "socket.io-client";

const socket = io("ws://localhost:8080/");

export default function Peer() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  let localStream: MediaStream;

  const { disconnect } = useDisconnect();
  const account = useAccount();

  const constraints = {
    video: true,
    audio: false,
  };

  useEffect(() => {
    document.title = `${account.address}`;
    createOffer();

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
  }, []);

  const createOffer = async () => {
    localStream = await getUserMedia(constraints);
    localVideoRef.current!.srcObject = localStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    const remoteMediaStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteMediaStream;

    // Understand track concept in webrtc
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteMediaStream.addTrack(track);
      });
    };

    // ICE candidate
    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        socket.emit("candidate", event.candidate);
      }
    };

    // offer creation & set as local description
    peerConnection
      .createOffer()
      .then((offer) => {
        peerConnection.setLocalDescription(offer);
        socket.emit("sdp", offer);
      })
      .catch((err) => console.log("error ", err));
  };

  const createAnswer = async () => {};

  return (
    <div className="relative h-screen">
      <div className="absolute inset-x-0 top-0">
        <Navbar />
      </div>
      <div className="absolute inset-0">
        <div className="flex items-center justify-center gap-4 h-full">
          <video
            className="w-96 h-72 shadow-lg rounded-2xl saturate-150"
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
          />
          <video
            className="w-96 h-72 shadow-lg rounded-2xl saturate-150"
            ref={remoteVideoRef}
            autoPlay
            playsInline
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 w-screen text-slate-400 p-5 text-center">
        <h1>@ Develop In BitsBrewLab with ❤️</h1>
      </div>

      <div className="absolute inset-y-100 right-5 bottom-5 ">
        <button
          className="text-white bg-red-500 py-3 px-8 font-bold rounded-lg "
          onClick={async () => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

async function getUserMedia(constraints: { video: boolean; audio: boolean }) {
  return await navigator.mediaDevices.getUserMedia(constraints);
}
