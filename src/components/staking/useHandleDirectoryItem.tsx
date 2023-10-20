import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import {
  useStakingAbiStore,
} from "../../store/Store.ts";

async function useHandleDirectoryItem(address: any) {
  const { stakingAbi } = useStakingAbiStore();
  const [ directoryItem, setDirectoryItem ] = useState<any>(null);

  const StakingObject = {
    address: address,
    active: true,
    windowStart: '0',
    windowEnd: '0',
    maturity: '0',
    SI_RATE: '0',
    tstEurosPrice: '0',
};
  const active = await useContractRead({
    address: address,
    abi: stakingAbi,
    functionName: "active",
  });

  console.log(909090, active)

  // StakingObject.active = active;

  // return directoryItem;
}

export default useHandleDirectoryItem;
