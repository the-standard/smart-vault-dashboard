import { Box, Typography } from "@mui/material";
import coins from "../../assets/coins.png";
import { useNavigate } from "react-router-dom";

const LiquidityPool = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/yield");
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            marginRight: "20px",
            fontFamily: "Poppins",
          }}
        >
          Easy Yield Farming
        </Typography>
        <Box
          sx={{
            width: "auto",
            height: "100px",
          }}
        >
          <img
            style={{
              width: "230px",
              height: "100%",
            }}
            src={coins}
            alt=""
          />
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#fff",
            fontFamily: "Poppins",
            fontSize: "1rem",
            marginBottom: "10px",
          }}
          variant="h6"
        >
          EUROs liquidity pool
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#fff", marginBottom: "10px" }}
        >
          Add your EUROs together with USDC as liquidity on Camelot DEX to earn
          10% APR rewarded in GRAIL
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#fff", marginBottom: "10px" }}
        >
          GRAIL tokens earn you a share of all fees collected by the biggest DEX
          on Arbitrum!
        </Typography>{" "}
        <Box onClick={handleClick}>
          <Typography
            variant="body1"
            sx={{ color: "#fff", marginBottom: "10px", cursor: "pointer" }}
          >
            Let's go
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LiquidityPool;
