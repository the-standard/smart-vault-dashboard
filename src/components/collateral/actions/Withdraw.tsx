import React, { useState } from "react";
import {
  useCollateralSymbolStore,
  useVaultAddressStore,
} from "../../../store/Store";
import { Box } from "@mui/material";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import smartVaultAbi from "../../../abis/smartVault";

interface WithdrawProps {
  symbol: string;
}

const Withdraw: React.FC<WithdrawProps> = ({ symbol }) => {
  const { collateralSymbol } = useCollateralSymbolStore.getState();
  const [amount, setAmount] = useState(0);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { vaultAddress } = useVaultAddressStore.getState();

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
  };

  const withdrawCollateral = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);
    console.log(amount);
    try {
      console.log(symbol);
      if (symbol === "ETH" || symbol === "MATIC") {
        await contract.removeCollateralNative(
          ethers.utils.parseUnits(amount.toString()),
          address
        );
      } else if (symbol === "SUSD18" || symbol === "SUSD6") {
        const symbolBytes32 = ethers.utils.formatBytes32String(symbol); // Convert symbol to bytes32
        console.log(symbolBytes32);
        await contract.removeCollateral(
          symbolBytes32,
          ethers.utils.parseUnits(amount.toString()),
          address
        );
      } else {
        //this one should get the token address instead of symbol
        //but how will the user know the token address if this is just a fallback function?
        await contract.removeAsset(amount, address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shortenAddress = (address: any) => {
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-8);
    return `${prefix}...${suffix}`;
  };

  const shortenedAddress = shortenAddress(address);

  return (
    <Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "none",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "bold",
              height: "2rem",
              marginRight: "0.5rem",
              width: "100%",
            }}
            type="text"
            onChange={handleAmount}
          />
          {collateralSymbol}
        </Box>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            background: " rgba(18, 18, 18, 0.5)",
            border: "none",
            height: "2rem",
          }}
        >
          {shortenedAddress}
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px 4px",
            padding: "5px",
            cursor: "pointer",
            width: "100%",
          }}
          className="glowingCard"
          onClick={withdrawCollateral}
        >
          Withdraw
        </Box>
      </Box>
    </Box>
  );
};

export default Withdraw;
