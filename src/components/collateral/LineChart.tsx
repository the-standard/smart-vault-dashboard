import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface LineChartProps {
  data: { x: number; y: number }[];
  symbol: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, symbol }) => {
  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(220);
  const [lineColor, setLineColor] = useState("green");

  const convertedData = data.map(({ y, x }) => [y, x]);
  console.log(data);
  console.log(convertedData);
  const series = [
    {
      //symbol should come here
      name: symbol,
      data: convertedData,
    },
  ];

  const renderColor = () => {
    //if the last element is greater than the second to last element, set lineColor to green
    if (
      Number(convertedData[convertedData.length - 1][1]) >
      Number(convertedData[convertedData.length - 2][1])
    ) {
      setLineColor("green");
    } else if (
      Number(convertedData[convertedData.length - 1][1]) <
      Number(convertedData[convertedData.length - 2][1])
    ) {
      setLineColor("red");
    }
  };

  useEffect(() => {
    renderColor();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        setChartWidth(250);
        setChartHeight(120);
      } else if (window.matchMedia("(max-width: 1200px)").matches) {
        setChartWidth(400);
        setChartHeight(150);
      } else {
        setChartWidth(350);
        setChartHeight(220);
      }
    };

    handleResize(); // Set initial dimensions

    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

  if (!data || data.length === 0) {
    return null; // or render a loading state or placeholder
  }

  return (
    <div id="chart">
      <ReactApexChart
        options={{
          chart: {
            type: "area",
            stacked: false,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          // markers: {
          //   size: 0,
          // },
          title: {
            text: "Last 7 days",
            align: "left",
            style: {
              color: "#fff",
            },
          },

          colors: [lineColor],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100],
            },
          },
          grid: {
            show: false,
          },
          yaxis: {
            show: true,
            labels: {
              show: false,
            },
            // title: {
            //   text: "Price",
            // },
          },
          stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            colors: undefined,
            width: 2,
            dashArray: 0,
          },
          xaxis: {
            type: "datetime",
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return (val / 1000000).toFixed(0);
              },
            },
          },
        }}
        series={series}
        type="area"
        height={chartHeight}
        width={chartWidth}
      />
    </div>
  );
};

export default LineChart;
