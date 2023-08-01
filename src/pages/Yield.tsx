import { Box, Typography } from "@mui/material";
import yields from "../assets/yields.png";

const Yield = () => {
  return (
    <Box
      sx={{
        color: "#8E9BAE",
        margin: { xs: "0", sm: "3% 12%" },
        padding: "5%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Typography variant="h4" sx={{ color: "#fff" }}>
        Earn up to 15% APR yield
      </Typography>
      <img src={yields} alt="yields" width="auto" height="130px" />
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#fff",
        }}
        variant="h6"
      >
        Made up of 10% in GRAIL and 5% TST
      </Typography>
      <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
        GRAIL is the token that earns a share of all fees collected on Camelot
        DEX, the largest exchange on Arbitrum. Somedays volume exceeds volume on
        the Ethereum base layer, this is an opportunity not to be missed. TST is
        the TheStandard Token that earns a share of all the fees paid when
        people take out and pay back loans on The Standard Protocol.
      </Typography>
      <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
        <span
          style={{
            borderBottom: "1px solid #fff",
            color: "#fff",
          }}
        >
          Simply head over to Camelot {""}
        </span>
        and place EUROs and USDC into the official liquidity pool.
      </Typography>{" "}
      <Typography variant="h6" sx={{ color: "#fff" }}>
        Then take your LP tokens and place them into Camelot NITRO where you can
        earn an extra 5% TST. BUG BOUNTY. CREATE A TUTORIAL VIDEO AND EARN 500
        euro worth of TST. Eventually, we will integrate it into this page to
        make it even easier.
      </Typography>{" "}
      <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
        BUG BOUNTY.
      </Typography>{" "}
      <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
        CREATE A TUTORIAL VIDEO AND EARN 500 euro worth of TST.
      </Typography>{" "}
      <Typography variant="h6" sx={{ color: "#fff" }}>
        Eventually, we will integrate it into this page to make it even easier.
      </Typography>
    </Box>
  );
};

export default Yield;
