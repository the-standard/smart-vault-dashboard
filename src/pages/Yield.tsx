import { Box, Typography } from "@mui/material";
import yields from "../assets/yields.png";
import step2 from "../assets/yield-step-2.png";
import step2Mode from "../assets/select-mode.png";
import step4Staking from "../assets/auto-staking.png";
import nitroPools from "../assets/nitro-pools.png";
import { usePositionStore } from "../store/Store.ts";
import { useLayoutEffect, useRef } from "react";

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
      sx={{
        color: "#8E9BAE",
        margin: { xs: "0", sm: "3% 12%" },
        padding: "5%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        minHeight: "100vh",
        height: "100%",
        backdropFilter: "blur(13.9px)",
      }}
      ref={rectangleRef}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: "#fff" }}>
            Earn up to 15% APR yield
          </Typography>
          <img src={yields} alt="yields" width="auto" height="130px" />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="h6"
          >
            🌟🌟🌟 Unleash the Magic of Crypto with Camelot! 🌟🌟🌟{" "}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Boost your EUROs by placing them into liquidity pools. By doing
            this, you can own a slice of the biggest decentralized exchange on
            Arbitrum, where every trade funnels rewards straight into your
            crypto wallet using the GRAIL token.
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            The Standard DAO and Camelot DEX, the hottest exchange on Arbitrum,
            are rolling out the red carpet for YOU, offering a dazzling yield of
            15% PLUS trading fees! Ready to grow your assets? Here's how:
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="h5"
          >
            🔥 Ignite Your Journey in 3 Simple Steps: 🔥{" "}
          </Typography>{" "}
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="h6"
          >
            STEP ONE: Gather Your Treasures! 🪙{" "}
          </Typography>
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
        {/* widget */}
        <Box
          sx={{
            height: "250px",
            width: "250px",
            border: "1px solid #fff",
          }}
        >
          WIDGET HERE
        </Box>
      </Box>
      {/* step 2 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="h6"
          >
            STEP TWO: Dive into Camelot’s Pools! 🌊{" "}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Set sail to Camelot's Liquidity Haven.
          </Typography>{" "}
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            V3 awaits you (already set for your convenience).
          </Typography>{" "}
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Choose EUROs and USDC.e from the treasure trove of pairs.
          </Typography>
        </Box>
        <img
          src={step2}
          alt="step2"
          width="100%"
          style={{
            maxWidth: "500px",
          }}
          height="250px"
        />
      </Box>
      {/* step 2 continues */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Set "AUTO" and let GAMMA, the wise liquidity wizard, optimize your
            rewards without you lifting a finger.{" "}
          </Typography>{" "}
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Set "AUTO" and let GAMMA, the wise liquidity wizard, optimize your
            rewards without you lifting a finger.{" "}
          </Typography>{" "}
        </Box>
        <img
          src={step2Mode}
          alt="step2"
          width="100%"
          max-width="500px"
          height="250px"
          style={{
            maxWidth: "500px",
          }}
        />
      </Box>
      {/* step 3 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="h6"
          >
            STEP THREE: Make It Rain Rewards! 🌧️💰{" "}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Decide how much shimmering EUROs or USDC you wish to pour into the
            liquidity cauldron.{" "}
          </Typography>{" "}
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Grant your royal approval and seal the deal with "Create Position".{" "}
          </Typography>{" "}
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Decide how much shimmering EUROs or USDC you wish to pour into the
            liquidity cauldron.{" "}
          </Typography>
        </Box>
      </Box>
      {/* step 4 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,

          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="h6"
          >
            STEP FOUR: Let’s up the reward by 5%{" "}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            But why stop there? Supercharge that up to a whopping 15% by placing
            your spNFT liquidity tokens into the NITRO pool. This will grant you
            the extra 5% APR in TST tokens. These tokens are what will give you
            a cut of all fees generated on TheStandard Protocol.{" "}
          </Typography>{" "}
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "1rem" }}>
            Join us, and let's make crypto magic together on Camelot! 🏰✨{" "}
          </Typography>{" "}
        </Box>
        <Box
          sx={
            {
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }
          }
        >
          <img
            src={step4Staking}
            alt="step4-staking"
            width="100%"
            style={{
              maxWidth: "500px",
            }}
            height="auto"
          />
          <img
            src={nitroPools}
            alt="nitro-pools"
            width="100%"
            style={{
              maxWidth: "500px",
            }}
            height="250px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Yield;
