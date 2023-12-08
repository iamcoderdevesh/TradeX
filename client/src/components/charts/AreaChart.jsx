import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts'; // third-party

const AreaChart = (props) => {

    const { color, height, data, seriesName } = props;

    // chart options
    const options = {
        chart: {
            height: height,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        colors: [color],
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.7,
                opacityTo: 0,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 70,
                        color: color, // original color for positive values
                        opacity: 0.3
                    },
                    {
                        offset: 100,
                        color: '#f23645', // color for negative values
                        opacity: 0.8
                    }
                ]
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            show: false,
        },
        xaxis: {
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
        yaxis: {
            show: false,
        }
    };

    const [series, setSeries] = useState([
        {
            name: seriesName,
            data: data
        }
    ]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={height} />
        </div>
    )
}

export default AreaChart
