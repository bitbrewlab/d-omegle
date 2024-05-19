const iceSever = [
  {
    urls: "stun:68.183.91.117:3478",
  },
  {
    urls: "turn:68.183.91.117:3478",
    username: "domegleturn",
    credential: "cytbow-zimnij-Werju2",
  },
  {
    urls: "turn:68.183.91.117:3478?transport=tcp",
    username: "domegleturn",
    credential: "cytbow-zimnij-Werju2",
  },
  {
    urls: "turn:numb.viagenie.ca",
    credential: "muazkh",
    username: "webrtc@live.com",
  },
  {
    urls: "turn:192.158.29.39:3478?transport=udp",
    credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    username: "28224511:1379330808",
  },
  {
    urls: "turn:192.158.29.39:3478?transport=tcp",
    credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    username: "28224511:1379330808",
  },
  {
    urls: "turn:turn.bistri.com:80",
    credential: "homeo",
    username: "homeo",
  },
  {
    urls: "turn:turn.anyfirewall.com:443?transport=tcp",
    credential: "webrtc",
    username: "webrtc",
  },
];
function usePeerConnection() {
  return new RTCPeerConnection({
    iceServers: iceSever,
  });
}

export default usePeerConnection;
