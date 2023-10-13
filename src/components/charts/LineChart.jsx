import React, { useState } from 'react';
// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 365,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  colors: ["#7265e6", "#A195FD"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| PnL AREA CHART ||============================== //

const LineChart = ({ slot }) => {

  const [options, setOptions] = useState(areaChartOptions);

  const [series, setSeries] = useState([
    {
      name: 'Page Views',
      data: [86, 28, 115, 48, 210, 136]
    },
    {
      name: 'Sessions',
      data: [43, 14, 56, 24, 105, 68]
    }
  ]);
  

  return <ReactApexChart options={options} series={series} type="area" height={365} />;
};

export default LineChart;
