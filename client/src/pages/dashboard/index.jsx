import React from 'react';
import { AiFillCaretUp } from "react-icons/ai";
import LineChart from 'components/charts/LineChart';
import BarChart from 'components/charts/BarChart';
import ColumnChart from 'components/charts/ColumnChart';
import data from 'data/data.json';
import { DefaultTable } from 'components/common/table';
import { RecentTradeCols } from 'components/common/table/columns';
import Statistics from 'components/common/stats';
import { FaArrowUpLong } from "react-icons/fa6";

const Dashboard = () => {

    const lineChartData = {
        name: 'PnL',
        data: [86, 28, 115, 48, 210, 136, 300, 335, 250, 300, 400, 380, 410, 390, 450, 420, 425, 300, 400, 500]
    };

    return (
        <div className="my-4 mt-8 lg:my-4">
            <Statistics />
            <div className="grid grid-rows-1 gap-7 mb-8 lg:grid-cols-3 h-full">
                <div className="flex flex-col lg:col-span-2">
                    <h3 className='text-base font-medium dark:text-white mb-2'>Total PnL</h3>
                    <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <div className="flex m-4 mt-6">
                            <AiFillCaretUp className="text-green mr-1" />
                            <h5 className="leading-none text-base font-medium text-green pb-2">$1,12,900 (45.67%)</h5>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400"></p>
                        </div>
                        <div className="w-full p-4 md:p-6 md:pt-0">
                            <LineChart data={lineChartData} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h3 className='text-base font-medium dark:text-white mb-2'>Weekly PnL</h3>
                    <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <h3 className='text-base font-medium text-gray-400 dark:text-white m-6'>This Week Statistics</h3>
                        <div className="w-full p-4 md:p-6 md:pt-0">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="leading-none text-[24px] font-semibold text-gray-900 dark:text-white pb-2">$2,340</h5>
                                </div>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green dark:text-green text-center">
                                    32.5%
                                    <FaArrowUpLong />
                                </div>
                            </div>
                            <BarChart />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-rows-1 gap-7 mb-8 h-auto">
                <div className="flex flex-col rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <h3 className='text-base font-medium dark:text-white m-4'>Net Profit</h3>
                    <div className="w-full p-4 md:p-6">
                        <ColumnChart />
                    </div>
                </div>
            </div>

            <div>
                <h3 className='text-base font-medium dark:text-white my-4'>Recent Trades</h3>
                <div className="flex flex-col h-auto mb-4 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <DefaultTable columns={RecentTradeCols} data={data.mock_data.recentTrades} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
