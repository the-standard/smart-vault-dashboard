import { Box, Typography } from "@mui/material";
import statsbg from "../assets/statsbg.png";
import { usePositionStore } from "../store/Store.ts";
import { useLayoutEffect, useRef } from "react";

import Card from "../components/Card";

const Stats = () => {
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
    <Card
      sx={{
        margin: {
          xs: "0% 4%",
          sm: "3% 6%",
          md: "3% 12%",
        },      
        padding: "1%",
        minHeight: "100vh",
        height: "100%",
        position: "relative",
      }}
      ref={rectangleRef}
    >
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          '&:before': {
            content: '""',
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            opacity: "0.3",
            backgroundImage: `url(${statsbg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(1.5) saturate(1.3)",
            zIndex: "-1",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              md: "1.2rem",
              lg: "2.5rem",
            },
            textAlign: "center",
          }}
          variant="h4"
        >
          Statistics and Epic Data Dashboard
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "3rem",
              md: "4rem",
              lg: "5rem",
            },
          }}
          variant="h1"
        >
          COMING SOON
        </Typography>
      </Box>
    </Card>
  );
};

export default Stats;
