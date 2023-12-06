import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "../Button";

export function StakingMenuLarge(props: any) {  
  const navigate = useNavigate();
  const activeView = props?.activeView || '';

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        marginBottom: { xs: "1rem", sm: "1rem" },
        marginTop: { xs: "1rem", sm: "0px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Button
          isActive={activeView === 'STAKE' || !activeView}
          clickFunction={() => navigate(`../Staking?view=STAKE`)}
        >
          Staking
        </Button>
        <Button
          isActive={activeView === 'EARN'}
          clickFunction={() => navigate(`../Staking?view=EARN`)}
        >
          Earning
        </Button>
        <Button
          isActive={activeView === 'TST'}
          clickFunction={() => navigate(`../Staking?view=TST`)}
        >
          TST Staking
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      ></Box>
    </Box>
  )
}

export default StakingMenuLarge;