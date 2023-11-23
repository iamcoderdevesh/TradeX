import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const columnChartOptions = {
    chart: {
        type: 'bar',
        height: '140px',
        fontFamily: 'Inter, sans-serif',
        toolbar: {
            show: false
        }
    },
    colors: ["#089981", "#A195FD"],
    plotOptions: {
        bar: {
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 6,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
        title: {
            text: '$ (thousands)'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter(val) {
                return `$ ${val} thousands`;
            }
        }
    },
    legend: {
        show: true,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
            useSeriesColors: false
        },
        markers: {
            width: 16,
            height: 16,
            offsexX: 2,
            offsexY: 2
        },
        itemMargin: {
            horizontal: 15,
            vertical: 30
        }
    },
};

const ColumnChart = () => {
    const series = [
        {
            name: 'Net Profit',
            data: [180, 90, 135, 114, 120, 145, 180, 90, 135, 114, 120, 145]
        },
        {
            name: 'Revenue',
            data: [120, 45, 78, 150, 168, 99, 120, 45, 78, 150, 168, 99]
        }
    ];

    const [options, setOptions] = useState(columnChartOptions);
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
            legend: {
                labels: {
                    colors: `${currentMode === 'light' ? '#111827' : '#9ca3af'}`,
                }
            }
        }));
    }, [currentMode]);

    return (
        <div id='chart'>
            <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
    )
}

export default ColumnChart
