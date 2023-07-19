// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
// import { linearGradientDef } from "@nivo/core";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
interface fullChartProps {
  fullChartData: [];
}
const FullChart: React.FC<fullChartProps> = ({ fullChartData }) => (
  <ResponsivePie
    data={fullChartData}
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
    valueFormat={() => ``}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#ffffff"
    arcLinkLabelsThickness={2}
    arcLinkLabelsOffset={0}
    arcLinkLabelsStraightLength={0}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLinkLabelsDiagonalLength={5}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    //disable ts error
    tooltip={({ datum: { id, value, label } }) => (
      <div
        style={{
          background:
            "linear-gradient(110.28deg, rgba(85, 74, 74, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",

          borderRadius: "10px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(13.9px)",
          WebkitBackdropFilter: "blur(13.9px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#199384",
          padding: "25px",
          fontSize: "1rem",
          fontFamily: "Poppins",
          height: "100px",
          width: "auto",
        }}
      >
        <strong>
          {value} € <br />
          {label} {id}
        </strong>
      </div>
    )}
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
