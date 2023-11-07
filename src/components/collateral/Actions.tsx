import { Box } from "@mui/material";
import React from "react";
import Deposit from "./actions/Deposit";
import Withdraw from "./actions/Withdraw";
// import Swap from "./actions/Swap";

interface ActionsProps {
  activeElement: number;
  symbol: string;
  //1 = deposit, 2 = withdraw, 3 = swap, 4 = borrow 5 = pay down
  tokenAddress: string;
  decimals: number;
  token: any;
  collateralValue: any;
  collateralSymbol: string;
  assets: any;
}

const Actions: React.FC<ActionsProps> = ({
  activeElement,
  symbol,
  tokenAddress,
  decimals,
  token,
  collateralValue,
  collateralSymbol,
  // assets,
}) => {
  let content: JSX.Element;

  switch (activeElement) {
    case 1:
      content = (
        <Box>
          {" "}
          <Deposit
            symbol={symbol}
            tokenAddress={tokenAddress}
            decimals={decimals}
            token={token}
          />{" "}
        </Box>
      );
      break;
    case 2:
      content = (
        <Box>
          {" "}
          <Withdraw
            symbol={symbol}
            tokenAddress={tokenAddress}
            decimals={decimals}
            token={token}
            collateralValue={collateralValue}
            collateralSymbol={collateralSymbol}
          />{" "}
        </Box>
      );
      break;
    // case 3:
    //   content = (
    //     <Box>
    //       {" "}
    //       <Swap
    //         symbol={symbol}
    //         tokenAddress={tokenAddress}
    //         decimals={decimals}
    //         token={token}
    //         collateralValue={collateralValue}
    //         collateralSymbol={collateralSymbol}
    //         assets={assets}
    //       />{" "}
    //     </Box>
    //   );
    //   break;
    default:
      content = <Box></Box>;
      break;
  }

  return <Box>{content}</Box>;
};

export default Actions;
