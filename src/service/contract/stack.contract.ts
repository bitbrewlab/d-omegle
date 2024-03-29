import { useReadStakingGetUserStakedAmount } from "../../generated";

export const stackReview = (accountAddress: string) => {
  const data = useReadStakingGetUserStakedAmount({
    args: [`0x${accountAddress}` || "0x0"],
  });

  console.log(data);
};
