import React from 'react';
import DataTable from 'components/common/table';
import { AiOutlineLineChart } from "react-icons/ai";
import { LuDollarSign } from "react-icons/lu";
import { MdOutlineBarChart } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";
import { classNames } from "components/utils";

import { RiArrowUpDownLine } from 'react-icons/ri';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

import Checkbox from "components/common/checkbox";
import StatusPill from "components/common/statusPill";

const TadeLogs = () => {

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

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "Symbol",
            header: () => <span>Symbol</span>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Symbol")}</div>
        },
        {
            accessorKey: "Status",
            header: ({ column }) => {
                return (
                    <button
                        className="flex items-center justify-center"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status
                        {column.getIsSorted() === "desc" ? (
                            <FaArrowDown className="ml-2 w-4 h-4" />
                        ) : column.getIsSorted() === "asc" ? (
                            <FaArrowUp className="ml-2 w-4 h-4" />
                        ) : (
                            <RiArrowUpDownLine className="ml-2 h-4 w-4" />
                        )}
                    </button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    <StatusPill value={row.getValue("Status")} />
                </div>
            )
        },
        {
            accessorKey: "Open Date",
            header: () => <div className="capitalize">Open Date</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Open Date")}</div>
        },
        {
            accessorKey: "Close Date",
            header: () => <div className="capitalize">Close Date</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Close Date")}</div>
        },
        {
            accessorKey: "Action",
            header: () => <div className="capitalize">Action</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Action")}</div>
        },
        {
            accessorKey: "Net PnL",
            header: () => <div className="capitalize">Net PnL</div>,
            cell: ({ row }) => <div className={classNames("capitalize font-medium", row.getValue("Net PnL").startsWith("-") ? "text-red" : "text-green")}>{row.getValue("Net PnL")}</div>
        },
        {
            accessorKey: "Net ROI",
            header: () => <div className="capitalize">Net ROI</div>,
            cell: ({ row }) => <div className={classNames("capitalize font-medium", row.getValue("Net ROI").startsWith("-") ? "text-red" : "text-green")}>{row.getValue("Net ROI")}</div>
        },
        {
            accessorKey: "Entry Price",
            header: () => <div className="capitalize">Entry Price</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Entry Price")}</div>
        },
        {
            accessorKey: "Exit Price",
            header: () => <div className="capitalize">Exit Price</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Exit Price")}</div>
        },
        {
            accessorKey: "Stop Loss",
            header: () => <div className="capitalize">Stop Loss</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Stop Loss")}</div>
        },
        {
            accessorKey: "Quantity",
            header: () => <div className="capitalize">Quantity</div>,
            cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("Quantity")}</div>
        },
        {
            accessorKey: "Setup",
            header: () => <div className="capitalize">Setup</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Setup")}</div>
        },
        {
            accessorKey: "Entry Reason",
            header: () => <div className="capitalize">Entry Reason</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Entry Reason")}</div>
        },
        {
            accessorKey: "Exit Reason",
            header: () => <div className="capitalize">Exit Reason</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Exit Reason")}</div>
        },
        {
            accessorKey: "Emotions",
            header: () => <div className="capitalize">Emotions</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Emotions")}</div>
        },
        {
            accessorKey: "Additional Info",
            header: () => <div className="capitalize">Additional Info</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Additional Info")}</div>
        },
    ]

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
                <div className="p-2 mx-auto dark:text-white dark:fill-gray-400">
                    <DataTable data={data} columns={columns} pagination={true} />
                </div>
            </div>
        </section>
    )
}

export default TadeLogs;
