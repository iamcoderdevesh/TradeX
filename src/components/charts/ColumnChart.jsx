import React from 'react'
import ReactApexChart from 'react-apexcharts';

const ColumnChart = () => {
    const options = {
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
            width: 8,
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
                vertical: 50
            }
        },
    };
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

    return (
        <div id='chart'>
            <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
    )
}

export default ColumnChart
