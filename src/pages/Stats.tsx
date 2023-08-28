import { Box, Typography } from "@mui/material";
import statsbg from "../assets/statsbg.png";
import { usePositionStore } from "../store/Store.ts";
import { useLayoutEffect, useRef } from "react";

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
    <Box
      sx={{
        color: "#f1fbfa",
        margin: { xs: "0", sm: "3% 12%" },
        padding: "1%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        minHeight: "100vh",
        height: "100%",
      }}
      ref={rectangleRef}
    >
      <Box
        sx={{
          backgroundImage: `url(${statsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          mixBlendMode: "screen",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(13.9px)",
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
          Statistics and Epic data dashboard
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
          COMING SOON!
        </Typography>
      </Box>
    </Box>
  );
};

export default Stats;
