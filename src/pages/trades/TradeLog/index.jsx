import React from 'react';
import DataTable from 'components/common/table';
import { AiOutlineLineChart } from "react-icons/ai";
import { LuDollarSign } from "react-icons/lu";
import { MdOutlineBarChart } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";

const TadeLogs = () => {

    return (
        <section className='h-full'>
            <h3 className='text-xl font-medium dark:text-white my-4 mt-8 lg:my-4'>TradeLog</h3>
            <div className="grid grid-rows-1 gap-7 mb-8 lg:grid-cols-4">
                <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
                        <div className="h-50 ml-3 flex w-auto flex-col justify-center">
                            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Revenue</p>
                            <h4 className="text-xl font-medium dark:text-white">$22,450</h4>
                        </div>
                    </div>
                    <div className="flex item-center rounded-full bg-slate-200 p-3 mr-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <AiOutlineLineChart className="w-7 h-7 text-gray-400" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
                        <div className="ml-3 flex w-auto flex-col justify-center">
                            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total PnL</p>
                            <h4 className="text-xl font-medium dark:text-white">$450</h4>
                        </div>
                    </div>
                    <div className="flex item-center rounded-full bg-slate-200 p-3 mr-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <LuDollarSign className="w-7 h-7 text-gray-400" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
                        <div className="h-50 ml-3 flex w-auto flex-col justify-center">
                            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Winrate</p>
                            <h4 className="text-xl font-medium dark:text-white">70%</h4>
                        </div>
                    </div>
                    <div className="flex item-center rounded-full bg-slate-200 p-3 mr-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <PiChartLineUpBold className="w-7 h-7 text-gray-400" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
                        <div className="h-50 ml-3 flex w-auto flex-col justify-center">
                            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Trades</p>
                            <h4 className="text-xl font-medium dark:text-white">24</h4>
                        </div>
                    </div>
                    <div className="flex item-center rounded-full bg-slate-200 p-3 mr-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <MdOutlineBarChart className="w-7 h-7 text-gray-400" />
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-main-dark h-full p-2 mt-2">
                <DataTable />
            </div>
        </section>
    )
}

export default TadeLogs;
