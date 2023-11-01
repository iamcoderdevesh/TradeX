import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 325,
        toolbar: {
            show: false
        }
    },
    colors: ["#7265e6"],
    plotOptions: {
        bar: {
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY PnL CHART ||============================== //

const BarChart = () => {
    const [series] = useState([
        {
            data: [80, 95, 70, 42, 65, 55, 78]
        }
    ]);

    const [options, setOptions] = useState(barChartOptions);
    const currentMode = useSelector((state) => state.mode);
    
    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            xaxis: {
                labels: {
                    style: {
                        colors: `${currentMode === 'light' ? '#111827' : '#9ca3af'}`
                    }
                }
            }
        }));
    }, [currentMode]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={325} />
        </div>
    );
};

export default BarChart;
