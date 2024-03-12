import { Box } from "@mui/material";

import LiFiExchange from "../components/LiFiExchange.tsx";
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
        <LiFiExchange />
      </Card>

    </Box>
  );
};

export default Dex;
