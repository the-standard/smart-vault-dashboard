import { Web3Button } from "@web3modal/react";
// import { useAccount } from "wagmi";
// import { useDisconnect } from "wagmi";
import { Box, Typography } from "@mui/material";
import { stack as Menu } from "react-burger-menu";
import NavbarMenu from "./NavbarMenu";
import logo from "../assets/standardiologo.svg";

const Navbar = () => {
  // const { address } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  // const { disconnect } = useDisconnect();

  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "white",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      //background: "transparent",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
      background:
        "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
      border: "1px solid rgba(52, 52, 52, 0.3)",
      boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
      borderRadius: "10px 10px 0px 0px",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      // display: "inline-block",
      display: "flex",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.7)",
    },
  };

  return (
    <Box
      sx={{
        padding: "0 12%",
        // border: "10px solid red",
      }}
    >
      {/* sidebar starts */}
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <Menu styles={styles}>
          {/* <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a> */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Web3Button />
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <NavbarMenu />
          </Box>
        </Menu>
      </Box>
      {/* sidebar ends */}
      {/* nav */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        {/* title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "auto",
              height: "auto",
              marginRight: "1rem",
              margin: "36px 0",
            }}
          />
          {/* <Typography
            sx={{
              // marginLeft: { xs: "5rem", sm: "5rem", lg: "5rem", xl: "5rem" },
              margin: "36px 0",
              fontSize: "1.5rem",
            }}
          >
            TheStandard.io
          </Typography> */}
        </Box>
        {/* title ends */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Web3Button />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <NavbarMenu />
      </Box>
    </Box>
  );
};

export default Navbar;
