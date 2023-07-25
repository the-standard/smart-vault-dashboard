/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";

interface ProgressBarProps {
  progressValue: any;
  greyBarValue?: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressValue,
  greyBarValue,
}) => {
  const [percentage, setPercentage] = useState(progressValue);
  const [percentageCalculate, setPercentageCalculate] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarGreyRef = useRef<HTMLDivElement>(null);
  const percentageDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateProgressBar();
    run();
  }, [percentage]);

  useEffect(() => {
    // perform your side effect here
    updateProgressBar();
    run();
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
    // eslint-disable-next-line prefer-const
    let timer;

    const runInterval = () => {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - remaining * range);
      if (percentageDivRef.current) {
        percentageDivRef.current.innerHTML = `${value}%`;
      }
      if (value === end) {
        clearInterval(timer);
      }
    };

    timer = setInterval(runInterval, stepTime);
    runInterval();
  };

  useEffect(() => {
    const calcPercentage = greyBarValue;

    setPercentageCalculate(calcPercentage);
    if (progressBarGreyRef.current) {
      progressBarGreyRef.current.style.width = "1px";
      progressBarGreyRef.current.style.left = `${percentage}%`;
      progressBarGreyRef.current.style.display = "block";

      // Animate the grey bar to the left or right based on the user's input
      if (calcPercentage <= 0) {
        progressBarGreyRef.current.style.display = "none";
        if (percentageDivRef.current) {
          percentageDivRef.current.innerHTML = `${percentage}%`;
        }
      } else if (calcPercentage < percentage) {
        setTimeout(function () {
          progressBarGreyRef.current.style.width = `${
            percentage - calcPercentage
          }%`;
          progressBarGreyRef.current.style.left = `${calcPercentage}%`;
          if (percentageDivRef.current) {
            percentageDivRef.current.innerHTML = `${calcPercentage}%`;
          }
        }, 100); // Delay to allow the grey bar to reset before animating
      } else {
        setTimeout(function () {
          progressBarGreyRef.current.style.width = `${
            calcPercentage - percentage
          }%`;
          progressBarGreyRef.current.style.left = `${percentage}%`;
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
        <div className="percentage" id="percentage" ref={percentageDivRef}>
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
