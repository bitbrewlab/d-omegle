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
      peerConnection.restartIce();
      socket.disconnect();
      socket.connect();
      initUser();
    }
  };

  const exitToApp = () => {
    peerConnection.restartIce();
    peerConnection.close();
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

          {remoteVideoRef.current ? (
            <video
              className="w-96 h-72 shadow-lg rounded-2xl saturate-150"
              ref={remoteVideoRef}
              autoPlay
              playsInline
            />
          ) : (
            <div className="w-96 h-72 shadow-lg rounded-2xl flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 animate-spin bg-transparent fill-[#000]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 w-screen  p-5 text-center">
        <h1>@ Develop In BitsBrewLab with ❤️</h1>
      </div>

      <div className="absolute inset-y-100 right-5 bottom-5 ">
        <button
          className="text-white bg-red-500 py-3 px-8 font-bold rounded-lg "
          onClick={() => {
            exitToApp();
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
