import React, { useEffect, useState } from "react";
import { useVaultIdStore } from "../store/Store";
import { Box } from "@mui/material";

const Collateral = () => {
  const { vault, getVaultID } = useVaultIdStore();
  const [activeElement, setActiveElement] = useState(null);

  const handleClick = (element: any) => {
    setActiveElement(element);
  };

  useEffect(() => {
    console.log(vault + "my vault update");
  }, []);
  return (
    <Box
      sx={{
        margin: "3% 9%",
        padding: "3%",
        // marginTop: "50px",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        background: "rgba(255, 255, 255, 0.07)",
        height: "100vh",
      }}
    >
      {/* divide into 2 columns */}
      {/*  column 1 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
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
            }}
            className={activeElement === 1 ? "glowingCard" : ""}
            onClick={() => handleClick(1)}
          >
            Collateral
          </Box>
          <Box
            sx={{
              margin: "2px",
              padding: "5px",

              cursor: "pointer",
            }}
            className={activeElement === 2 ? "glowingCard" : ""}
            onClick={() => handleClick(2)}
          >
            Debt
          </Box>
        </Box>
      </Box>
      {/*  column 2 */}
      <Box></Box>
    </Box>
  );
};

export default Collateral;
