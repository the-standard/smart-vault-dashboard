// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = () => (
  <ResponsiveLine
    data={[
      {
        id: "norway",
        color: "hsl(16, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 113,
          },
          {
            x: "helicopter",
            y: 132,
          },
          {
            x: "boat",
            y: 72,
          },
          {
            x: "train",
            y: 221,
          },
          {
            x: "subway",
            y: 246,
          },
          {
            x: "bus",
            y: 255,
          },
          {
            x: "car",
            y: 93,
          },
          {
            x: "moto",
            y: 174,
          },
          {
            x: "bicycle",
            y: 278,
          },
          {
            x: "horse",
            y: 240,
          },
          {
            x: "skateboard",
            y: 78,
          },
          {
            x: "others",
            y: 111,
          },
        ],
      },
    ]}
    //margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    enablePoints={false}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableArea={true}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 105,
        translateY: 9,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default LineChart;
