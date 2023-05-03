import { Box } from "@mui/material";
import MenuItem from "./menuItem/MenuItem";
import { useState } from "react";
import seuroibcologo from "../assets/seuroibcologo.svg";
import tststakinglogo from "../assets/tststakinglogo.svg";
import liquidatorslogo from "../assets/liquidatorslogo.svg";
import historylogo from "../assets/historylogo.svg";
import borrowinglogo from "../assets/borrowinglogo.svg";

const menuItems = [
  {
    text: "sEuro IBCO",
    icon: seuroibcologo,
  },
  {
    text: "TST Staking",
    icon: tststakinglogo,
  },
  {
    text: "Liquidators",
    icon: liquidatorslogo,
  },
  {
    text: "History",
    icon: historylogo,
  },
  {
    text: "Borrowing via Smart Vaults",
    icon: borrowinglogo,
  },
];

const NavbarMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: { sm: "wrap", md: "nowrap" },
        alignItems: "center",
        justifyContent: "space-evenly",
        background: { xs: "transparent", sm: "rgba(18, 18, 18, 0.5)" },
        boxShadow: { xs: "none" },
        sm: "0px 1.29525px 1.29525px rgba(255, 255, 255, 0.5), inset 0px 1.29525px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "6.47627px",
        marginTop: { xs: "1rem", sm: "0" },
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          text={item.text}
          icon={item.icon}
          isActive={activeIndex === index}
          handleClick={() => handleItemClick(index)}
        />
      ))}
    </Box>
  );
};

export default NavbarMenu;
