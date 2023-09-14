import { Box, Typography } from "@mui/material";
import yields from "../assets/yields.png";
import step2 from "../assets/yield-step-2.png";
import step2Mode from "../assets/select-mode.png";
import step4Staking from "../assets/auto-staking.png";
import nitroPools from "../assets/nitro-pools.png";
import { usePositionStore } from "../store/Store.ts";
import { useLayoutEffect, useRef } from "react";
import Exchange from "./Exchange.tsx";
import { arbitrum } from "wagmi/chains";

import Card from "../components/Card";

const Yield = () => {
  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

  useLayoutEffect(() => {
    function updatePosition() {
      if (rectangleRef.current) {
        const { right, top } = rectangleRef.current.getBoundingClientRect();
        setPosition({ right, top });
      }
    }

    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => window.removeEventListener("resize", updatePosition);
  }, [setPosition]);
  return (
    <Box
    >
      {/* Title */}
      <Card
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
          padding: "2%",
        }}
        ref={rectangleRef}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="h4" sx={{ color: "#fff" }}>
              Earn a large yield with your EUROs!
            </Typography>
            <img src={yields} alt="yields" width="auto" height="130px" />
          </Box>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#fff",
                margin: "1rem 0",
              }}
              variant="h4"
            >
              Unleash the Magic of Crypto with Camelot! 🌟{" "}
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              Boost your EUROs by placing them into liquidity pools. By doing
              this, you can own a slice of the biggest decentralized exchange on
              Arbitrum, where every trade funnels rewards straight into your
              crypto wallet using the GRAIL token.
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              The Standard DAO and Camelot DEX, the hottest exchange on Arbitrum,
              are rolling out the red carpet for YOU, offering a dazzling yield
              PLUS trading fees! Ready to grow your assets? Here's how:
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Step One */}
      <Card
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
          padding: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%"
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
              variant="h6"
            >
              STEP ONE: Gather Your Treasures! 🪙
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",    
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%"
                },
                marginRight: {
                  xs: "0px",
                  md: "1rem"
                }
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
                Need EUROs? Lock assets with The Standard. Borrow EUROs at a 0%
                interest rate. Magic, right?
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
                For USDC.e, swap any asset using our easy-breezy widget.The cool
                thing with our widget is you can swap any token on any chain over to
                USDC.e on Arbitrum!
              </Typography>
            </Box>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%"
                },  
                marginBottom: "1rem",
              }}
            >
              <Exchange
                toChain={arbitrum.id}
                toToken="0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
              />
            </Box>
          </Box>

        </Box>
      </Card>

      {/* Step Two */}
      <Card
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
          padding: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%"
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
              variant="h6"
            >
              STEP TWO: Dive into Camelot&apos;s Pools! 🌊{" "}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
          }}
        >

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              marginRight: {
                xs: "0",
                md: "1rem",
              },
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              V3 awaits you (already set for your convenience).
            </Typography>{" "}
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              Choose EUROs and USDC.e from the treasure trove of pairs.
            </Typography>
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%"
              },
              display: {
                xs: "flex",
                md: "block"
              },
              flexDirection: {
                xs: "column"
              },
              alignItems: {
                xs: "center",
                md: "unset"
              },
              marginBottom: "1rem",
            }}
          >
            <img
              src={step2}
              alt="step2"
              style={{
                borderRadius: "10px",
                objectFit: "contain",
                maxWidth: "500px",
                maxHeight: "100%",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>

        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
          }}
        >

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              marginRight: {
                xs: "0",
                md: "1rem",
              },
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              Set "AUTO" and let GAMMA, the wise liquidity wizard, optimize your
              rewards without you lifting a finger.{" "}
            </Typography>{" "}
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%"
              },
              display: {
                xs: "flex",
                md: "block"
              },
              flexDirection: {
                xs: "column"
              },
              alignItems: {
                xs: "center",
                md: "unset"
              },
              marginBottom: "1rem",
            }}
          >
            <img
              src={step2Mode}
              alt="step2"
              style={{
                borderRadius: "10px",
                objectFit: "contain",
                maxWidth: "500px",
                maxHeight: "100%",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        </Box>
      </Card>

      {/* Step Three */}
      <Card
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
          padding: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%"
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
              variant="h6"
            >
              STEP THREE: Make It Rain Rewards! 🌧️💰{" "}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                // md: "50%",
              },
              marginRight: {
                xs: "0",
                // md: "1rem",
              },
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              Decide how much EUROs or USDC you wish to pour into the liquidity
              cauldron.{" "}
            </Typography>{" "}
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              Grant your royal approval and seal the deal with "Create Position".{" "}
            </Typography>{" "}
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              🌈 Voilà! Revel in the continuous shower of trading fees and a
              strong yield paid in the majestic GRAIL tokens.{" "}
            </Typography>{" "}
          </Box>

        </Box>

      </Card>

      {/* Step Four */}
      <Card
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
          padding: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%"
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
              variant="h6"
            >
              STEP FOUR: Let&apos;s up the reward by 5%
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
          }}
        >

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              marginRight: {
                xs: "0",
                md: "1rem",
              },
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              But why stop there? Supercharge your yield even higher by placing
              your spNFT liquidity tokens into the NITRO pool. This will grant you
              the extra APR in TST tokens. These tokens are what will give you a
              cut of all fees generated on TheStandard Protocol.{" "}
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
              Join us, and let's make crypto magic together on{" "}
              <a
                style={{
                  textDecoration: "none",
                  paddingBottom: "1px",
                  borderBottom: "1px solid #fff",
                  color: "#fff",
                  cursor: "pointer",
                }}
                href="https://app.camelot.exchange/liquidity/"
                target="_blank"
              >
                Camelot!
              </a>{" "}
              🏰✨{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%"
              },
              display: {
                xs: "flex",
                md: "block"
              },
              flexDirection: {
                xs: "column"
              },
              alignItems: {
                xs: "center",
                md: "unset"
              },
              marginBottom: "1rem",
            }}
          >
            <img
              src={step4Staking}
              alt="step4-staking"
              style={{
                borderRadius: "10px",
                objectFit: "contain",
                maxWidth: "500px",
                maxHeight: "100%",
                width: "100%",
                height: "auto",
                marginBottom: "1rem",
              }}
            />
            <img
              src={nitroPools}
              alt="nitro-pools"
              style={{
                borderRadius: "10px",
                objectFit: "contain",
                maxWidth: "500px",
                maxHeight: "100%",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        </Box>

      </Card>
    </Box>
  );
};

export default Yield;
