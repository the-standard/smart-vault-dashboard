import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface VaultTokenChartProps {
  data: { price: any; ts: any }[];
  symbol: string;
}

const VaultTokenChart: React.FC<VaultTokenChartProps> = ({ data, symbol }) => {
  const [chartWidth, setChartWidth] = useState(200);
  const [chartHeight, setChartHeight] = useState(60);
  const [lineColor, setLineColor] = useState("green");

  const convertedData = data.map(({ ts, price }) => [ts * 1000, price]);
  const series = [
    {
      //symbol should come here
      name: symbol,
      data: convertedData,
    },
  ];

  function formatNumber(value: any) {
    // Divide by 100 to move the decimal point two places to the left
    const formattedValue = (value / 100).toString();

    // Insert a dot before the last two characters
    const indexOfDot = formattedValue.length - 2;
    const finalValue =
      formattedValue.slice(0, indexOfDot) + formattedValue.slice(indexOfDot);

    return finalValue;
  }

  const renderColor = () => {
    //if the last element is greater than the first ever element, set lineColor to green
    if (
      Number(convertedData[convertedData.length - 1][1]) >
      Number(convertedData[0][1])
    ) {
      setLineColor("green");
    } else if (
      Number(convertedData[convertedData.length - 1][1]) <
      Number(convertedData[0][1])
    ) {
      setLineColor("red");
    }
  };

  useEffect(() => {
    renderColor();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        setChartWidth(120);
        setChartHeight(60);
      } else if (window.matchMedia("(max-width: 1400px)").matches) {
        setChartWidth(150);
        setChartHeight(80);
      } else {
        setChartWidth(200);
        setChartHeight(80);
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
            parentHeightOffset: 0,
            stacked: false,
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
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          yaxis: {
            show: true,
            forceNiceScale: true,
            labels: {
              show: false,
            },
            // min: (min) => {
            //   min = Math.min(...options["series"][0]["data"]);
            //   console.log("Min:", min);
            //   return min;
            // },
            // max: (max) => {
            //   console.log('Max:', max);
            //   return max; 
            // }
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
            enabled: true,
            shared: false,
            x: {
              show: false,
              formatter: (value:number) => {
                const lang = navigator?.language || 'en-US';
                return new Date(value).toLocaleString(lang, {dateStyle: 'short', timeStyle: 'short'});
              }
            },
            y: {
              formatter: function (val:number) {
                const dollarSign = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(0)[0];
                return dollarSign + formatNumber((val / 1000000).toFixed(0));
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

export default VaultTokenChart;
