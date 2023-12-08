import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from 'moment';

interface VolumeChartProps {
  chartData: Array<any>;
}

const VolumeChart: React.FC<VolumeChartProps> = ({ chartData }) => {
  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(220);
  const [lineColor, setLineColor] = useState("green");
  const [data, setData] = useState([]);

  // const data = chartData?.map(item => {
  //   const date = item?.snapshot_at;
  //   const timestamp = moment(date).unix();
  //   const eurosVol = item?.euros;
  //   const tstVol = item?.tst;
  //   // const useRewards = item.rewards.map(reward => {
  //   //   return (
  //   //     {}
  //   //   );
  //   // })

  //   return (
  //     [
  //       [timestamp, eurosVol],

  //     ]
  //   );
  // });

  useEffect(() => {
    const useData: Array<any> = [];

    chartData.forEach((snapshot: any) => {
      snapshot.assets.forEach((asset: any) => {
        if (!useData.find(section => section.name === asset[0])) {
          useData.push({name: asset[0], data: []});
        }
        useData.find(section => section.name === asset[0]).data.push([
          snapshot.snapshot_at, asset[1], asset[2]
        ]);
      });
    });

    // chartData.map((chartItem: any) => {
    //   const date = chartItem?.snapshot_at;

    //   console.log('CHART ITEM', {chartItem})

    //   const useAssets = chartItem?.assets.map((asset: any) => {
    //     const assetName = asset[0] || '';
    //     const assetQuantity = asset[1] || '0';
    //     const assetValue = asset[2] || '0';
        
    //     const array: any[] = [];
    //     const newSeries = {
    //       name: assetName,
    //       data: array,
    //     };

    //     const existingSeries = useData?.find((item: any) => item.name === assetName);

    //     if (existingSeries) {
    //       existingSeries.data.push([date, assetQuantity, assetValue]);
    //     } else {
    //       newSeries.data.push([date, assetQuantity, assetValue]);
    //     }

    //     let useSeries = newSeries;

    //     if (existingSeries) {
    //       useSeries = existingSeries;
    //     }

    //     // console.log(345345, existingSeries)
    //     // console.log(567567, asset[0])

    //     // return (
    //     //   useSeries
    //     // );
    //     useData.push(useSeries)
    //     return;
    //   })

    //   // useData.push()

      console.log('USE DATA', {useData})

    //   return (
    //     useAssets
    //   );
    // });
    // console.log(123123, {chartData}, {newData})
    // setData(useData)
  }, [chartData]);

  // const convertedData = chartData.map(({ ts, price }) => [ts * 1000, price]);
  // const series = [
  //   {
  //     //symbol should come here
  //     name: symbol,
  //     data: convertedData,
  //   },
  // ];

  // function formatNumber(value: any) {
  //   // Divide by 100 to move the decimal point two places to the left
  //   const formattedValue = (value / 100).toString();

  //   // Insert a dot before the last two characters
  //   const indexOfDot = formattedValue.length - 2;
  //   const finalValue =
  //     formattedValue.slice(0, indexOfDot) + formattedValue.slice(indexOfDot);

  //   return finalValue;
  // }

  // const renderColor = () => {
  //   //if the last element is greater than the first ever element, set lineColor to green
  //   if (
  //     Number(convertedData[convertedData.length - 1][1]) >
  //     Number(convertedData[0][1])
  //   ) {
  //     setLineColor("green");
  //   } else if (
  //     Number(convertedData[convertedData.length - 1][1]) <
  //     Number(convertedData[0][1])
  //   ) {
  //     setLineColor("red");
  //   }
  // };

  // useEffect(() => {
  //   renderColor();
  // }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.matchMedia("(max-width: 600px)").matches) {
  //       setChartWidth(250);
  //       setChartHeight(120);
  //     } else if (window.matchMedia("(max-width: 1200px)").matches) {
  //       setChartWidth(400);
  //       setChartHeight(150);
  //     } else {
  //       setChartWidth(350);
  //       setChartHeight(220);
  //     }
  //   };

  //   handleResize(); // Set initial dimensions

  //   window.addEventListener("resize", handleResize); // Add event listener for window resize

  //   return () => {
  //     window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
  //   };
  // }, []);

  // if (!data || data.length === 0) {
  //   return null; // or render a loading state or placeholder
  // }

  // return (
  //   <div id="chart">
  //     <ReactApexChart
  //       options={{
  //         chart: {
  //           type: "area",
  //           stacked: false,
  //           toolbar: {
  //             show: false,
  //           },
  //           zoom: {
  //             enabled: false,
  //           },
  //         },
  //         dataLabels: {
  //           enabled: false,
  //         },
  //         // markers: {
  //         //   size: 0,
  //         // },
  //         title: {
  //           text: "Last 24 hours",
  //           align: "left",
  //           style: {
  //             color: "#fff",
  //             fontFamily: "Poppins",
  //             fontWeight: 300,
  //           },
  //         },

  //         colors: [lineColor],
  //         fill: {
  //           type: "gradient",
  //           gradient: {
  //             shadeIntensity: 1,
  //             inverseColors: false,
  //             opacityFrom: 0.5,
  //             opacityTo: 0,
  //             stops: [0, 90, 100],
  //           },
  //         },
  //         grid: {
  //           show: false,
  //         },
  //         yaxis: {
  //           show: true,
  //           labels: {
  //             show: false,
  //           },
  //           // title: {
  //           //   text: "Price",
  //           // },
  //         },
  //         stroke: {
  //           show: true,
  //           curve: "smooth",
  //           lineCap: "butt",
  //           colors: undefined,
  //           width: 2,
  //           dashArray: 0,
  //         },
  //         xaxis: {
  //           type: "datetime",
  //           labels: {
  //             show: false,
  //           },
  //           axisBorder: {
  //             show: false,
  //           },
  //           axisTicks: {
  //             show: false,
  //           },
  //         },
  //         tooltip: {
  //           enabled: true,
  //           shared: false,
  //           x: {
  //             show: false,
  //             formatter: (value:number) => {
  //               const lang = navigator?.language || 'en-US';
  //               return new Date(value).toLocaleString(lang, {dateStyle: 'short', timeStyle: 'short'});
  //             }
  //           },
  //           y: {
  //             formatter: function (val:number) {
  //               const dollarSign = new Intl.NumberFormat("en-US", {
  //                 style: "currency",
  //                 currency: "USD",
  //               }).format(0)[0];
  //               return dollarSign + formatNumber((val / 1000000).toFixed(0));
  //             },
  //           },
  //         },
  //       }}
  //       series={series}
  //       // type="area"
  //       height={chartHeight}
  //       width={chartWidth}
  //     />
  //   </div>
  // );

  return (<div>hi</div>);
};

export default VolumeChart;
