import { Box, Typography } from "@mui/material";
// import { Web3Button } from "@web3modal/react";
import Card from "./Card";

const LoginCard = () => {
  return (
    <>
      <Card
        sx={{
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontFamily: "Poppins",
          }}
        >
          0% Interest DeFi Loans
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontFamily: "Poppins",
            marginTop: "1em",
            opacity: "0.8"
          }}
        >
          Borrow without giving your collateral to a third party,
          <br/>
          No KYC, No Trust Needed.
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontFamily: "Poppins",
            marginTop: "1em",
            opacity: "0.8"
          }}
        >
          Connect your web3 wallet below to get started.
        </Typography>
        <Box
          sx={{
            marginTop: "1em",
          }}
        >
          <w3m-button />
        </Box>
      </Card>
    </>
  );
};

export default LoginCard;
