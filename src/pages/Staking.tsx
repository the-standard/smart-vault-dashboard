import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import StakingMenuSmall from "../components/staking/StakingMenuSmall";
import StakingMenuLarge from "../components/staking/StakingMenuLarge";
import StakingAbout from "../components/staking/StakingAbout";
import StakingTST from "../components/staking/legacy/StakingTST";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Staking = () => {
  const query = useQuery();
  const queryView = query.get("view") || '';

  const [activeView, setActiveView] = useState('ABOUT');

  const handleActive = (element: any) => {
    setActiveView(element);
  };

  useEffect(() => {
    handleActive(queryView)
  }, [queryView]);


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
      <StakingMenuLarge activeView={activeView} />
      <StakingMenuSmall activeView={activeView} />

      {activeView === 'ABOUT' || !activeView ? (
        <StakingAbout />
      ) : null}

      {activeView === 'STAKE' ? (
        <></>
      ) : null}

      {activeView === 'EARN' ? (
        <></>
      ) : null}

      {activeView === 'TST' ? (
        <StakingTST />
      ) : null}


    </Box>
  );
};

export default Staking;
