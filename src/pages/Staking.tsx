import { useMemo, useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";
// import StakingMenuSmall from "../components/staking/StakingMenuSmall";
// import StakingMenuLarge from "../components/staking/StakingMenuLarge";
// import StakingAbout from "../components/staking/StakingAbout";
// import StakingStake from "../components/staking/StakingStake";
// import StakingEarn from "../components/staking/StakingEarn";
import StakingTST from "../components/staking/legacy/StakingTST";

import {
  usePositionStore,
} from "../store/Store.ts";

import Card from "../components/Card.tsx";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Staking = () => {
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

  const query = useQuery();
  const queryView = query.get("view") || '';
  const { address: accountAddress } = useAccount();

  const [activeView, setActiveView] = useState('TST');

  const handleActive = (element: any) => {
    setActiveView(element);
  };

  useEffect(() => {
    handleActive(queryView)
  }, [queryView]);

  if (accountAddress) {
    return (
      <Box
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },
        }}
      >
        {/* <StakingMenuLarge activeView={activeView} />
        <StakingMenuSmall activeView={activeView} /> */}
  
        <Box
          ref={rectangleRef}
        >
          {/* {activeView === 'ABOUT' || !activeView ? (
            <StakingAbout />
          ) : null}
    
          {activeView === 'STAKE' ? (
            <StakingStake />
          ) : null}
    
          {activeView === 'EARN' ? (
            <StakingEarn />
          ) : null}
    
          {activeView === 'TST' ? (
            <StakingTST />
          ) : null} */}
          {activeView === 'TST' ? (
            <StakingTST />
          ) : <StakingTST />}
        </Box>
  
      </Box>
    );  
  }

  return (
    <Box>
      <Grid
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
          minHeight: "50vh",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            width: "100%",
            gap: "2rem",
          }}
          ref={rectangleRef}
        >
          <Card
            sx={{
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "Poppins",
              }}
            >
              Earn EUROs With TST Staking Pools
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontFamily: "Poppins",
                marginTop: "1em",
                opacity: "0.8"
              }}
            >
              Help stabilize the price of TST while also being rewarded. Yield is paid out in EUROs.
              <br/>
              No KYC, No Trust Needed.
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontFamily: "Poppins",
                marginTop: "1em",
                opacity: "0.8"
              }}
            >
              Connect your web3 wallet below to get started.
            </Typography>
            <Box
              sx={{
                marginTop: "1em",
              }}
            >
              <Web3Button />
            </Box>
          </Card>
        </Box>
      </Grid>
    </Box>
  );
};

export default Staking;
