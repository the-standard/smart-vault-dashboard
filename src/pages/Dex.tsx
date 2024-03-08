import Exchange from "../components/Exchange.tsx";
import { arbitrum } from "wagmi/chains";
import { Box } from "@mui/material";

import Card from "../components/Card";

const Dex = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1440px",
        margin: {
          xs: "0% 4%",
          sm: "3% 6%",
          md: "3% 12%",
        },
        height: "100%",
      }}
    >
      <Card
        sx={{
          padding: "5%",
          minHeight: "300px",
          height: "100%",
        }}
      >
        <Exchange
          toChain={arbitrum.id}
          fromChain={arbitrum.id}
          fromToken="0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
          toToken="0x643b34980e635719c15a2d4ce69571a258f940e9"
        />
      </Card>
    </Box>
  );
};

export default Dex;
