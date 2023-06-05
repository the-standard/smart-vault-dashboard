// import React, { ReactNode, useState } from "react";
import { Box, Typography } from "@mui/material";
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
        width: { xs: "100%", sm: "85%" },
        //   border: "2px solid red",

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
      <Typography
        variant="body1"
        sx={{
          marginLeft: "0.5rem",
          fontSize: { xs: "1rem", sm: "1rem" },
        }}
      >
        {" "}
        {text}{" "}
      </Typography>
    </Box>
  );
};

export default MenuItem;
