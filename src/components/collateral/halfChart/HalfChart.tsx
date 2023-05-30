// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { linearGradientDef } from "@nivo/core";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const HalfChart = () => (
  <ResponsivePie
    data={[
      {
        id: "BTC",
        label: "Bitcoin BTC",
        value: 100,
      },
      {
        id: "MATIC",
        label: "Polygon MATIC",
        value: 100,
      },
      {
        id: "SHIB",
        label: "Shiba Inu SHIB",
        value: 100,
      },
      {
        id: "ETH",
        label: "Ethereum ETH",
        value: 100,
      },

      {
        id: "USDC",
        label: "USD Coin USDC",
        value: 100,
      },
    ]}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    startAngle={-90}
    endAngle={90}
    innerRadius={0.9}
    padAngle={1}
    cornerRadius={45}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    enableArcLinkLabels={false}
    enableArcLabels={false}
    isInteractive={false}
    defs={[
      // using helpers
      // will inherit colors from current element
      linearGradientDef("forBTC", [
        { offset: 0, color: "#7AFA3D" },
        { offset: 100, color: "#7AFA3D" },
      ]),
      linearGradientDef(
        "forMATIC",
        [
          { offset: 0, color: "#fe8534" },
          { offset: 100, color: "#7bfe34" },
        ],

        // you may specify transforms for your gradients, e.g. rotations and skews,
        // following the transform attribute format.
        // For instance here we rotate 90 degrees relative to the center of the object.
        {
          gradientTransform: "rotate(90 0.5 0.5)",
        }
      ),
      //   linearGradientDef(
      //     "forSHIB",
      //     [
      //       { offset: 0, color: "#E71836" },
      //       { offset: 100, color: "#FE6434" },
      //     ]

      //     // you may specify transforms for your gradients, e.g. rotations and skews,
      //     // following the transform attribute format.
      //     // For instance here we rotate 90 degrees relative to the center of the object.
      //   ),
      //   linearGradientDef("forETH", [
      //     { offset: 0, color: "#007DF1" },
      //     { offset: 100, color: "#ABFF73" },
      //   ]),
      //   linearGradientDef("forUSDC", [
      //     { offset: 0, color: "#FFCD1D" },
      //     { offset: 100, color: "#52FF78" },
      //   ]),
      // using plain object
      {
        id: "gradientC",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#7AFA3D" },
          { offset: 25, color: "#FE9534" },
          { offset: 50, color: "#FE6434" },
          { offset: 100, color: "#E71836" },
        ],
      },
    ]}
    // 2. defining rules to apply those gradients
    fill={[
      // match using object query
      { match: { id: "BTC" }, id: "forBTC" },
      { match: { id: "MATIC" }, id: "forMATIC" },
      { match: { id: "SHIB" }, id: "forSHIB" },
      { match: { id: "ETH" }, id: "forETH" },
      // match using function
      { match: (d) => d.id === "vue", id: "gradientB" },
      // match all, will only affect 'elm', because once a rule match,
      // others are skipped, so now it acts as a fallback
      { match: "*", id: "gradientC" },
    ]}
  />
);

export default HalfChart;
