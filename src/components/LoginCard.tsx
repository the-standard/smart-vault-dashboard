import { Typography } from "@mui/material";
import Card from "./Card";

const LoginCard = () => {
  return (
    <Card
      sx={{
        padding: "1.5rem",
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
    </Card>
  );
};

export default LoginCard;
