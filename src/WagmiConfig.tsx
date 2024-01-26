import { createConfig, http } from "wagmi";
import {
  arbitrum,
  arbitrumSepolia
} from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = "67027f91c1db8751c6ea2ed13b9cdc55";

export const wagmiConfig = createConfig({
  chains: [arbitrum, arbitrumSepolia],
  transports: {
    [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
    [arbitrumSepolia.id]: http(`https://arb-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_SEPOLIA_API_KEY}`)
  },
  connectors: [ walletConnect({projectId}) ],
});

export default wagmiConfig;
