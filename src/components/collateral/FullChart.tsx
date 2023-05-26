import React from "react";

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { linearGradientDef } from "@nivo/core";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const FullChart = () => (
  <ResponsivePie
    data={[
      {
        id: "ruby",
        label: "ruby",
        value: 482,
        color: "hsl(223, 70%, 50%)",
      },
      {
        id: "react",
        label: "stylus",
        value: 229,
        color: "hsl(46, 70%, 50%)",
      },
      {
        id: "scala",
        label: "scala",
        value: 531,
        color: "hsl(299, 70%, 50%)",
      },
      {
        id: "hack",
        label: "hack",
        value: 192,
        color: "hsl(338, 70%, 50%)",
      },
      {
        id: "sass",
        label: "sass",
        value: 91,
        color: "hsl(304, 70%, 50%)",
      },
    ]}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.9}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    colors={[
      "hsl(55, 70%, 50%)",
      "hsl(46, 70%, 50%)",
      "hsl(299, 70%, 50%)",
      "hsl(338, 70%, 50%)",
      "hsl(304, 70%, 50%)",
    ]}
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
    defs={[
      // using helpers
      // will inherit colors from current element
      linearGradientDef("gradientA", [
        { offset: 0, color: "inherit" },
        { offset: 100, color: "inherit", opacity: 0 },
      ]),
      linearGradientDef(
        "gradientB",
        [
          { offset: 0, color: "#3ac717" },
          { offset: 100, color: "inherit" },
        ],
        // you may specify transforms for your gradients, e.g. rotations and skews,
        // following the transform attribute format.
        // For instance here we rotate 90 degrees relative to the center of the object.
        {
          gradientTransform: "rotate(90 0.5 0.5)",
        }
      ),
      // using plain object
      {
        id: "gradientC",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#77135d" },
          { offset: 100, color: "#e4b400" },
        ],
      },
      {
        id: "gradientC",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#131377" },
          { offset: 100, color: "#e40081" },
        ],
      },
    ]}
    // 2. defining rules to apply those gradients
    fill={[
      // match using object query
      { match: { id: "react" }, id: "gradientA" },
      // match using function
      { match: (d) => d.id === "vue", id: "gradientB" },
      // match all, will only affect 'elm', because once a rule match,
      // others are skipped, so now it acts as a fallback
      { match: "*", id: "gradientC" },
    ]}
  />
);

export default FullChart;
