import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
export default function CoustomAvatar({ address }: { address: string }) {
  return <Jazzicon diameter={40} seed={jsNumberForAddress(address)} />;
}
