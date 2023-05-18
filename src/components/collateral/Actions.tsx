import { Box, Typography } from "@mui/material";
import React from "react";
import Deposit from "./actions/Deposit";

interface ActionsProps {
  activeElement: number;
  //1 = deposit, 2 = withdraw, 3 = swap, 4 = borrow 5 = pay down
}

const Actions: React.FC<ActionsProps> = ({ activeElement }) => {
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
      content = <Box>Number is 2</Box>;
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
