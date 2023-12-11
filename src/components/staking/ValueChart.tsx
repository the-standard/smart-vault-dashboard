import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from 'moment';

interface ValueChartProps {
  chartData: Array<any>;
}

const ValueChart: React.FC<ValueChartProps> = ({ chartData }) => {
  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(220);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const useData: Array<any> = [];
    chartData.forEach((snapshot: any) => {
      snapshot.assets.forEach((asset: any) => {
        const timestamp = moment(snapshot.snapshot_at).unix() || '';
        if (!useData.find(section => section.name === asset[0])) {
          useData.push({name: asset[0], data: []});
        }
        useData.find(section => section.name === asset[0]).data.push([
          timestamp, asset[2], asset[1]
        ]);
      });
    });
    setData(useData);
  }, [chartData]);

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

  // if (!data || data.length === 0) {
  //   return null; // or render a loading state or placeholder
  // }

  const colours = ['#b84644', '#4576b5', '#008FFB', '#00E396', '#CED4DC', '#008FFB', '#00E396', '#CED4DC'];

  return (
    <div id="chart">
      <ReactApexChart
        options={{
          chart: {
            type: "area",
            stacked: true,
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
          title: {
            text: "Asset Values (USD)",
            align: "left",
            style: {
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: 300,
            },
          },
          colors: colours,
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
              show: true,
            },
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
            type: "category",
            labels: {
              show: true,
              formatter: function(value) {
                return (
                  moment.unix(Number(value)).format('DD MMM')
                );
              }
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          tooltip: {
            enabled: true,
            shared: false,
            x: {
              show: true,
              formatter: function (
                value,
                {
                  seriesIndex, w
                }
              ) {
                const title = w.config.series[seriesIndex].name || '' || value;
                return (
                  title
                );
              }
            },
            y: {
              title: {
                formatter: () =>  {
                  return (
                    'Value (USD): '
                  )
                }
              },
              formatter: function (value:number) {
                return value.toString();
              },
            },
            z: {
              title: 'Token Amount: ',
            },
          },
        }}
        series={data}
        type="area"
        height={chartHeight}
        width={chartWidth}
      />
    </div>
  );
};

export default ValueChart;
