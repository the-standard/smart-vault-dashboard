import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Box)({
  background: `linear-gradient(
    110.28deg,
    rgba(26, 26, 26, 0.3) 0.2%,
    rgba(0, 0, 0, 0.6) 101.11%)
  `,
  boxShadow: `
    inset 1px 1px 1px 0px grey,
    5px 5px 25px 0px rgba(0, 0, 0, 0.6)
  `,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderRadius: "10px",
  borderCollapse: "separate",
  borderSpacing: "0 15px",
  width: "auto",
  height: "auto",
  padding: "1rem",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export default Card;
