import React, { FC, useEffect, useState } from "react";
import { VictoryChart, VictoryLine } from "victory";
import priceFeed from "../../feed/priceFeed";

interface LineChartProps {
  data: { x: number; y: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [lineColor, setLineColor] = useState("green");
  console.log(data[data.length - 1].x);

  const renderColor = () => {
    //if the last element is greater than the second to last element, set lineColor to green
    if (Number(data[data.length - 1].x) > Number(data[data.length - 2].x)) {
      setLineColor("green");
    } else if (
      Number(data[data.length - 1].x) < Number(data[data.length - 2].x)
    ) {
      setLineColor("red");
    }
  };

  useEffect(() => {
    renderColor();
  }, []);

  return (
    <VictoryLine
      data={data}
      style={{
        data: { stroke: lineColor },
      }}
    />
  );
};

export default LineChart;
