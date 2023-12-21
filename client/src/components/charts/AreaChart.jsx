import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts'; // third-party

const AreaChart = (props) => {

    const currency = useSelector((state) => state.account.selectedCurrency, []) || '';
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
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            show: false,
        },
        tooltip: {
            y: {
                formatter(val) {
                    return `${currency + val}`;
                }
            }
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

    useEffect(() => {
        data && setSeries([{ name: seriesName, data: data }]);
    }, [data]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={height} />
        </div>
    )
}

export default AreaChart
