/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export default function useRemoteMedia({
  peerConnection,
}: {
  peerConnection: RTCPeerConnection;
}) {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  let remoteStream: MediaStream;

  useEffect(() => {
    remoteStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteStream;

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().map((track) => remoteStream.addTrack(track));
    };

    return () => remoteStream.getTracks().forEach((track) => track.stop());
  }, []);

  return remoteVideoRef;
}
