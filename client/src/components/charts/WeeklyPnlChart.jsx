import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetWeeklyPnlQuery } from 'state/api/charts/chartsApi';
// third-party
import ReactApexChart from 'react-apexcharts';
import { FaArrowUpLong } from "react-icons/fa6";
import { GetFormatedPnl } from 'helpers/format';

// chart options
const WeeklyPnlChartOptions = {
    chart: {
        type: 'bar',
        height: 325,
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
        enabled: false
    },
    xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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

// ==============================|| Weekly PnL CHART ||============================== //

const WeeklyPnlChart = () => {

    const currency = useSelector((state) => state.account.selectedCurrency, []) || '';
    const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
    const { data, isLoading } = useGetWeeklyPnlQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id,
    });

    const [series, setSeries] = useState([{ name: 'P&L', data: data?.netPnl }]);

    const [options, setOptions] = useState(WeeklyPnlChartOptions);
    const currentMode = useSelector((state) => state.global.mode);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            xaxis: {
                categories: data?.categories || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: {
                    style: {
                        colors: `${currentMode === 'light' ? '#111827' : '#9ca3af'}`
                    }
                }
            },
            tooltip: {
                y: {
                    formatter(val) {
                        return `${currency + val}`;
                    }
                }
            }
        }));
        data && setSeries([{ name: 'P&L', data: data?.netPnl }]);
    }, [currentMode, data, isLoading]);

    return (
        <div className="flex flex-col">
            <h3 className='text-base font-medium dark:text-white mb-2'>Weekly PnL</h3>
            <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                <h3 className='text-base font-medium text-gray-400 dark:text-white m-6'>This Week Statistics</h3>
                <div className="w-full p-4 md:p-6 md:pt-0">
                    <div className="flex justify-between">
                        <div>
                            <h5 className="leading-none text-[24px] font-semibold pb-2">
                                <GetFormatedPnl value={data?.totalNetPnL} />
                            </h5>
                        </div>
                        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-center">
                            <GetFormatedPnl value={data?.weeklyReturns} showIcon={true} showPlusMinus={false} showPercentage={true} />
                        </div>
                    </div>
                    <div id="chart">
                        <ReactApexChart options={options} series={series} type="bar" height={325} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyPnlChart;
