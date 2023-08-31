import { Box } from "@mui/material";
import Exchange from "./Exchange";
import { arbitrum } from "wagmi/chains";

import Card from "../components/Card";

const Dex = () => {
  return (
    <Card
      sx={{
        margin: { xs: "3% 3%", sm: "3% 12%" },
        padding: "5%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Exchange toChain={arbitrum.id} toToken='0xf5A27E55C748bCDdBfeA5477CB9Ae924f0f7fd2e' />
    </Card>
  );
};

export default Dex;
