import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

const createClientUtil = createWalletClient({
  //need to make this dynamic also
  chain: sepolia,
  transport: custom(window.ethereum),
});

export default createClientUtil;
