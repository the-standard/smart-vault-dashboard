import { Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { Box } from "@mui/material";
import Collateral from "./pages/Collateral.tsx";
import CircularProgressComponent from "./components/CircularProgressComponent.tsx";
import '@walletconnect/ethereum-provider';
import {
  useRenderAppCounterStore,
} from "./store/Store.ts";
import SnackbarComponent from "./components/SnackbarComponent.tsx";
import { useBackgroundImage } from "./hooks/useBackgroundImage.ts";
import Dex from "./pages/Dex.tsx";
import Staking from "./pages/Staking.tsx";
import VaultHistory from "./pages/VaultHistory.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";
import Disclaimer from "./components/Disclaimer.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import wagmiConfig from "./WagmiConfig";

const projectId = import.meta.env.VITE_WALLETCONNECT_ID;

function App() {
  useBackgroundImage();
  const { renderAppCounter } = useRenderAppCounterStore();

  const queryClient = new QueryClient()

  createWeb3Modal({
    // @ts-expect-error
    wagmiConfig,
    projectId,
  });

  return (
    <Box
      sx={{
        overflowX: {
          xs: "auto",
          md: "hidden",
        },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CircularProgressComponent />
      <SnackbarComponent />
      <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Disclaimer />
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: {
              xs: "0% 4%",
              sm: "0% 6%",
              md: "0% 12%",
            },
          }}>
            <Routes key={renderAppCounter}>
              <Route path="/" element={<HomePage />} />
              <Route path="termsofuse" element={<TermsOfUse />} />
              <Route path="dex/*" element={<Dex />} />
              <Route path="liquidation-pools/*" element={<Staking />} />
              <Route path="staking/*" element={<Staking />} />
              <Route path="yield/*" element={<Staking />} />
              <Route path="collateral/:vaultId" element={<Collateral />} />
              <Route path="collateral/:vaultId/history" element={<VaultHistory />} />
            </Routes>
          </Box>
          <Footer />
        </QueryClientProvider>
      </WagmiProvider>
    </Box>
  );
}

export default App;
