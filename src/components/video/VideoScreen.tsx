import { LegacyRef } from "react";

function VideoScreen({
  streamRef,
  muted,
}: {
  streamRef: LegacyRef<HTMLVideoElement>;
  muted: boolean;
}) {
  return (
    <video
      ref={streamRef}
      autoPlay
      muted={muted}
      playsInline
      className="rounded-2xl object-cover w-full h-96 shadow-lg border border-black bg-white"
    />
  );
}

export default VideoScreen;
