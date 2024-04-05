import axios from "axios";

const graphURL = "https://api.studio.thegraph.com/query/52646/domegle/v0.0.1";

export const checkStake = (address: string) => `query stackStatus {
  accessGranteds(where: {user: "${address}"}, first: 1) {
    user
    accessGranted
    blockNumber
  }
}`;

export const runQuery = async (queryBlock: string) => {
  try {
    const response = await axios.post(graphURL, {
      query: queryBlock,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
