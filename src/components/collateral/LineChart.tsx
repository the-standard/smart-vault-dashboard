import React, { FC } from "react";
import { VictoryChart, VictoryLine } from "victory";
import priceFeed from "../../feed/priceFeed";

interface LineChartProps {
  data: { x: number; y: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <VictoryLine
      data={data}
      style={{
        data: { stroke: "red" },
      }}
    />
  );
};

export default LineChart;
