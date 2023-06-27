import { createWalletClient, custom } from "viem";

const createClientUtil = createWalletClient({
  transport: custom(window.ethereum),
});

export default createClientUtil;
