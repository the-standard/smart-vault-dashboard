import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(220);
  const series = [
    {
      name: "XYZ MOTORS",
      data: [
        [1622198400000, 10],
        [1622284800000, 15],
        [1622371200000, 8],
        [1622457600000, 12],
        [1622544000000, 6],
        [1622630400000, 10],
        [1622716800000, 14],
        [1622803200000, 18],
        [1622889600000, 12],
        [1622976000000, 9],
        [1623062400000, 16],
        [1623148800000, 13],
        [1623235200000, 11],
      ],
    },
  ];

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

  return (
    <div id="chart">
      <ReactApexChart
        options={{
          chart: {
            type: "area",
            stacked: false,
            //   height: 350,
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: "zoom",
            },
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
          },
          title: {
            text: "Stock Price Movement",
            align: "left",
          },
          colors: ["#F44336", "#E91E63", "#9C27B0"],
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
              formatter: function (val) {
                return (val / 1000000).toFixed(0);
              },
            },
            title: {
              text: "Price",
            },
          },
          xaxis: {
            type: "datetime",
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

export default ApexChart;
