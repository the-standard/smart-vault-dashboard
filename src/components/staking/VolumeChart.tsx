import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import moment from 'moment';

interface VolumeChartProps {
  chartData: Array<any>;
}

const VolumeChart: React.FC<VolumeChartProps> = ({ chartData }) => {
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
          timestamp, asset[1], asset[2]
        ]);
      });
    });
    setData(useData);
  }, [chartData]);

  const colours = ['#8b4df9', '#f8e223', '#008FFB', '#00E396', '#e91e63', '#008FFB', '#00E396', '#CED4DC'];

  return (
    <Box sx={{
      // maxHeight: "400px"
    }}>
      <ReactApexChart
        options={{
          chart: {
            type: "area",
            stacked: false,
            foreColor: 'rgba(255,255,255,0.8)',
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          noData: {
            text: 'No Data',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: -20,
            style: {
              color: 'white',
              fontSize: '14px',
              // fontFamily: undefined
            }
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            // text: "Assets",
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
            padding: {
              left: -10,
            }
          },
          yaxis: {
            show: true,
            labels: {
              show: true,
              offsetX: -15,
              formatter: function(value) {
                return (
                  value.toFixed(0).toString()
                )
              }
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
            shared: true,
            x: {
              show: false,
              // formatter: function (
              //   value,
              //   {
              //     seriesIndex, w
              //   }
              // ) {
              //   const title = w.config.series[seriesIndex].name || '' || value;
              //   return (
              //     title
              //   );
              // }
            },
            y: {
              title: {
                formatter: (value: any) =>  {
                  return (
                    `${value}: `
                  )
                }
              },
              formatter: function (value:number) {
                return value.toFixed(8).toString();
              },
            },
            z: {
              // title: 'Value (USD): ',
              // formatter: function (value:number) {
              //   return `$${value.toString()}`;
              // },
              title: '',
              formatter: function () {
                return '';
              },
            },
          },
        }}
        series={data}
        type="area"
        // height={chartHeight}
        // width={chartWidth}
      />
    </Box>
  );
};

export default VolumeChart;
