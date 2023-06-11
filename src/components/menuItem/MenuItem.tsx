import React from "react";
import { Box, Button } from "@mui/material";

interface NavButtonProps {
  text: string;
  isActive: boolean;
  handleClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  text,
  // isActive,
  handleClick,
}) => {
  return (
    <Button
      sx={{
        background: "none",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 200,
        fontSize: "1rem",
        border: "none",
        padding: "10px",
        height: "65px",
        width: "100%",
        color: "#afafaf",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.3s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        "&:hover": {
          background: "rgba(0, 0, 0, 0.4)",
          transform: "scale(1.2)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        },
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          fontSize: { xs: "1rem", md: "0.8rem", lg: "1rem" },
          "&:hover": {
            color: "#fff",
            paddingLeft: "20px",
          },
        }}
      >
        {text}
      </Box>
    </Button>
  );
};

export default NavButton;
