// import React, { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import "../../styles/navbarStyle.css";

interface MenuItemProps {
  text: string;
  // icon: string;
  // icon2: string;
  isActive: boolean;
  isWorking: boolean;
  handleClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  // icon,
  // icon2,
  isActive,
  handleClick,
  isWorking,
}) => {
  return (
    <Box
      className={` nav-button ${isWorking && isActive ? "navBtnClicked" : ""}`}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: "1rem",
        height: "full",
        padding: "0 0.7rem",
        width: { xs: "100%", sm: "auto" },

        //  border: "5px solid red",
      }}
      onClick={handleClick}
    >
      {/* <div style={{}}>
        {isWorking && isActive ? (
          <img src={icon2} alt="" />
        ) : (
          <img src={icon} alt="" />
        )}
      </div> */}
      <p
        style={{
          marginLeft: "0.5rem",
          fontSize: "1.2rem",
        }}
      >
        {" "}
        {text}{" "}
      </p>
    </Box>
  );
};

export default MenuItem;
