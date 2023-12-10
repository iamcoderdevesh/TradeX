import React from 'react';
import Statistics from 'components/common/stats';
import RecentTrades from './recentTrade';
import { useSelector } from 'react-redux';
import { GetFormatedPnl } from 'helpers/format';
import DailyPnlChart from 'components/charts/DailyPnlChart';
import WeeklyPnlChart from 'components/charts/WeeklyPnlChart';
import MonthlyPnlChart from 'components/charts/MonthlyPnlChart';

const Dashboard = () => {

    const data = useSelector((state) => state.account?.stats, []);
    const { netDailyPnl } = data || [];

    return (
        <div className="my-4 mt-8 lg:my-4">
            <Statistics />
            <div className="grid grid-rows-1 gap-7 mb-8 lg:grid-cols-3 h-full">
                <div className="flex flex-col lg:col-span-2">
                    <h3 className='text-base font-medium dark:text-white mb-2'>Daily Net Cumulative P&L</h3>
                    <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <div className="flex m-4 mt-6">
                            <h5 className="flex leading-none text-base font-medium pb-2">
                                <GetFormatedPnl value={netDailyPnl} showIcon={true} />
                            </h5>
                        </div>
                        <div className="w-full p-4 md:p-6 md:pt-0">
                            <DailyPnlChart />
                        </div>
                    </div>
                </div>
                <WeeklyPnlChart/>
            </div>

            <div className="grid grid-rows-1 gap-7 mb-8 h-auto">
                <div className="flex flex-col rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <h3 className='text-base font-medium dark:text-white m-4'>Net Profit & Revenue</h3>
                    <div className="w-full p-4 md:p-6">
                        <MonthlyPnlChart />
                    </div>
                </div>
            </div>

            <RecentTrades />
        </div>
    )
}

export default Dashboard;