/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState, useCallback } from "react";
import "../styles/progressBarStyle.css";
import { useGreyProgressBarValuesStore } from "../store/Store";

interface ProgressBarProps {
  progressValue: any;
  greyBarValue?: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressValue,
  greyBarValue,
}) => {
  const [percentage, setPercentage] = useState(30);
  const [percentageCalculate, setPercentageCalculate] = useState(0);
  let timer;

  const {
    getGreyBarUserInput,
    getSymbolForGreyBar,
    userInputForGreyBarOperation,
  } = useGreyProgressBarValuesStore();

  useEffect(() => {
    console.log(userInputForGreyBarOperation);
    if (userInputForGreyBarOperation) {
      setPercentageCalculate(userInputForGreyBarOperation);
    }
  }, [userInputForGreyBarOperation]);

  const updateProgressBar = useCallback(() => {
    let hue;
    if (percentage <= 50) {
      hue = 120 - (percentage / 50) * (120 - 39);
    } else {
      hue = 39 - ((percentage - 50) / 50) * 39;
    }
    document.getElementById(
      "progress-bar"
    ).style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.6)`;
    document.getElementById("progress-bar").style.width = `${percentage}%`;
  }, [percentage]);

  const handlePercentageChange = useCallback(() => {
    // Reset the grey bar to a thin line at the current percentage position
    document.getElementById("progress-bar-grey").style.width = "1px";
    document.getElementById("progress-bar-grey").style.left = `${percentage}%`;
    document.getElementById("progress-bar-grey").style.display = "block";

    // Animate the grey bar to the left or right based on the user's input
    if (percentageCalculate <= 0) {
      document.getElementById("progress-bar-grey").style.display = "none";
      document.getElementById("percentage").innerHTML = `${percentage}%`;
    } else if (percentageCalculate < percentage) {
      setTimeout(function () {
        document.getElementById("progress-bar-grey").style.width = `${
          percentage - percentageCalculate
        }%`;
        document.getElementById(
          "progress-bar-grey"
        ).style.left = `${percentageCalculate}%`;
        document.getElementById(
          "percentage"
        ).innerHTML = `${percentageCalculate}%`;
      }, 100); // Delay to allow the grey bar to reset before animating
    } else {
      setTimeout(function () {
        document.getElementById("progress-bar-grey").style.width = `${
          percentageCalculate - percentage
        }%`;
        document.getElementById(
          "progress-bar-grey"
        ).style.left = `${percentage}%`;
        document.getElementById(
          "percentage"
        ).innerHTML = `${percentageCalculate}%`;
      }, 100); // Delay to allow the grey bar to reset before animating
    }

    // Make the grey bar pulse red and turn red if it goes above 80%
    if (percentageCalculate > 80) {
      document
        .getElementById("progress-bar-grey")
        .classList.add("pulse-red", "red-bar");
    } else {
      document
        .getElementById("progress-bar-grey")
        .classList.remove("pulse-red", "red-bar");
    }
  }, [percentage, percentageCalculate]);

  // Animate the number
  const start = 0;
  const end = percentage;
  const duration = 1000;
  const range = end - start;
  const minTimer = 50;
  let stepTime = Math.abs(Math.floor(duration / range));

  // Clamp the timer to our minimum
  stepTime = Math.max(stepTime, minTimer);

  const startTime = new Date().getTime();
  const endTime = startTime + duration;

  const run = useCallback(() => {
    const now = new Date().getTime();
    const remaining = Math.max((endTime - now) / duration, 0);
    const value = Math.round(end - remaining * range);
    document.getElementById("percentage").innerHTML = `${value}%`;
    if (value === end) {
      clearInterval(timer);
    }
  }, [end, endTime, duration, range]);

  useEffect(() => {
    updateProgressBar();
    run();
    timer = setInterval(run, stepTime);
    return () => clearInterval(timer);
  }, [updateProgressBar, run, stepTime]);

  useEffect(() => {
    handlePercentageChange();
  }, [percentageCalculate, handlePercentageChange]);

  return (
    <div>
      <div className="progress-container">
        <div className="progress-bar" id="progress-bar"></div>
        <div className="progress-bar-grey" id="progress-bar-grey"></div>
        <div className="percentage" id="percentage">
          0%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
