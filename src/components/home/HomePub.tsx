import { useLayoutEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";

import {
  usePositionStore,
} from "../../store/Store.ts";

import LoginCard from "../LoginCard.tsx";

const HomePub = () => {

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
          <LoginCard />
        </Box>
      </Grid>
    </Box>
  );
};

export default HomePub;