import React, { useState } from 'react'
import { useStateContext } from 'context/ContextProvider';

//Calendar Imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import multiMonthPlugin from '@fullcalendar/multimonth'
import Events from './data.json';
import './calendar.css'

//Popup section imports
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import DataTable from 'components/common/table/index';
import StatusPill from "components/common/statusPill";
import { classNames } from "components/utils";
import ModalPopup from 'components/common/popup/index';
import AreaChart from 'components/charts/AreaChart';

const Calendar = () => {
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

    const handleDateClick = (arg) => {
        setShowPopup(!showPopup)
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'multiMonthYear,dayGridMonth',
                }}
                events={Events.calendarEvents}
                dateClick={handleDateClick}
                height={"80vh"} />

            {showPopup &&
                <ModalPopup
                    header={
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
                        </div>}
                    body={<>
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
                        <div>
                            <DataTable data={data} columns={columns} pagination={false} />
                        </div>
                    </>} />
            }
        </>
    )
}

export default Calendar;
