import { Web3Button } from "@web3modal/react";
// import { useAccount } from "wagmi";
// import { useDisconnect } from "wagmi";
import { Box } from "@mui/material";
import { stack as Menu } from "react-burger-menu";
import NavbarMenu from "./NavbarMenu";
import logo from "../assets/standardiologo.svg";
import { usePositionStore, useBurgerMenuStore } from "../store/Store";

const Navbar = () => {
  // const { address } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  // const { disconnect } = useDisconnect();
  const { right } = usePositionStore((state) => state);

  const { getBurgerMenu, burgerMenu } = useBurgerMenuStore();

  const handleStateChange = (state: any) => {
    getBurgerMenu(state.isOpen);
  };

  const styles: any = {
    bmBurgerButton: {
      position: "absolute",
      width: "36px",
      height: "30px",
      top: "46px",
      right: window.innerWidth - right,
    },
    bmBurgerBars: {
      background: "white",
      borderRadius: "10px",
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
      // padding: "2.5em 1.5em 0",
      // fontSize: "1.15em",
      // background:
      //   "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
      // border: "1px solid rgba(52, 52, 52, 0.3)",
      // boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
      // borderRadius: "10px 10px 0px 0px",
      background:
        "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
      borderRadius: "10px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(13.9px)",
      height: "100%",
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
      background: "transparent",
    },
  };

  return (
    <Box
      sx={{
        padding: "0 12%",
      }}
    >
      {/* sidebar starts */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Menu
          isOpen={burgerMenu}
          onStateChange={handleStateChange}
          width={"100%"}
          right
          styles={styles}
        >
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
          // flexDirection: { sm: "column", md: "row" },
          // justifyContent: "space-between",
          // alignItems: { sm: "flex-start", md: "center" },
        }}
      >
        {" "}
        {/* title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: { xs: "200px", sm: "350px" },
            height: "100%",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "100%",
              height: "100%",
              marginRight: "1rem",
              margin: "36px 0",
              position: "relative",
              top: "1rem",
            }}
          />
        </Box>
        {/* title ends */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
              float: "right",
              top: { xs: "1rem", sm: "0.7rem" },
            }}
          >
            <Web3Button />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <NavbarMenu />
      </Box>
    </Box>
  );
};

export default Navbar;
