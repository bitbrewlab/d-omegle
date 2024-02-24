# d-omegle

Welcome to our groundbreaking project, aiming to revolutionize online communication. Inspired by Omegle and using webRTC technology, our decentralized platform integrates blockchain principles for security and real-time video chatting. The objective is to establish a secure, private, and anonymous online environment, addressing privacy concerns. Beyond that, we envision decentralized social platforms empowering users, potentially transforming how digital societies connect and collaborate. Join us on this journey towards a more user-friendly digital landscape.

### Application flow

- [x] Someone must getUserMedia () - `CLIENT1`/Caller/Offerer
- [x] `CLIENT1` creates RTCPeerConnection
- [x] peerConnection needs STUN servers
  - we will need ICE candidates later
- [x] `CLIENT1` add local stream tracks to peerConnection
  - we need to associate `CLIENT1` feed with peerConnect
- [x] `CLIENT1` creates an offer
  - needed peerConnection with tracks
  - offer = RTSessionDescription
    1. SDP - codec
    2. Type (offer)
- [x] `CLIENT1` hands offer to pc.setLocalDescription()
- [ ] ICE candidates now start comming in (ASYNC)

Signaling Server (Socket)

- [x] `CLIENT1` emits offer
  - socket.io server holds it for other browser
  - associate with `CLIENT1`
- [ ] emit ICE candidates upto signaling sercere
  - socket.io server holds it for other browser
  - associate with `CLIENT1`

`CLIENT1`& Signaling server wait for answerer/CLIENT2

- [x] `CLIENT2` loads up the webpage with io.connect()
  - a new client is connected to signaling server
- [x] socket.io emit out the RTSessionDesc to the new client
  - an offer to be sent!
- [ ] `CLIENT2` runs getUserMedia()
- [ ] `CLIENT2` creates a peerConnection()
  - pass STUN servers
- [ ] `CLIENT2` adds localstream tracks to peerconnection
- [ ] `CLIENT2` creates an answer (createAnswer());
  - createAnswer = RTSessionDescription (sdp/type)
- [ ] `CLIENT2` hands answer to pc.setLocalDescription (answer)
- [ ] `CLIENT2` can hands the offer to pc.setRemoteDescription()
- [ ] whene setLocalDesctiption, start collection ICE candidate

Signaling Server has been waiting...

- [ ] `CLIENT2` emit answer (RTCSessionDesc - sdp/type) up to signaling serve
- [ ] `CLIENT2` will listen for tracks/ICE from remote
  - and is done
  - waiting on ICE candidates
  - waiting on tracks
- [ ] Signaling server will send `CLIENT1` answer
- [ ] `CLIENT1` takes an answer and hand it to pc.setRemoteDescription
- [ ] `CLIENT1` will wait for ICE candidates and tracks

Once ICE candidate will exchange, tracks will exchange as well...

### Tach Stack

- **React Js** front-end application
- **Node JS** create web socket
- **Metered** get free TURN servers
- **Solidity** smart contract
- **HardHat** smart contract framework
- **Foundry** contract testing

### Tools

- **mermaid.js.org** flow diagram
- [**excali draw**](https://excalidraw.com/#json=TQQplFbnV6rHBSZlIHR1r,gFltLkfoNs3SEp6SdY5zfQ)

### Feature List

**NFTs Base User**

- able to store user contact for future connection
- user able to record stream or sessions
- direact streaming on social media platforms
- dynamic input configuration (able to connect external devices)

**Stack Base User**

- platform serve unlimited sessions, every session time is only 5 min
