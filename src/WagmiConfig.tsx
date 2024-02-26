import { createConfig, http } from "wagmi";
import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  optimism,
  polygon,
  bsc,
  zkSync,
  polygonZkEvm,
  base,
  avalanche,
  gnosis
} from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = import.meta.env.VITE_WALLETCONNECT_ID;

export const wagmiConfig = createConfig({
  chains: [
    arbitrum,
    arbitrumSepolia,
    mainnet,
    optimism,
    polygon,
    bsc,
    zkSync,
    polygonZkEvm,
    base,
    avalanche,
    gnosis,
  ],
  transports: {
    [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
    [arbitrumSepolia.id]: http(`https://arb-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_SEPOLIA_API_KEY}`),
    [mainnet.id]: http(`https://mainnet.infura.io/v3/`),
    [optimism.id]: http(`https://mainnet.optimism.io`),
    [polygon.id]: http(`https://polygon-rpc.com/`),
    [bsc.id]: http(`https://bsc-dataseed.binance.org/`),
    [zkSync.id]: http(`https://mainnet.era.zksync.io`),
    [polygonZkEvm.id]: http(`https://zkevm-rpc.com`),
    [base.id]: http(`https://mainnet.base.org`),
    [avalanche.id]: http(`https://api.avax.network/ext/bc/C/rpc`),
    [gnosis.id]: http(`https://rpc.gnosischain.com`),

  },
  connectors: [ walletConnect({projectId}) ],
});

export default wagmiConfig;
