import React from "react";
import { Box, Button } from "@mui/material";
import "../../styles/navbarStyle.css";

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
        fontWeight: 300,
        fontSize: "1rem",
        border: "none",
        padding: "10px",
        height: "65px",
        width: "100%",
        // color: "#ffffff",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.3s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",

        // "&:hover": {
        //   background: "rgba(0, 0, 0, 0.4)",
        //   transform: "scale(1.1)",
        //   boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
        //   borderRadius: "10px",
        // },
        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   background: "rgba(255, 255, 255, 0.2)",
        //   width: "50%",
        //   height: "100%",
        //   left: "-100%",
        //   top: 0,
        //   transform: "skewX(-45deg)",
        //   transition: "left 0.4s ease",
        //   pointerEvents: "none",
        // },
        // "&:hover::before": {
        //   left: "130%",
        // },
      }}
      onClick={handleClick}
      className="nav-button"
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: { xs: "1rem", md: "0.8rem", lg: "1rem" },
          fontFamily: "Poppins",
          fontWeight: 200,
          color: " #afafaf",
          // position: "relative",
          // overflow: "hidden",
          // borderRadius: "0",
          // cursor: "pointer",
          // textDecoration: "none",
          // transition: "all 0.3s ease",
          // background: { xs: "rgba(0, 0, 0, 0.2)", md: "none" },
        }}
      >
        {text}
      </Box>
    </Button>
  );
};

export default NavButton;
