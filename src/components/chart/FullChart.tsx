// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
// import { linearGradientDef } from "@nivo/core";

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
    margin={{ top: 40, right: 0, bottom: 40, left: 0 }}
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    valueFormat={() => ``}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#ffffff"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLinkLabelsDiagonalLength={5}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "gradientC",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#ffffff" },
          { offset: 100, color: "#14e0e7" },
        ],
      },
    ]}
    // 2. defining rules to apply those gradients
    fill={[
      // match using function
      { match: (d) => d.id === "vue", id: "gradientB" },
      // match all, will only affect 'elm', because once a rule match,
      // others are skipped, so now it acts as a fallback
      { match: "*", id: "gradientC" },
    ]}
  />
);

export default FullChart;
