import FullChart from "../chart/FullChart";
import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import { formatEther, formatUnits } from "viem";

import {
  useVaultStore,
  useVaultIdStore,
  useGreyProgressBarValuesStore,
} from "../../store/Store";

interface VaultChartProps {
  currentVault: any;
}

const VaultChart: React.FC<VaultChartProps> = ({
  currentVault,
}) => {  const { vaultStore } = useVaultStore();
  const { vaultID } = useVaultIdStore();
    useGreyProgressBarValuesStore();
  const vaultVersion = vaultStore?.status.version || '';

  const chartData = currentVault.status.collateral.map((asset: any) => {
    return {
      id: ethers.utils.parseBytes32String(asset.token.symbol),
      value: Number(formatEther(asset.collateralValue)).toFixed(2),
      label: Number(formatUnits(asset.amount, asset.token.dec)).toFixed(2),
    };
  });

  return (
    <Box
      sx={{
        width: { xs: "200px", sm: "300px" },
        height: { xs: "200px", sm: "300px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FullChart fullChartData={chartData} />
      <Typography
        sx={{
          position: "relative",
          top: { xs: "-120px", sm: "-170px" },
          fontFamily: "Poppins",
        }}
        variant="body1"
      >
        {" "}
        VAULT ID <br></br>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {vaultVersion ? (
            `V${vaultVersion}-`
          ) : ('')}
          {vaultID}
        </Box>
      </Typography>
    </Box>
  );
};

export default VaultChart;
