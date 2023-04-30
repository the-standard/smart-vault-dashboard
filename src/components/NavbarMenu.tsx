import { Box } from "@mui/material";
import MenuItem from "./menuItem/MenuItem";
import { IoSettingsSharp, IoPersonSharp } from "react-icons/io5";
import { useState } from "react";

const menuItems = [
  {
    text: "sEuro IBCO",
    icon: <IoSettingsSharp />,
  },
  {
    text: "TST Staking",
    icon: <IoSettingsSharp />,
  },
  {
    text: "Liquidators",
    icon: <IoSettingsSharp />,
  },
  {
    text: "History",
    icon: <IoSettingsSharp />,
  },
  {
    text: "Borrowing via Smart Vaults",
    icon: <IoSettingsSharp />,
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
