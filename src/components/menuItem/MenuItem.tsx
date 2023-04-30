import React, { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import "./style.css";

interface MenuItemProps {
  text: string;
  icon: ReactNode;
  isActive: boolean;
  handleClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  icon,
  isActive,
  handleClick,
}) => {
  return (
    <Box
      className={`box ${isActive ? "glowing" : ""}`}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: "1rem",
      }}
      onClick={handleClick}
    >
      <div>{icon}</div>
      <p> {text} </p>
    </Box>
  );
};

export default MenuItem;
