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
    text: "Borrow for 0%",
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
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        flexDirection: "column",
        marginTop: { xs: "20px", sm: "20px", md: "0px" },
        alignItems: "center",
        background: { xs: "none", md: "rgba(0, 0, 0, 0.6)" },
        // backdropFilter: "blur(10px)",
        // borderRadius: "10px",
        // // margin: "40px",
        // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        // border: "1px solid rgba(255, 255, 255, 0.18)",
        // gridGap: "0",
        // overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {menuItems.map((item, index) => (
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={index}
          to={item.route ? `/${item.route}` : "/"}
        >
          <MenuItem
            text={item.text}
            isActive={activeIndex === index}
            handleClick={() => handleItemClick(index)}
          />
        </Link>
      ))}
    </Box>
  );
};

export default NavbarMenu;
