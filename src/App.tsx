import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, sepolia, polygonMumbai } from "wagmi/chains";
import HomePage from "./pages/HomePage.tsx";
//import navbar
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { Box } from "@mui/material";

const chains = [mainnet, polygon, sepolia, polygonMumbai];
const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

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
      <WagmiConfig client={wagmiClient}>
        <Navbar />
        <HomePage />
        <Footer />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Box>
  );
}

export default App;
