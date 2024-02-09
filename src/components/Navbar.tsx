import { useEffect } from "react";
import { Box } from "@mui/material";
import { slide as Menu } from "react-burger-menu";
import NavbarMenu from "./NavbarMenu";
import logo from "../assets/standardiologo.svg";
import logoIcon from "../assets/standardiologoicon.svg";
import { useBurgerMenuStore } from "../store/Store";
import arbitrumLogoLong from "../assets/arbitrumLogoLong.svg";
import arbitrumLogoShort from "../assets/arbitrumLogoShort.svg";
import arbitrumTestLogoLong from "../assets/arbitrumTestLogoLong.svg";
import arbitrumTestLogoShort from "../assets/arbitrumTestLogoShort.svg";
import networkNotSupportedLong from "../assets/networkNotSupportedLong.svg";
import networkNotSupportedShort from "../assets/networkNotSupportedShort.svg";
import { useChainId, useAccount } from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react'

const Navbar = () => {
  const { getBurgerMenu, burgerMenu } = useBurgerMenuStore();

  const handleStateChange = (state: any) => {
    getBurgerMenu(state.isOpen);
  };

  const chainId = useChainId();

  const { isConnected } = useAccount() 
  const { open } = useWeb3Modal()
  
  useEffect(() => {
    if (!isConnected) {
      open();
    }
  }, []);  

  let logoComponent = null;
  if (chainId === 42161) {
    logoComponent = (
      <Box
        component="img"
        sx={{
          content: {
            xs: `url(${arbitrumLogoShort})`,
            md: `url(${arbitrumLogoLong})`,
          },
          width: {
            xs: "42px",
            md: "150px",
          },
          height: {
            xs: "42px",
            md: "150px",
          },
          marginRight: {
            xs: "0px",
            sm: "1rem"
          },
        }}
        alt="Arbitrum Network"
      />
    );
  } else if (chainId === 421614) {
    logoComponent = (
      <Box
        component="img"
        sx={{
          content: {
            xs: `url(${arbitrumTestLogoShort})`,
            md: `url(${arbitrumTestLogoLong})`,
          },
          width: {
            xs: "42px",
            md: "150px",
          },
          height: {
            xs: "42px",
            md: "150px",
          },
          marginRight: {
            xs: "0px",
            sm: "1rem"
          },
        }}
        alt="Arbitrum Test Network"
      />
    );
  } else {
    logoComponent = (
      <Box
        component="img"
        sx={{
          content: {
            xs: `url(${networkNotSupportedShort})`,
            md: `url(${networkNotSupportedLong})`,
          },
          width: {
            xs: "42px",
            md: "150px",
          },
          height: {
            xs: "42px",
            md: "150px",
          },
          marginRight: {
            xs: "0px",
            sm: "1rem"
          },
        }}
        alt="Network Not Supported"
      />
    );
  }

  const styles: any = {
    bmBurgerButton: {
      position: "absolute",
      width: "36px",
      height: "32px",
      top: "32px",
      right: "0px",
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
      background:
        "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
      borderRadius: "10px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(13.9px)",
      WebkitBackdropFilter: "blur(13.9px)",
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
      display: "flex",
    },
    bmOverlay: {
      background: "transparent",
    },
  };

  return (
    <Box
      sx={{
        padding: {
          xs: "0 4%",
          sm: "0 6%",
          md: "0 12%",
        },
        height: {
          xs: "100px",
          md: "100%",
        }
      }}
    >
      {/* sidebar starts */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "relative",
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
          height: "100%",
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
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              padding: "0px",
              content: {
                xs: `url(${logoIcon})`,
                md: `url(${logo})`,
              },
              maxHeight: {
                xs: "40px",
                md: "unset",
              },
              maxWidth: {
                xs: "40px",
                md: "unset",
              },
              marginTop: {
                xs: "40px",
                md: "60px",
              },
              marginBottom: {
                xs: "40px",
                md: "60px",
              },
            }}
            alt="Standard.io Logo"
          />
        </Box>
        {/* title ends */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
            width: "100%",
            marginRight: {
              xs: "0px",
              sm: "80px",
              md: "0px"
            }
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {chainId ? logoComponent : null}
            <w3m-button />
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
