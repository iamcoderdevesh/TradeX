import React, { useState } from 'react';
// third-party
import ReactApexChart from 'react-apexcharts';

const AreaChart = (props) => {

    const { color, height } = props;

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
            name: 'Profit',
            data: [416.70, 616.45, 1250.12]
        }
    ]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={height} />
        </div>
    )
}

export default AreaChart
