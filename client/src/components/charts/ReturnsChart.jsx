import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetDailyPnlReturnsQuery } from 'state/api/charts/chartsApi';
// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const ReturnsChartOptions = {
    chart: {
        type: 'bar',
        height: 350,
        toolbar: {
            show: false
        }
    },
    colors: ["#089981"],
    plotOptions: {
        bar: {
            colors: {
                ranges: [{
                    from: -1000000,
                    to: 0,
                    color: '#f23645'
                }]
            },
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        labels: {
            rotate: -90
        }
    },
};

// ==============================|| Analytics Returns CHART ||============================== //

const ReturnsChart = () => {

    const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
    const { data, isLoading } = useGetDailyPnlReturnsQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id,
    });

    const [series, setSeries] = useState([]);

    const [options, setOptions] = useState(ReturnsChartOptions);

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
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: `${currentMode === 'light' ? '#111827' : '#9ca3af'}`,
                    }
                }
            }
        }));

        if (data) {
            setOptions((prevState) => ({
                ...prevState,
                xaxis: {
                    categories: data?.journalDates
                },
                yaxis: {
                    title: {
                        text: 'Growth',
                    },
                    labels: {
                        formatter: function (y) {
                            return parseFloat(y).toFixed(2) + "%";
                        }
                    }
                },
            }));

            setSeries([{
                name: 'Daily Returns',
                data: data?.TotalRoi
            }]);
        }

    }, [currentMode, data, isLoading]);


    return <ReactApexChart options={options} series={series} type="bar" height={365} />;
};

export default ReturnsChart;
