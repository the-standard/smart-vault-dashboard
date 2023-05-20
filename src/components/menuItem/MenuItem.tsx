// import React, { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import "../../styles/glowingStyle.css";

interface MenuItemProps {
  text: string;
  icon: string;
  icon2: string;
  isActive: boolean;
  isWorking: boolean;
  handleClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  icon,
  icon2,
  isActive,
  handleClick,
  isWorking,
}) => {
  return (
    <Box
      className={` ${isWorking && isActive ? "glowingCard" : ""}`}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: "1rem",
        height: "full",
        padding: "0 0.7rem",
        width: { xs: "100%", sm: "auto" },
      }}
      onClick={handleClick}
    >
      <div style={{ color: "red" }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {isWorking && isActive ? (
          <img src={icon2} alt="" />
        ) : (
          <img src={icon} alt="" />
        )}
      </div>
      <p
        style={{
          marginLeft: "0.5rem",
        }}
      >
        {" "}
        {text}{" "}
      </p>
    </Box>
  );
};

export default MenuItem;
