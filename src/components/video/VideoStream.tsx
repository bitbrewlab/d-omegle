/* eslint-disable react-hooks/exhaustive-deps */
import useLocalMedia from "../../hooks/useLocalMedia";
import useRemoteMedia from "../../hooks/useRemoteMedia";
import VideoScreen from "./VideoScreen";

function VideoStream({
  peerConnection,
}: {
  peerConnection: RTCPeerConnection;
}) {
  const localVideoRef = useLocalMedia({ peerConnection });
  const remoteVideoRef = useRemoteMedia({ peerConnection });

  return (
    <div>
      {/* Video Components */}
      <div className="flex  gap-5 p-5">
        <div className="flex-1">
          <VideoScreen streamRef={remoteVideoRef} muted={false} />
        </div>
        <div className="flex-1">
          <VideoScreen streamRef={localVideoRef} muted={true} />
        </div>
      </div>
    </div>
  );
}

export default VideoStream;
