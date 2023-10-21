import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const CircleChart = () => {

    const CircleChartOptions = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: true
                    },
                    value: {
                        offsetY: -40,
                        fontSize: '24px'
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        stroke: {
            lineCap: 'round'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91]
            },
        },
        labels: ['Winrate'],
    };

    const [series] = useState([76]);

    return (
        <div id="chart">
            <ReactApexChart options={CircleChartOptions} series={series} type="radialBar" height={280} width={250} />
        </div>
    )
}

export default CircleChart
