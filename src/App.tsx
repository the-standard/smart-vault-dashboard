import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import {
  goerli,
  mainnet,
  polygonMumbai,
  arbitrum,
  arbitrumGoerli,
} from "wagmi/chains";

const chains = [
  mainnet,
  goerli,
  sepolia,
  polygonMumbai,
  arbitrum,
  arbitrumGoerli,
];
const projectId = "67027f91c1db8751c6ea2ed13b9cdc55";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
console.log(ethereumClient);
import HomePage from "./pages/HomePage.tsx";
//import navbar
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Collateral from "./pages/Collateral.tsx";
import CircularProgressComponent from "./components/CircularProgressComponent.tsx";
import {
  useCircularProgressStore,
  useChainIdStore,
  useRenderAppCounterStore,
} from "./store/Store.ts";
import SnackbarComponent from "./components/SnackbarComponent.tsx";
import { useBackgroundImage } from "./hooks/useBackgroundImage.ts";
import { useEffect } from "react";
import { fromHex } from "viem";
import Stats from "./pages/Stats.tsx";
import Yield from "./pages/Yield.tsx";
import Dex from "./pages/Dex.tsx";

function App() {
  const { circularProgress } = useCircularProgressStore();
  const { getChainId } = useChainIdStore();
  useBackgroundImage();
  console.log(circularProgress);
  const { renderAppCounter } = useRenderAppCounterStore();

  useEffect(() => {
    const fetchChainId = async () => {
      if (window.ethereum) {
        const idFromHex = fromHex(window.ethereum.chainId, "number");
        getChainId(idFromHex);
      }
    };

    fetchChainId();

    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId: any) => {
        const idFromHex = fromHex(chainId, "number");
        getChainId(idFromHex);
      });
    }
  }, []);

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
      <WagmiConfig config={wagmiConfig}>
        <Navbar />
        <Routes key={renderAppCounter}>
          <Route path="/" element={<HomePage />} />
          <Route path="collateral/:vaultId" element={<Collateral />} />
          <Route path="stats" element={<Stats />} />
          <Route path="yield" element={<Yield />} />
          <Route path="dex" element={<Dex />} />
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
          "--w3m-accent-color": "transparent",
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
