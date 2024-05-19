interface Peer {
  offererId: string;
  answererId: string;
}

export const peer = (_offererId: string, _answererId: string): Peer => {
  return {
    offererId: _offererId,
    answererId: _answererId,
  };
};

export default Peer;
