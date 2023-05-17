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

function App() {
  return (
    <Box
      sx={{
        overflowX: {
          xs: "scroll",
          md: "hidden",
        },
      }}
    >
      <WagmiConfig config={wagmiConfig}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="history" element={<History />} />
          <Route path="collateral" element={<Collateral />} />
        </Routes>
        <Footer />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Box>
  );
}

export default App;
