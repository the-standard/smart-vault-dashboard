import {
  EthereumClient,
  w3mConnectors
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum
} from "wagmi/chains";

export const arbitrumSepolia = {
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrumSepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
    default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io/' },
    default: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io/' },
  }
} as const satisfies Chain

const projectId = "67027f91c1db8751c6ea2ed13b9cdc55";

const { chains, publicClient } = configureChains(
  [arbitrum, arbitrumSepolia],
  [alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }), publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(config, chains);

import HomePage from "./pages/HomePage.tsx";
//import navbar
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Collateral from "./pages/Collateral.tsx";
import CircularProgressComponent from "./components/CircularProgressComponent.tsx";
import {
  // useCircularProgressStore,
  useRenderAppCounterStore,
} from "./store/Store.ts";
import SnackbarComponent from "./components/SnackbarComponent.tsx";
import { useBackgroundImage } from "./hooks/useBackgroundImage.ts";
import Stats from "./pages/Stats.tsx";
import Yield from "./pages/Yield.tsx";
import Dex from "./pages/Dex.tsx";
import Staking from "./pages/Staking.tsx";
import VaultHistory from "./pages/VaultHistory.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";
import Disclaimer from "./components/Disclaimer.tsx";

import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { publicProvider } from "wagmi/providers/public";

function App() {
  // const { circularProgress } = useCircularProgressStore();
  useBackgroundImage();
  // console.log(circularProgress);
  const { renderAppCounter } = useRenderAppCounterStore();

  return (
    <Box
      sx={{
        overflowX: {
          xs: "scroll",
          md: "hidden",
        },
      }}
    >
      {/* <button onClick={handleRemountClick}>Remount</button>{" "} */}
      <CircularProgressComponent />
      <SnackbarComponent />
      <WagmiConfig config={config}>
        <Navbar />
        <Disclaimer />
        <Routes key={renderAppCounter}>
          <Route path="/" element={<HomePage />} />
          <Route path="collateral/:vaultId" element={<Collateral />} />
          <Route path="collateral/:vaultId/history" element={<VaultHistory />} />
          <Route path="stats" element={<Stats />} />
          <Route path="yield/*" element={<Yield />} />
          <Route path="dex/*" element={<Dex />} />
          <Route path="staking" element={<Staking />} />
          <Route path="termsofuse" element={<TermsOfUse />} />
        </Routes>
        <Footer />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Poppins, sans-serif",
          "--w3m-container-border-radius": "10px",
          "--w3m-text-medium-regular-size": "10px",
          // "--w3m-accent-color": "transparent",
          "--w3m-accent-color": "rgba(0,0,0,0.2)",
        }}
        // mobileWallets={[
        //   {
        //     id: "1",
        //     name: "MetaMask",
        //     links: {
        //       native: "https://metamask.app.link/dapp/standardio.vercel.app/",
        //       universal:
        //         "https://metamask.app.link/dapp/standardio.vercel.app/",
        //     },
        //   },
        // ]}
      />
    </Box>
  );
}

export default App;
