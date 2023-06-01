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
        id: "BTC",
        label: "Bitcoin BTC",
        value: 482,
        color: "hsl(223, 70%, 50%)",
      },
      {
        id: "ETH",
        label: "Ethereum ETH",
        value: 229,
        color: "hsl(46, 70%, 50%)",
      },
      {
        id: "SHIB",
        label: "Shiba Inu SHIB",
        value: 531,
        color: "hsl(299, 70%, 50%)",
      },
      {
        id: "MATIC",
        label: "Polygon MATIC",
        value: 192,
        color: "hsl(338, 70%, 50%)",
      },
      {
        id: "USDC",
        label: "USD Coin USDC",
        value: 91,
        color: "hsl(304, 70%, 50%)",
      },
    ]}
    margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.82}
    padAngle={4}
    cornerRadius={45}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    // colors={[
    //   "hsl(55, 70%, 50%)",
    //   "hsl(46, 70%, 50%)",
    //   "hsl(299, 70%, 50%)",
    //   "hsl(338, 70%, 50%)",
    //   "hsl(304, 70%, 50%)",
    // ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    //empty values
    valueFormat={(value) => ``}
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
      linearGradientDef("forBTC", [
        { offset: 0, color: "#FF3530" },
        { offset: 100, color: "#FFED4D" },
      ]),
      linearGradientDef(
        "forMATIC",
        [
          { offset: 0, color: "#DDADFF" },
          { offset: 100, color: "#8800DB" },
        ],

        // you may specify transforms for your gradients, e.g. rotations and skews,
        // following the transform attribute format.
        // For instance here we rotate 90 degrees relative to the center of the object.
        {
          gradientTransform: "rotate(90 0.5 0.5)",
        }
      ),
      linearGradientDef(
        "forSHIB",
        [
          { offset: 0, color: "#FFC49D" },
          { offset: 100, color: "#FF3DEC" },
        ]

        // you may specify transforms for your gradients, e.g. rotations and skews,
        // following the transform attribute format.
        // For instance here we rotate 90 degrees relative to the center of the object.
      ),
      linearGradientDef("forETH", [
        { offset: 0, color: "#007DF1" },
        { offset: 100, color: "#ABFF73" },
      ]),
      linearGradientDef("forUSDC", [
        { offset: 0, color: "#FFCD1D" },
        { offset: 100, color: "#52FF78" },
      ]),
      // using plain object
      // {
      //   id: "gradientC",
      //   type: "linearGradient",
      //   colors: [
      //     { offset: 0, color: "#77135d" },
      //     { offset: 100, color: "#e4b400" },
      //   ],
      // },
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

export default FullChart;
