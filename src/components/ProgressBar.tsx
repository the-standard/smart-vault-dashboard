import React from "react";
import "../styles/progressBarStyle.css";
import { Box } from "@mui/material";

interface ProgressBarProps {
  progressValue: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressValue }) => {
  // const progressBar = document.getElementById("progress-bar");
  // const percentageDiv = document.getElementById("percentage");
  console.log(progressValue);

  // Set the percentage value
  const percentage = progressValue;

  // Calculate the color
  let hue;
  if (percentage <= 50) {
    // linear interpolation between green (120) and orange (39)
    hue = 120 - (percentage / 50) * (120 - 39);
  } else {
    // linear interpolation between orange (39) and red (0)
    hue = 39 - ((percentage - 50) / 50) * 39;
  }

  // if (progressBar != null) {
  //   // Set the color and width of the progress bar
  //   progressBar.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.6)`;
  //   progressBar.style.width = `${percentage}%`;
  // }

  // Animate the number
  const start = 0;
  const end = percentage;
  const duration = 1000;
  const range = end - start;
  // const minTimer = 50;
  // let stepTime = Math.abs(Math.floor(duration / range));

  // // Clamp the timer to our minimum
  // stepTime = Math.max(stepTime, minTimer);

  const startTime = new Date().getTime();
  const endTime = startTime + duration;
  // eslint-disable-next-line prefer-const
  let timer: string | number | NodeJS.Timeout | undefined;

  const now = new Date().getTime();
  const remaining = Math.max((endTime - now) / duration, 0);
  const value = Math.round(end - remaining * range);
  // percentageDiv.innerHTML = `${value}%`;
  if (value === end) {
    clearInterval(timer);
  }

  // timer = setInterval(run, stepTime);

  return (
    <Box
      sx={{
        minWidth: "150px",
      }}
    >
      <Box className="progress-container">
        <Box
          className="progress-bar"
          id="progress-bar"
          sx={{
            backgroundColor: `hsla(${hue}, 100%, 50%, 0.6)`,
            width: `${percentage}%`,
          }}
        ></Box>
        <Box className="percentage" id="percentage">
          {percentage}%
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressBar;
