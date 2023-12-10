import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetTotalPnlQuery } from 'state/api/charts/chartsApi';

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

const TotalPnlChart = () => {

  const currency = useSelector((state) => state.account.selectedCurrency, []) || '';
  const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
  const { data, isLoading } = useGetTotalPnlQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const [series, setSeries] = useState([{ name: 'P&L', data: data }]);

  const [options, setOptions] = useState(areaChartOptions);
  const currentMode = useSelector((state) => state.global.mode);

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
      },
      tooltip: {
        y: {
          formatter(val) {
            return `${currency + val}`;
          }
        }
      },
    }));

    data && setSeries([{ name: 'P&L', data: data }]);
  }, [currentMode, data, isLoading]);

  return <ReactApexChart options={options} series={series} type="area" height={365} />;
};

export default TotalPnlChart;
