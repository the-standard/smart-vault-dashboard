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
      className={` ${isActive ? "box glowing" : ""}`}
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
      <div>{icon}</div>
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
