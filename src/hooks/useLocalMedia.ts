/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export default function useLocalMedia({
  peerConnection,
}: {
  peerConnection: RTCPeerConnection;
}) {
  const constrations = {
    video: true,
    audio: true,
  };

  let localStream: MediaStream;
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const startLocalStream = async () => {
    localStream = await navigator.mediaDevices.getUserMedia(constrations);
    localVideoRef.current!.srcObject = localStream;

    localStream
      .getTracks()
      .map((track) => peerConnection.addTrack(track, localStream));
  };

  useEffect(() => {
    startLocalStream();

    return () => localStream.getTracks().forEach((track) => track.stop());
  }, []);

  return localVideoRef;
}
