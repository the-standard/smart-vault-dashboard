import React from "react";
import HalfChart from "./HalfChart";
// import ChartBar from "./ChartBar";
import { Box } from "@mui/material";
import ReactSpeedometer from "react-d3-speedometer";

const index = () => {
  const barValue = 20;
  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
        width: "400px",
      }}
    >
      <Box
        sx={{
          width: "20rem",
          height: "10rem",
          backgroundColor: "rgba(30, 29, 29, 0.9)",
          borderRadius: "10rem 10rem 0 0",
          borderTop: "1px solid #5C5C5C",
          position: "absolute",
          top: "20%",
          left: "10.5%",
          zIndex: 0,
        }}
      ></Box>
      <Box
        sx={{
          width: "16rem",
          height: "8rem",
          backgroundColor: "rgba(18, 18, 18, 0.8)",
          borderRadius: "8rem 8rem 0 0",
          borderTop: "1px solid #23EAE0",
          position: "absolute",
          top: "27%",
          left: "18.2%",
          zIndex: 0,
        }}
      ></Box>
      <Box
        sx={{
          width: "12rem",
          height: "6rem",
          backgroundColor: "rgba(18, 18, 18, 0.6)",
          borderRadius: "6rem 6rem 0 0",
          borderTop: "1px solid #23EAE0",
          position: "absolute",
          top: "35%",
          left: "26%",
          zIndex: 0,
        }}
      ></Box>
      <HalfChart />
      <Box
        sx={{
          height: "250px",
          width: "308px",
          position: "absolute",
          top: "15.5%",
          right: "0%",
          left: "6%",
        }}
      >
        <ReactSpeedometer
          ringWidth={27}
          width={355}
          maxValue={100}
          startColor="black"
          endColor="#23EAE0"
          value={barValue}
        />{" "}
      </Box>
    </Box>
  );
};

export default index;
