/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import VideoStream from "../components/video/VideoStream";
import { useSelector } from "react-redux";
import { RootState } from "../state-managment/store";
import usePeerConnection from "../utils/iceServers";
import socket from "../hooks/useSocket";
import useCreateOfferAndSetAnswer from "../hooks/useCreateOfferAndSetAnswer";
import useSetOfferAndCreateAnswer from "../hooks/useSetOfferAndCreateAnswer";

/**
 * Entry point for the Stream screen
 *  - setup our socket here
 *  - all logics place here
 *  - all data pass using props (not use redux here)
 */

function StreamScreen() {
  const detectKeyDownEvent = (e: { code: string }) => {
    if (e.code === "Escape") {
      console.log("restart session here");
    }
  };

  const peerConnection = usePeerConnection();
  const userState = useSelector((state: RootState) => state.auth);

  useCreateOfferAndSetAnswer({ peerConnection });
  useSetOfferAndCreateAnswer({ peerConnection });

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDownEvent, true);
    socket.connect();

    console.log(socket.id);

    socket.emit("adminUser", {
      address: userState.walletAddress,
    });

    socket.on("IceCandidateRecived", (candidate) =>
      peerConnection.addIceCandidate(candidate)
    );

    return () => {
      peerConnection.close();
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen px-10 bg-[#f2f2f2]">
      <VideoStream peerConnection={peerConnection} />

      {userState.enableSessionTime && (
        <div className="flex flex-col justify-center items-center mt-5">
          <p className="text-gray-400 text-sm">Make your move in :</p>
          <h3 className="text-xl font-extrabold">00:00:00</h3>
        </div>
      )}
    </div>
  );
}

export default StreamScreen;
