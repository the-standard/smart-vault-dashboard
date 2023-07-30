import { Box, Typography } from "@mui/material";
import statsbg from "../assets/statsbg.png";

const Stats = () => {
  return (
    <Box
      sx={{
        color: "#8E9BAE",
        margin: { xs: "0", sm: "3% 12%" },
        padding: "1%",
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
      <Box
        sx={{
          backgroundImage: `url(${statsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          mixBlendMode: "screen",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Statistics and Epic data dashboard</Typography>
        <Typography variant="h1">COMING SOON!</Typography>
      </Box>
    </Box>
  );
};

export default Stats;
