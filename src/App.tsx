import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";

const chains = [mainnet, goerli, sepolia, polygonMumbai];
const projectId = "67027f91c1db8751c6ea2ed13b9cdc55";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
import HomePage from "./pages/HomePage.tsx";
//import navbar
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Collateral from "./pages/Collateral.tsx";
import CircularProgressComponent from "./components/CircularProgressComponent.tsx";
import { useCircularProgressStore, useChainIdStore } from "./store/Store.ts";
import SnackbarComponent from "./components/SnackbarComponent.tsx";
import { useBackgroundImage } from "./hooks/useBackgroundImage.ts";
import { useEffect } from "react";
import { fromHex } from "viem";
import Stats from "./pages/Stats.tsx";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const { circularProgress } = useCircularProgressStore();
  const { getChainId } = useChainIdStore();
  useBackgroundImage();
  console.log(circularProgress);

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

  const myFunction = async () => {
    // This returns the provider, or null if it wasn't detected.
    const provider = await detectEthereumProvider();

    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      startApp(provider); // initialize your app
    } else {
      console.log("Please install MetaMask!");
    }

    function startApp(provider) {
      // If the provider returned by detectEthereumProvider isn't the same as
      // window.ethereum, something is overwriting it – perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }
      // Access the decentralized web!
    }
  };

  useEffect(() => {
    myFunction();
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
      <CircularProgressComponent />

      <SnackbarComponent />

      <WagmiConfig config={wagmiConfig}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="collateral/:vaultId" element={<Collateral />} />
          <Route path="stats" element={<Stats />} />
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
