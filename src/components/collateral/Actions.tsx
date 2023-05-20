import { Box, Typography } from "@mui/material";
import React from "react";
import Deposit from "./actions/Deposit";
import Withdraw from "./actions/Withdraw";

interface ActionsProps {
  activeElement: number;
  symbol: string;
  //1 = deposit, 2 = withdraw, 3 = swap, 4 = borrow 5 = pay down
}

const Actions: React.FC<ActionsProps> = ({ activeElement, symbol }) => {
  let content: JSX.Element;

  console.log(activeElement);

  switch (activeElement) {
    case 1:
      content = (
        <Box>
          {" "}
          <Deposit />{" "}
        </Box>
      );
      break;
    case 2:
      content = (
        <Box>
          {" "}
          <Withdraw symbol={symbol} />{" "}
        </Box>
      );
      break;
    case 3:
      content = (
        <Typography variant="body1">
          Swapping functionality will come soon!
        </Typography>
      );
      break;
    default:
      content = <Box></Box>;
      break;
  }

  return <Box>{content}</Box>;
};

export default Actions;
