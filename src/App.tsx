import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import {
  arbitrum,
  arbitrumGoerli,
  goerli,
  mainnet,
  polygonMumbai,
} from "wagmi/chains";

const chains = [
  mainnet,
  goerli,
  sepolia,
  polygonMumbai,
  arbitrumGoerli,
  arbitrum,
];
//move this to .env if you want
const projectId = "67027f91c1db8751c6ea2ed13b9cdc55";
//chain id state
import { useChainIdStore } from "./store/Store.ts";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
import HomePage from "./pages/HomePage.tsx";
//import navbar
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import History from "./pages/History.tsx";
import Collateral from "./pages/Collateral.tsx";
import CircularProgressComponent from "./components/CircularProgressComponent.tsx";
import { useCircularProgressStore } from "./store/Store.ts";
import SnackbarComponent from "./components/SnackbarComponent.tsx";

// import { arbitrumGoerli } from "viem/chains";
import { fromHex } from "viem";
import { useEffect, useState } from "react";

// const walletClient = createWalletClient({
//   transport: custom(window.ethereum),
// });

function App() {
  const { circularProgress } = useCircularProgressStore();
  console.log(circularProgress);
  const { chainId, setChainId } = useChainIdStore();

  // const [localChainId, setLocalChainId] = useState<any>();
  console.log(chainId);

  useEffect(() => {
    if (window.ethereum) {
      const handleChainChanged = (newChainId: any) => {
        // setLocalChainId(fromHex(newChainId, "number"));
        setChainId(fromHex(newChainId, "number"));
      };

      window.ethereum.on("chainChanged", handleChainChanged);

      // Cleanup function to remove the event listener when the component is unmounted
      return () => {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  const fetchDataBasedOnChainId = async () => {
    // fetch data or perform actions based on the current chainId
  };

  useEffect(() => {
    if (chainId) {
      fetchDataBasedOnChainId();
    }
  }, [chainId]);

  return (
    <Box
      sx={{
        overflowX: {
          xs: "scroll",
          md: "hidden",
        },
      }}
    >
      <CircularProgressComponent />

      <SnackbarComponent />

      <WagmiConfig config={wagmiConfig}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="history" element={<History />} />
          <Route path="collateral" element={<Collateral />} />
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
      />
    </Box>
  );
}

export default App;
