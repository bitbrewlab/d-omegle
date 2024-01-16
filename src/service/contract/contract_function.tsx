import { useWriteContract } from "wagmi";
import metadata from "./metadata.json";

const { writeContract } = useWriteContract();

export async function sdpUpload(type: string, sdp: string) {
  writeContract({
    address: `0x${metadata.address}`,
    abi: metadata.abi,
    functionName: "sdpEmiter",
    args: [type, sdp],
  });
}
