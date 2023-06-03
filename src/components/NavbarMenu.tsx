import { Box } from "@mui/material";
import MenuItem from "./menuItem/MenuItem";
import { useState } from "react";
import seuroibcologo from "../assets/seuroibcologo.svg";
import tststakinglogo from "../assets/tststakinglogo.svg";
import liquidatorslogo from "../assets/liquidatorslogo.svg";
import historylogo from "../assets/historylogo.svg";
import borrowinglogo from "../assets/borrowinglogo.svg";
import seuroibcologo2 from "../assets/2ndseuroibcologo.svg";
import tststakinglogo2 from "../assets/2ndtststakinglogo.svg";
import liquidatorslogo2 from "../assets/2ndliquidatorslogo.svg";
import historylogo2 from "../assets/2ndhistorylogo.svg";
import borrowinglogo2 from "../assets/2ndborrowinglogo.svg";
import { Link } from "react-router-dom";

const menuItems = [
  {
    text: "sEuro IBCO",
    icon: seuroibcologo,
    icon2: seuroibcologo2,
    isWorking: false,
  },
  {
    text: "TST Staking",
    icon: tststakinglogo,
    icon2: tststakinglogo2,
    isWorking: false,
  },
  {
    text: "Liquidators",
    icon: liquidatorslogo,
    icon2: liquidatorslogo2,
    isWorking: false,
  },
  {
    text: "History",
    icon: historylogo,
    icon2: historylogo2,
    route: "history",
    isWorking: true,
  },
  {
    text: "Borrowing via Smart Vaults",
    icon: borrowinglogo,
    icon2: borrowinglogo2,
    route: "",
    isWorking: true,
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
        display: { xs: "flex", sm: "flex", md: "grid" },
        gridTemplateColumns: { md: "repeat(5, 1fr)" },
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: { sm: "wrap", md: "nowrap" },

        background: { xs: "transparent", sm: "rgba(18, 18, 18, 0.5)" },
        boxShadow: { xs: "none" },
        //   sm: "0px 1.29525px 1.29525px rgba(255, 255, 255, 0.5), inset 0px 1.29525px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "6.47627px",
        marginTop: { xs: "1rem", sm: "0" },
      }}
    >
      {menuItems.map((item, index) => (
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            width: "100%",
            overflow: "hidden",
          }}
          key={index}
          to={item.route ? `/${item.route}` : "/"}
        >
          {" "}
          <MenuItem
            text={item.text}
            // icon={item.icon}
            // icon2={item.icon2}
            isActive={activeIndex === index}
            isWorking={item.isWorking}
            handleClick={() => handleItemClick(index)}
          />
        </Link>
      ))}
    </Box>
  );
};

export default NavbarMenu;
