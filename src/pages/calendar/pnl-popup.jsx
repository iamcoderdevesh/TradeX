import React, { useState } from 'react'
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import DataTable from 'components/common/table';
import StatusPill from "components/common/statusPill";
import { classNames } from "components/utils";
import AreaChart from 'components/charts/AreaChart';
import { useStateContext } from 'context/ContextProvider';

const PnlPopup = () => {

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
    ]

    const columns = [
        {
            accessorKey: "Symbol",
            header: () => <span>Symbol</span>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("Symbol")}</div>
        },
        {
            accessorKey: "Status",
            header: () => <div className="capitalize">Status</div>,
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

    const { showPopup, setShowPopup } = useStateContext();
    const [status, setStatus] = useState(false);
    const [showTable, setShowTable] = useState(false);

    return (
        <div>
            {showPopup &&
                <div className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center sm:flex' onClick={() => setShowPopup(false)}>
                    <div className="relative w-full max-w-5xl max-h-full p-4 mt-8 z-50 bg-white rounded-lg shadow-lg dark:bg-main-dark" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center my-2">
                            <div className="flex flex-col sm:flex-row justify-between w-[350px]">
                                <div>
                                    <h3 className="text-base font-medium dark:text-white">Mon, Oct 10, 2023</h3>
                                </div>
                                <div className="hidden divider sm:flex">
                                    <BsDot className="h-6 w-6 text-gray-400 dark:text-gray-600" />
                                </div>
                                <div className="flex">
                                    <h3 className={`text-base font-medium text-${status ? 'green' : 'red'}`}>Net PnL</h3>
                                    <div className="flex mx-3 mt-1">
                                        {
                                            status ? <AiFillCaretUp className="text-green mr-1" />
                                                : <AiFillCaretDown className="text-red mr-1" />
                                        }
                                        <h5 className={`leading-none text-base font-semibold text-${status ? 'green' : 'red'} pb-2`}>$1250.12</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowPopup(!showPopup)}>
                                    <IoClose className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 my-6">
                            <div className="col-span-2 md:col-span-1 chart h-[125px]">
                                <AreaChart color={`${status ? '#089981' : '#f23645'}`} height={125} />
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Total Trades</h3>
                                    <span className='text-xs font-bold dark:text-white'>5</span>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Winrate</h3>
                                    <p className='text-xs font-bold dark:text-white'>100.00%</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Wins</h3>
                                    <span className='text-xs font-bold dark:text-white'>5</span>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Loss</h3>
                                    <span className='text-xs font-bold dark:text-white'>0</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Revenue</h3>
                                    <p className='text-xs font-bold dark:text-white'>$2,450.00</p>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Net ROI</h3>
                                    <p className='text-xs font-bold dark:text-white'>2.25%</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Commission & Fees</h3>
                                    <p className='text-xs font-bold dark:text-white'>$250.00</p>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Risk & Reward</h3>
                                    <p className='text-xs font-bold dark:text-white'>2.20</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${!showTable && 'hidden sm:block'}`}>
                            <DataTable data={data} columns={columns} pagination={false} />
                        </div>
                        <div className="flex flex-row items-center justify-center my-4 sm:hidden">
                            <button onClick={() => setShowTable(!showTable)} className="flex flex-col items-center justify-center">
                                {showTable && <BiChevronUp className="dark:text-white cursor-pointer" />}
                                <h3 className="text-base dark:text-white cursor-pointer">{showTable ? "Less" : "More"}</h3>
                                {!showTable && <BiChevronDown className="dark:text-white cursor-pointer" />}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PnlPopup
