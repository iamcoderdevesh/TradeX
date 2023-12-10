import React from 'react';
import { useSelector } from 'react-redux';
import CircleChart from 'components/charts/WinrateChart';
import { GetFormatedCurrency, GetFormatedPnl } from 'helpers/format';
import TotalPnlChart from 'components/charts/TotalPnlChart';

const Overview = () => {

  const data = useSelector((state) => state.account?.stats, []);
  const { totalPnl, totalRevenue, totalReturns, totalTrades, totalProfit, totalLoss, averageTradePnl, maximumProfit, maximumLoss, totalCommissionsFees, profitFactor, totalRR } = data || [];

  return (
    <section>
      <div className="grid h-auto grid-rows-1 sm:grid-cols-6 sm:gap-4 mb-4 sm:h-56 my-4 bg-white dark:bg-main-dark rounded-md border border-gray-200 dark:border-gray-900 shadow-sm">
        <div className="flex justify-center items-center col-span-2">
          <CircleChart />
        </div>
        <div className="flex flex-col justify-between my-4 mx-4 sm:mx-0">
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Net P&L</p>
              <h4 className="flex items-center text-base font-medium"><GetFormatedPnl value={totalPnl} /></h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Revenue</p>
              <h4 className="text-base font-medium dark:text-white"><GetFormatedCurrency value={totalRevenue} /></h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Net ROI</p>
              <h4 className="flex items-center text-base font-medium"><GetFormatedPnl value={totalReturns} showPercentage={true} /></h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col justify-between my-4 mx-4 sm:mx-0">
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Trades</p>
              <h4 className="text-base font-medium dark:text-white">{totalTrades}</h4>
            </div>
            <div className="divider sm:border-r-2 sm:border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Profit</p>
              <h4 className="flex items-center text-base font-medium"><GetFormatedPnl value={totalProfit} /></h4>
            </div>
            <div className="divider sm:border-r-2 sm:border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Loss</p>
              <h4 className="flex items-center text-base font-medium"><GetFormatedPnl value={totalLoss} /></h4>
            </div>
            <div className="divider sm:border-r-2 sm:border-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col justify-between my-4 mx-4 sm:mx-0">
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Average P&L</p>
              <h4 className="flex items-center text-base font-medium"><GetFormatedPnl value={averageTradePnl} /></h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Max Profit</p>
              <h4 className="flex items-center text-base font-medium"><GetFormatedPnl value={maximumProfit} /></h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Max Loss</p>
              <h4 className="flex items-center text-base font-medium"><GetFormatedPnl value={maximumLoss} /></h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col justify-between my-4 mx-4 sm:mx-0">
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Commission & Fees</p>
              <h4 className="text-base font-medium dark:text-white">{totalCommissionsFees}</h4>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Profit Factor</p>
              <h4 className="text-base font-medium dark:text-white">{profitFactor}</h4>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Risk & Reward</p>
              <h4 className="text-base font-medium dark:text-white">{totalRR}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className='text-base font-medium dark:text-white mb-2'>Total P&L</h3>
        <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
          <div className="flex m-4 mt-6">
            <h5 className="flex items-center justify-center leading-none text-base font-medium pb-2">
              <GetFormatedPnl value={totalPnl} showIcon={true} />
              <div className='ml-2'></div>
              <GetFormatedPnl value={totalReturns} showPercentage={true} showPlusMinus={false} showBracket={true} />
            </h5>
          </div>
          <div className="w-full p-4 md:p-6 md:pt-0">
            <TotalPnlChart />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview
