import React from 'react'
import { AiFillCaretUp } from "react-icons/ai";
import ReturnsChart from 'components/charts/ReturnsChart';
import { KeyValueTable } from 'components/common/table';

const Detailed = () => {

  const data_1 = [
    { key: "Total P&L", value: "$2,450" },
    { key: "Total Revenue", value: "$22,450" },
    { key: "Total Returns", value: "12.25%" },
    { key: "Average Winning Trade", value: "14" },
    { key: "Average Losing Trade", value: "6" },
    { key: "Maximum Profit", value: "$500" },
    { key: "Maximum Loss", value: "$150" },
    { key: "Minimum Profit", value: "$60" },
    { key: "Minimum Loss", value: "$50" },
    { key: "Number of Winning Trades", value: "15" },
    { key: "Number of Losing Trades", value: "6" },
    { key: "Number of Breakeven Trade", value: "0" },
    { key: "Max Consecutive Wins", value: "10" },
    { key: "Max Consecutive Losses", value: "2" },
    { key: "Total Commissions & Fees", value: "$250" },
    { key: "Gross P&L", value: "$2,700" },
  ];

  const data_2 = [
    { key: "Average Hold Time (All Trades)", value: "42 Minutes" },
    { key: "Average Hold Time (Winning Trades)", value: "35 Minutes" },
    { key: "Average Hold Time (Losing Trades)", value: "50 Minutes" },
    { key: "Average Trade P&L", value: "$600" },
    { key: "Average Losing Trade", value: "6" },
    { key: "Profit Factor", value: "8.2" },
    { key: "Maximum Loss", value: "$150" },
    { key: "Opened Trades", value: "0" },
    { key: "Minimum Loss", value: "$50" },
    { key: "Total Trading Days", value: "25" },
    { key: "Number of Losing Trades", value: "6" },
    { key: "Total Winning Days", value: "19" },
    { key: "Total Losing Days", value: "6" },
    { key: "Total Breakeven Days", value: "0" },
    { key: "Net Daily P&L", value: "$300" },
    { key: "Risk & Reward Ratio (R:R)", value: "2.50" },
  ];

  return (
    <>
      <div className="h-auto my-4 bg-white dark:bg-main-dark rounded-md shadow-sm">
        <div>
          <div className='headings p-4'>
            <h3 className="text-base font-semibold dark:text-white">YOUR STATS</h3>
            <span className="text-sm font-medium dark:text-white">(All Dates)</span>
          </div>
          <div className="grid gap-y-6 md:grid-cols-2 p-4 text-sm font-medium gap-x-8">
            <KeyValueTable data={data_1} />
            <KeyValueTable data={data_2} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className='text-base font-medium dark:text-white mb-2'>Daily Returns</h3>
        <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
          <div className="flex m-4 mt-6">
            <AiFillCaretUp className="text-green mr-1" />
            <h5 className="leading-none text-base font-medium text-green pb-2">$2,450 (2.25%)</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400"></p>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:bg-main-dark p-4 md:p-6 md:pt-0">
            <ReturnsChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Detailed;
