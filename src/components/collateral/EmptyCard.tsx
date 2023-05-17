import { Box, Typography } from "@mui/material";
import closeIcon from "../../assets/closeIcon.png";

const EmptyCard = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        width: "auto",
        height: "10rem",
        padding: "1rem",
        marginTop: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            color: "#00FFF0",
            border: "1px solid #8E9BAE",
            borderRadius: "50%",
            width: "3.5rem",
            height: "3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            animation: "glowing 2s infinite",
            boxShadow: () => `0 0 5px #00FFF0`,
            "@keyframes glowing": {
              "0%": {
                boxShadow: () => `0 0 5px #00FFF0`,
              },
              "50%": {
                boxShadow: () => `0 0 20px #00FFF0`,
              },
              "100%": {
                boxShadow: () => `0 0 5px #00FFF0`,
              },
            },
          }}
        >
          <Typography variant="h4">+</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #8E9BAE",
              width: "2rem",
              marginRight: "1rem",
            }}
          ></Box>
          <Box>0.0000</Box>
        </Box>
        <Box
          sx={{
            color: "white",
            fontSize: "1.3rem",
          }}
        >
          €0.00
        </Box>
      </Box>
      {/* right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "1px solid #8E9BAE",
          justifyContent: "space-around",
          alignItems: "center",
          width: "70%",
          height: "3rem",
        }}
      >
        <Box>$0.00</Box>
        <Box
          sx={{
            width: "2rem",
            borderBottom: "1px solid #8E9BAE",
          }}
        ></Box>
        <Box>0.00%</Box>
        <img
          src={closeIcon}
          alt="close"
          style={{ cursor: "pointer", alignSelf: "flex-start" }}
        />
      </Box>
    </Box>
  );
};

export default EmptyCard;
