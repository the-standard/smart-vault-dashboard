import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MenuItem from "./menuItem/MenuItem";
import seuroibcologo from "../assets/seuroibcologo.svg";
// import tststakinglogo from "../assets/tststakinglogo.svg";
import liquidatorslogo from "../assets/liquidatorslogo.svg";
import historylogo from "../assets/historylogo.svg";
import borrowinglogo from "../assets/borrowinglogo.svg";
import seuroibcologo2 from "../assets/2ndseuroibcologo.svg";
// import tststakinglogo2 from "../assets/2ndtststakinglogo.svg";
import liquidatorslogo2 from "../assets/2ndliquidatorslogo.svg";
import historylogo2 from "../assets/2ndhistorylogo.svg";
import borrowinglogo2 from "../assets/2ndborrowinglogo.svg";
import { NavLink } from "react-router-dom";
import { useBurgerMenuStore } from "../store/Store";

const menuItems = [
  {
    text: "Borrow for 0%",
    icon: seuroibcologo,
    icon2: seuroibcologo2,
    isWorking: true,
  },
  {
    text: "Liquidation Pools",
    icon: historylogo,
    icon2: historylogo2,
    isWorking: true,
    route: "liquidation-pools",
  },
  {
    text: "Cross Chain Dex",
    icon: borrowinglogo,
    icon2: borrowinglogo2,
    isWorking: true,
    route: "dex",
  },
  {
    text: "Statistics",
    icon: liquidatorslogo,
    icon2: liquidatorslogo2,
    isWorking: true,
    route: "stats",
  },
];

const NavbarMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const { getBurgerMenu } = useBurgerMenuStore();

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    getBurgerMenu(false);
  };

  useEffect(() => {
    if (
      window.location.pathname.includes('/staking') ||
      window.location.pathname.includes('/yield')
    ) {
      navigate('liquidation-pools');
    }
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        flexDirection: "column",
        marginTop: { xs: "20px", sm: "20px", md: "0px" },
        alignItems: "center",
        backgroundColor: { xs: "rgba(0, 0, 0, 0.4)", md: "rgba(0, 0, 0, 0.6)" },
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "10px",
        width: "100%",
        height: "100%",
      }}
      className="navbar"
    >
      {menuItems.map((item, index) => {
        const collateralActive = window.location.pathname.includes('/Collateral') && !item.route;

        let to: any = item.route ? `/${item.route}` : "/";

        if (item.route === 'stats') {
          to = "https://dune.com/the_standard/smart-vaults";

          return (
            <a
              href={to}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "white",
                width: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                border: "",
                boxShadow: "",
              }}
            >
              <MenuItem
                text={item.text}
                isActive={false}
                handleClick={() => null}
              />
            </a>
          );  
        }

        return (
          <NavLink
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                color: "white",
                width: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                border: isActive || collateralActive ? "1px solid white" : "",
                boxShadow: isActive || collateralActive ? "0 0 2px 2px rgba(255, 255, 255, 0.5)" : "",
              };
            }}
            key={index}
            to={to}
          >
            <MenuItem
              text={item.text}
              isActive={activeIndex === index}
              handleClick={() => handleItemClick(index)}
            />
          </NavLink>
        );
      })}

    </Box>
  );
};

export default NavbarMenu;
