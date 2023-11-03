import React from 'react';
import DataTable from 'components/common/table/data-table';
import { AiOutlineLineChart } from "react-icons/ai";
import { LuDollarSign } from "react-icons/lu";
import { MdOutlineBarChart } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";

const TradeStatistics = () => {

    const data = [
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "WIN",
            "Open Date": "10/18/2023",
            "Close Date": "10/18/2023",
            Action: "BUY / LONG",
            "Net PnL": "+₹500.00",
            "Net ROI": "+5.00%",
            "Entry Price": "₹100.00",
            "Exit Price": "₹110.00",
            "Stop Loss": "₹90.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Target Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
        {
            Symbol: "NIFTY",
            Status: "LOSS",
            "Open Date": "10/16/2023",
            "Close Date": "10/16/2023",
            "Net PnL": "-₹500.00",
            "Net ROI": "-5.00%",
            Action: "BUY / LONG",
            "Entry Price": "₹200.00",
            "Exit Price": "₹190.00",
            "Stop Loss": "₹190.00",
            Quantity: "50.00",
            Setup: "5EMA",
            "Entry Reason": "Setup Created",
            "Exit Reason": "Stop Loss Hit",
            Emotions: "Normal",
            "Additional Info": "",
        },
    ]

    return (
        <section className='h-full my-4 mt-8 lg:my-4'>
            <div className="grid grid-rows-1 gap-7 mb-8 lg:grid-cols-4">
                <div className="flex flex-row justify-between h-24 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <div className="ml-4 flex h-[90px] w-auto flex-row items-center">
                        <div className="h-50 ml-3 flex w-auto flex-col justify-center">
                            <p className="font-dm text-xs font-medium text-gray-400 mb-1">Total Revenue</p>
                            <h4 className="text-xl font-medium dark:text-white">$22,450</h4>
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
                            <h4 className="text-xl font-medium dark:text-white">$450</h4>
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
                            <h4 className="text-xl font-medium dark:text-white">70%</h4>
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
                            <h4 className="text-xl font-medium dark:text-white">24</h4>
                        </div>
                    </div>
                    <div className="flex item-center rounded-full p-3 mr-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                            <MdOutlineBarChart className="w-7 h-7 text-gray-400" />
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-main-dark h-full p-2 mt-2">
                <div className="p-2 mx-auto dark:text-white dark:fill-gray-400">
                    <DataTable data={data} pagination={true} />
                </div>
            </div>
        </section>
    )
}

export default TradeStatistics;
