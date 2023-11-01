import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const LineChart = (props) => {
  const { data } = props;
  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([data]);
  const currentMode = useSelector((state) => state.mode);

  useEffect(() => {
      setOptions((prevState) => ({
        ...prevState,
        grid: {
          borderColor: `${currentMode === 'light' ? '#e5e7eb' : '#4b5563'}`,
        },
        xaxis: {
          labels: {
            style: {
              colors: `${currentMode === 'light' ? '#111827' : '#9ca3af'}`,
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: `${currentMode === 'light' ? '#111827' : '#9ca3af'}`,
            }
          }
        }
      }));
  }, [currentMode]);

  return <ReactApexChart options={options} series={series} type="area" height={365} />;
};

export default LineChart;
