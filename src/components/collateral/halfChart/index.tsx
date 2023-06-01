import HalfChart from "./HalfChart";
// import ChartBar from "./ChartBar";
import { Box, Typography } from "@mui/material";
// import ReactSpeedometer from "react-d3-speedometer";
import GradientSVG from "./GradientSvg";

import {
  CircularProgressbar,
  // CircularProgressbarWithChildren,
  // buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "react-circular-progressbar/dist/styles.css";

const conditionBarText = (barValue: number) => {
  if (barValue <= 10) {
    return "Very Low";
  } else if (barValue <= 20) {
    return "Low";
  } else if (barValue <= 30) {
    return "Medium";
  } else if (barValue <= 40) {
    return "High";
  } else if (barValue <= 50) {
    return "Very High";
  } else {
    return "Very High";
  }
};

const index = () => {
  // when it gets to 100 the color should turn more red
  const barValue = 100;
  const idCSS = "gradientProgress";
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
          top: "21%",
          left: "12%",
        }}
      >
        <CircularProgressbar
          value={barValue}
          //  text={`${barValue}%`}

          circleRatio={0.5}
          // styles={buildStyles({
          //   rotation: 0.25 * 3,

          //   strokeLinecap: "butt",
          //   trailColor: "rgba(30, 29, 29, 0.9)",
          //   pathColor: " hsl(180, 46.058091286307054%, 52.74509803921569%)",
          //   textSize: "14px",
          // })}
          styles={{
            path: {
              stroke: `url(#${idCSS})`,
              height: "100%",
              transform: "rotate(0.75turn)",
              transformOrigin: "center center",
            },
            trail: {
              stroke: "rgba(30, 29, 29, 0.9)",
              transform: "rotate(0.75turn)",
              transformOrigin: "center center",
            },
            // text: {
            //   //make this transparent
            //   fill: "white",
            //   fontSize: "1rem",

            //   position: "relative",
            //   top: "20%",
            //   left: "50%",
            // },
          }}
        />
        <GradientSVG />
        <Typography
          variant="h4"
          sx={{
            position: "relative",
            top: "-100%",
            left: "40%",
            //  transform: "translate(-50%, -50%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {barValue}%
        </Typography>
        <Typography
          variant="body1"
          sx={{
            position: "relative",
            top: "-100%",
            left: "40%",
            //  transform: "translate(-50%, -50%)",
          }}
        >
          {conditionBarText(barValue)}
        </Typography>
      </Box>
    </Box>
  );
};

export default index;
