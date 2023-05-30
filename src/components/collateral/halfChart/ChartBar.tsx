import React from "react";

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
//import { linearGradientDef } from "@nivo/core";

interface ChartBarProps {
  barValue: number;
}

const ChartBar: React.FC<ChartBarProps> = ({ barValue }) => (
  <ResponsivePie
    data={[
      {
        id: "barGradient",
        label: "Bitcoin BTC",
        value: 100,
      },
    ]}
    // margin={{ top: 0, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.88}
    padAngle={4}
    activeOuterRadiusOffset={8}
    isInteractive={false}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#ffffff"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    enableArcLinkLabels={false}
    enableArcLabels={false}
    startAngle={-90}
    endAngle={barValue}
    defs={[
      // using helpers
      // will inherit colors from current element

      // using plain object
      {
        id: "barGradient",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#23EAE0" },

          { offset: 100, color: "black" },
        ],
      },
    ]}
    // 2. defining rules to apply those gradients
    fill={[{ match: "*", id: "barGradient" }]}
  />
);

export default ChartBar;
