import { Box } from "@mui/material";
import { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Group A", value: 100 },
  { name: "Group B", value: 100 },
  { name: "Group C", value: 100 },
  { name: "Group D", value: 100 },
  { name: "Group E", value: 100 },
];

const data2 = [{ name: "Group A", value: 100 }];
const COLORS = ["#7AFA3D", "#FF7A00", "#FE6434", "#E71836", "#E71836"];

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

  render() {
    return (
      <Box
        sx={{
          height: "auto",
          display: "flex",
          justifyContent: "center",
          width: "auto",
        }}
      >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                filter={`url(#glow-${index})`}
              />
            ))}
          </Pie>{" "}
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={110}
            fill="#82ca9d"
          />
          <Pie
            data={data2}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={119}
            outerRadius={120}
            fill="#ad3f00"
            paddingAngle={5}
            dataKey="value"
          ></Pie>
          {data.map((_, index) => (
            <defs key={`def-${index}`}>
              <filter
                id={`glow-${index}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="4"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          ))}
        </PieChart>
      </Box>
    );
  }
}
