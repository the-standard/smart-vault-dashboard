import { createWalletClient, custom } from "viem";
import { sepolia, arbitrumGoerli, mainnet } from "viem/chains";
import { useChainIdStore } from "../store/Store";

const createClientUtil = createWalletClient({
  transport: custom(window.ethereum),
});

export default createClientUtil;
