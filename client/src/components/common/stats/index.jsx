import { GetFormatedCurrency, GetFormatedPnl } from 'helpers/format';
import React from 'react';
import { AiOutlineLineChart } from "react-icons/ai";
import { LuDollarSign } from "react-icons/lu";
import { MdOutlineBarChart } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Statistics = () => {

  const data = useSelector((state) => state.account?.stats, []);

  return (
    <div className="grid grid-rows-1 gap-7 mb-8 lg:grid-cols-4">
      <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
        <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
          <div className="h-50 ml-3 flex w-auto flex-col justify-center">
            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Revenue</p>
            <h4 className="text-xl font-medium dark:text-white"><GetFormatedCurrency value={data?.totalRevenue} /></h4>
          </div>
        </div>
        <div className="flex item-center rounded-full p-3 mr-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            <AiOutlineLineChart className="w-7 h-7 text-gray-400" />
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
        <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
          <div className="ml-3 flex w-auto flex-col justify-center">
            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total PnL</p>
            <h4 className="flex items-center text-xl font-medium dark:text-white"><GetFormatedPnl value={data?.totalPnl} /></h4>
          </div>
        </div>
        <div className="flex item-center rounded-full p-3 mr-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            <LuDollarSign className="w-7 h-7 text-gray-400" />
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
        <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
          <div className="h-50 ml-3 flex w-auto flex-col justify-center">
            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Winrate</p>
            <h4 className="text-xl font-medium dark:text-white">{data?.winrate || 0}%</h4>
          </div>
        </div>
        <div className="flex item-center rounded-full p-3 mr-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            <PiChartLineUpBold className="w-7 h-7 text-gray-400" />
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
        <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
          <div className="h-50 ml-3 flex w-auto flex-col justify-center">
            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Trades</p>
            <h4 className="text-xl font-medium dark:text-white">{data?.totalTrades || 0}</h4>
          </div>
        </div>
        <div className="flex item-center rounded-full p-3 mr-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            <MdOutlineBarChart className="w-7 h-7 text-gray-400" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Statistics;
