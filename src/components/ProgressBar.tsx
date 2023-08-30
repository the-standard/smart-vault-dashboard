/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

interface ProgressBarProps {
  progressValue: any;
  greyBarValue?: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressValue,
  greyBarValue = 0,
}) => {
  const [percentage, setPercentage] = useState(progressValue);
  const [percentageCalculate, setPercentageCalculate] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarGreyRef = useRef<HTMLDivElement>(null);
  const percentageDivRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   updateProgressBar();
  //   run();
  // }, [percentage]);

  useEffect(() => {
    updateProgressBar();
    const timer = run(); // capture the returned timer

    return () => {
      clearInterval(timer); // clear the timer when progressValue changes or component unmounts
    };
  }, [progressValue]);

  const updateProgressBar = () => {
    let hue;
    if (progressValue <= 50) {
      hue = 120 - (progressValue / 50) * (120 - 39);
    } else {
      hue = 39 - ((progressValue - 50) / 50) * 39;
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.6)`;
      progressBarRef.current.style.width = `${progressValue}%`;
    }
  };

  const run = () => {
    const start = 0;
    const end = progressValue;
    const duration = 1000;
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));

    // Clamp the timer to our minimum
    stepTime = Math.max(stepTime, minTimer);

    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    let timer;

    const runInterval = () => {
      let now = new Date().getTime();
      let remaining = Math.max((endTime - now) / duration, 0);
      let value = Math.round(end - remaining * range);
      if (value === end) {
        clearInterval(timer);
      }
    };

    timer = setInterval(runInterval, stepTime);
    runInterval();

    return timer; // return the timer from the run function
  };

  useEffect(() => {
    let calcPercentage = greyBarValue;

    setPercentageCalculate(calcPercentage);
    if (progressBarGreyRef.current) {
      progressBarGreyRef.current.style.width = "1px";
      progressBarGreyRef.current.style.left = `${progressValue}%`;
      progressBarGreyRef.current.style.display = "block";

      // Animate the grey bar to the left or right based on the user's input
      if (calcPercentage <= 0) {
        progressBarGreyRef.current.style.display = "none";
        if (percentageDivRef.current) {
          percentageDivRef.current.innerHTML = `${progressValue}%`;
        }
      } else if (calcPercentage <= progressValue) {
        setTimeout(function () {
          progressBarGreyRef.current.style.width = `${
            progressValue - calcPercentage
          }%`;
          progressBarGreyRef.current.style.left = `${calcPercentage}%`;
          if (percentageDivRef.current) {
            percentageDivRef.current.innerHTML = `${calcPercentage}%`;
          }
        }, 100); // Delay to allow the grey bar to reset before animating
      } else {
        setTimeout(function () {
          progressBarGreyRef.current.style.width = `${
            calcPercentage - progressValue
          }%`;
          progressBarGreyRef.current.style.left = `${progressValue}%`;
          if (percentageDivRef.current) {
            percentageDivRef.current.innerHTML = `${calcPercentage}%`;
          }
        }, 100); // Delay to allow the grey bar to reset before animating
      }

      // Make the grey bar pulse red and turn red if it goes above 80%
      if (calcPercentage > 80) {
        progressBarGreyRef.current.classList.add("pulse-red", "red-bar");
      } else {
        progressBarGreyRef.current.classList.remove("pulse-red", "red-bar");
      }
    }
  }, [greyBarValue]);

  return (
    <div>
      <div className="progress-container">
        <div
          className="progress-bar"
          id="progress-bar"
          ref={progressBarRef}
        ></div>
        <div
          className="progress-bar-grey"
          id="progress-bar-grey"
          ref={progressBarGreyRef}
        ></div>
        <Box
          sx={{
            fontSize: {
              xs: "0.8rem",
              md: "1rem",
            },
          }}
          className="percentage"
          id="percentage"
          ref={percentageDivRef}
        >
          {progressValue}%
        </Box>
      </div>
    </div>
  );
};

export default ProgressBar;
