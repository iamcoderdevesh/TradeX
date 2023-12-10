import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const WinrateChartOptions = {
    chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
            enabled: true
        }
    },
    colors: ["#7265e6", "#A195FD"],
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: "#e7e7e7",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
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

const WinrateChart = () => {

    const data = useSelector((state) => state.account?.stats, []);
    const { winrate = 0 } = data;

    const [series] = useState([winrate]);
    const [options, setOptions] = useState(WinrateChartOptions);
    const currentMode = useSelector((state) => state.global.mode);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        value: {
                            color: `${currentMode === 'light' ? '#111827' : '#f3f4f6'}`,
                        },
                    }
                }
            }
        }));
    }, [currentMode]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" height={280} width={250} />
        </div>
    )
}

export default WinrateChart
