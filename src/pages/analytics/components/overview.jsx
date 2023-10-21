import CircleChart from 'components/charts/CircleChart'
import LineChart from 'components/charts/LineChart'
import { AiFillCaretUp } from "react-icons/ai";
import React from 'react'

const Overview = () => {

  const lineChartData = {
    name: 'PnL',
    data: [86, 28, 115, 48, 210, 136, 300, 335, 250, 300, 400, 380, 410, 390, 450, 420, 425, 300, 400, 500]
  };

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
              <h4 className="text-base font-bold text-green">$2,450.00</h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Revenue</p>
              <h4 className="text-base font-medium dark:text-white">$22,450.00</h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Net ROI</p>
              <h4 className="text-base font-medium dark:text-white">70.54%</h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col justify-between my-4 mx-4 sm:mx-0">
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Trades</p>
              <h4 className="text-base font-medium dark:text-white">20</h4>
            </div>
            <div className="divider sm:border-r-2 sm:border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Profits</p>
              <h4 className="text-base font-medium text-green">$3,000.00</h4>
            </div>
            <div className="divider sm:border-r-2 sm:border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Losses</p>
              <h4 className="text-base font-medium text-red">$550.00</h4>
            </div>
            <div className="divider sm:border-r-2 sm:border-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col justify-between my-4 mx-4 sm:mx-0">
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Average P&L</p>
              <h4 className="text-base font-medium dark:text-white">$2,500.00</h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Max Profit</p>
              <h4 className="text-base font-medium text-green">$850.00</h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Max Loss</p>
              <h4 className="text-base font-medium text-red">$300.00</h4>
            </div>
            <div className="divider border-r-2 border-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col justify-between my-4 mx-4 sm:mx-0">
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Commission & Fees</p>
              <h4 className="text-base font-medium dark:text-white">$250</h4>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Profit Factor</p>
              <h4 className="text-base font-medium dark:text-white">N/A</h4>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-dm text-xs font-medium text-gray-400 mb-1">Risk & Reward</p>
              <h4 className="text-base font-medium dark:text-white">2.20</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className='text-base font-medium dark:text-white mb-2'>Daily Net Cumulative P&L</h3>
        <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
          <div className="flex m-4 mt-6">
            <AiFillCaretUp className="text-green mr-1" />
            <h5 className="leading-none text-base font-medium text-green pb-2">$2,450 (45.67%)</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400"></p>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:bg-main-dark p-4 md:p-6 md:pt-0">
            <LineChart data={lineChartData} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview
