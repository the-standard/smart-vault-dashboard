import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useAccount } from "wagmi";
// import StakingMenuSmall from "../components/staking/StakingMenuSmall";
// import StakingMenuLarge from "../components/staking/StakingMenuLarge";
// import StakingStake from "../components/staking/StakingStake";
// import StakingEarn from "../components/staking/StakingEarn";
import StakingTST from "../components/staking/legacy/StakingTST";

import Card from "../components/Card.tsx";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Staking = () => {
  const query = useQuery();
  const queryView = query.get("view") || '';

  const [activeView, setActiveView] = useState('STAKE');

  const handleActive = (element: any) => {
    setActiveView(element);
  };

  useEffect(() => {
    handleActive(queryView)
  }, [queryView]);

  const { address: accountAddress } = useAccount();

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
        {/* TEMP */}
        {/* <StakingMenuLarge activeView={activeView} />
        <StakingMenuSmall activeView={activeView} /> */}
  
        <Box
        >
          {/* TEMP */}
          {/* {activeView === 'STAKE' || !activeView ? (
            <StakingStake />
          ) : null}
    
          {activeView === 'EARN' ? (
            <StakingEarn />
          ) : null}
    
          {activeView === 'TST' ? (
            <StakingTST />
          ) : null} */}

          {activeView ? (
            <StakingTST />
          ) : 
            <StakingTST />
          }

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
              Connect your Arbitrum web3 wallet below to get started.
            </Typography>
            <Box
              sx={{
                marginTop: "1em",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <w3m-button />
            </Box>
          </Card>
        </Box>
      </Grid>
    </Box>
  );
};

export default Staking;
