import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { useGetMonthlyPnlQuery } from 'state/api/charts/chartsApi';

const MonthlyPnlChartOptions = {
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
    fill: {
        opacity: 1
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

const MonthlyPnlChart = () => {

    const currency = useSelector((state) => state.account.selectedCurrency, []) || '';
    const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
    const { data, isLoading } = useGetMonthlyPnlQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id,
    });

    const [series, setSeries] = useState([
        { name: 'Net Profit', data: data?.TotalNetPnL },
        { name: 'Revenue', data: data?.TotalRevenue }
    ]);
    const [options, setOptions] = useState(MonthlyPnlChartOptions);
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
            },
            tooltip: {
                y: {
                    formatter(val) {
                        return `${currency + val}`;
                    }
                }
            },
        }));

        data && setSeries([
            { name: 'Net Profit', data: data?.TotalNetPnL },
            { name: 'Revenue', data: data?.TotalRevenue }
        ]);
    }, [currentMode, data, isLoading]);

    return (
        <div id='chart'>
            <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
    )
}

export default MonthlyPnlChart
