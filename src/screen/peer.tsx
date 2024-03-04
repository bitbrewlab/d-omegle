import { useEffect, useRef } from "react";
import { getMedia, peerConnection } from "../service/peer.conf";
import Navbar from "../component/navbar";
import { useAccount, useDisconnect } from "wagmi";

import { io } from "socket.io-client";

export default function Peer() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  let localStream: MediaStream;
  let remoteStream: MediaStream;

  const { disconnect } = useDisconnect();

  const account = useAccount();
  const sessionObject = useRef<any>(null);

  const socket = io("https://socket.0xdomegle.com/", {
    auth: { userName: account.address },
  });

  const constraints = {
    video: true,
    audio: true,
  };

  const detectKeyDownEvent = (e: any) => {
    if (e.code === "Escape") {
      socket.emit("sessionEnd", sessionObject.current);
      sessionEnd();
    }
  };
  useEffect(() => {
    document.title = `${account.address}`;
    document.addEventListener("keydown", detectKeyDownEvent, true);
    initUser();

    const onConnect = (socketObj: any) =>
      console.log("socket connected", socketObj);

    const onNewOffer = async (user: any) => {
      console.log(user);
      sessionObject.current = {
        sessionId: user.sessionId,
        remoteUser: user.partner.address,
        remoteSocketId: user.partner.socketId,
      };
      iceCandidate(user.partner.socketId);
      peerConnection.setRemoteDescription(user.partner.sdp);
      createAnswer(user.sessionId);
    };

    const onGetAnswer = async (user: any) => {
      iceCandidate(user.answer.socketId);
      sessionObject.current = {
        sessionId: user.sessionId,
        remoteUser: user.answer.address,
        remoteSocketId: user.answer.socketId,
      };
      peerConnection.setRemoteDescription(user.answer.sdp);
      console.log("Yeee ! gen an answer", user);
    };

    const onDisconnect = () => console.log("socket disconnected");

    socket.on("connection-success", (socket) => onConnect(socket));
    socket.on("matched", (users) => onNewOffer(users));
    socket.on("getAnswer", (user) => onGetAnswer(user));
    socket.on("getIceCandidate", (candidate) =>
      peerConnection.addIceCandidate(candidate)
    );
    socket.on("endSession", () => {
      console.log("event emit");
      sessionEnd();
    });
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connection-success", onConnect);
      socket.off("newOffers", onNewOffer);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const initUser = async () => {
    localStream = await getMedia(constraints);
    localVideoRef.current!.srcObject = localStream;

    remoteStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.addEventListener("track", (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    });
    createOffer();
  };

  const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);

    socket.emit("admitUser", {
      userAddress: account.address,
      offer: offer,
    });
  };

  const createAnswer = async (_sessionId: string) => {
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);
    socket.emit("submitAnswer", {
      sessionId: _sessionId,
      answer: answer,
    });
  };

  const iceCandidate = (_peerSocketId: any) =>
    peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        socket.emit("passCandidates", {
          peerAddress: _peerSocketId,
          candidate: event.candidate,
        });
      }
    });

  const sessionEnd = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
      socket.disconnect();
      socket.connect();
      initUser();
    }
  };

  const exitToApp = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
      socket.disconnect();
      disconnect();
    }
  };
  return (
    <div className="relative h-screen ">
      <div className="absolute inset-x-0 top-0">
        <Navbar />
      </div>

      <div className="absolute inset-0">
        <div className="flex items-center justify-center gap-4 h-full">
          <video
            className="w-96 h-72  shadow-lg  rounded-2xl saturate-150"
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
      <div className="absolute inset-x-0 bottom-0 w-screen  p-5 text-center">
        <h1>@ Develop In BitsBrewLab with ❤️</h1>
      </div>

      <div className="absolute inset-y-100 right-5 bottom-5 ">
        <button
          className="text-white bg-red-500 py-3 px-8 font-bold rounded-lg "
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
