import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleDateClick } from 'state';
import { BsDot } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import AreaChart from 'components/charts/AreaChart';
import TradeTable from 'components/common/table/data-table';
import { TradeColumns } from 'components/common/table/columns';
import { useGetJournalDetailsQuery } from 'state/api/journal/journalApi';
import { GetFormatedCurrency, GetFormatedPnl } from 'helpers/format';
import { formatDate } from 'utils';

const PnlPopup = () => {

    const pnlPopup = useSelector((state) => state.global.pnlPopup);
    const [showTable, setShowTable] = useState(false);
    const dispatch = useDispatch();

    const TradeDate = useSelector((state) => state.global.fullCalendar_date);
    const id = useSelector((state) => state.account?.selectedAccount?.AccountId) || 0;
    const { data: JournalDetails, isLoading } = useGetJournalDetailsQuery({ id, TradeDate }, {
        skip: !TradeDate
    });

    const { JournalDate, TradeStatus, TotalNetPnL, Winrate, TotalTrades, TotalWins, TotalLoss, TotalFees, TradeDetails, TotalRevenue, TotalRoi, TotalRR } = JournalDetails || [];

    const GetNetPnl = (TradeDetails) => {
        return TradeDetails?.map(trade => trade.NetPnL) || [];
    }

    return (
        <div>
            {pnlPopup &&
                <div className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center sm:flex' onClick={() => dispatch(handleDateClick())}>
                    <div className="relative w-full max-w-5xl max-h-full p-4 mt-8 z-50 bg-white rounded-lg shadow-lg dark:bg-main-dark" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center my-2">
                            <div className="flex flex-col sm:flex-row justify-between w-[350px]">
                                <div>
                                    <h3 className="text-base font-medium dark:text-white">{formatDate(JournalDate, "local-date")}</h3>
                                </div>
                                <div className="hidden divider sm:flex">
                                    <BsDot className="h-6 w-6 text-gray-400 dark:text-gray-600" />
                                </div>
                                <div className="flex">
                                    <h3 className={`text-base font-medium text-${TradeStatus?.toString()?.localeCompare("LOSS") === 0 ? 'red' : 'green'}`}>Net PnL</h3>
                                    <div className="flex mx-3 mt-1">
                                        <h5 className="flex leading-none text-base font-semibold pb-2"><GetFormatedPnl value={TotalNetPnL} /></h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => dispatch(handleDateClick())}>
                                    <IoClose className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 my-6">
                            <div className="col-span-2 md:col-span-1 chart h-[125px]">
                                <AreaChart color={`${TradeStatus?.toString()?.localeCompare("LOSS") === 0 ? '#f23645' : '#089981'}`} height={125} data={GetNetPnl(TradeDetails)} seriesName={"Net P&L"} />
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Total Trades</h3>
                                    <span className='text-xs font-bold dark:text-white'>{TotalTrades}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Winrate</h3>
                                    <p className='text-xs font-bold dark:text-white'>{Winrate}%</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Wins</h3>
                                    <span className='text-xs font-bold dark:text-white'>{TotalWins}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Loss</h3>
                                    <span className='text-xs font-bold dark:text-white'>{TotalLoss}</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Revenue</h3>
                                    <p className='text-xs font-bold dark:text-white'><GetFormatedCurrency value={TotalRevenue} /></p>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Net ROI</h3>
                                    <p className='text-xs font-bold dark:text-white'>{TotalRoi}%</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between my-4 mx-4">
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Commission & Fees</h3>
                                    <p className='text-xs font-bold dark:text-white'><GetFormatedCurrency value={TotalFees} /></p>
                                </div>
                                <div className="flex flex-col sm:flex-row my-2 justify-between items-center">
                                    <h3 className='text-xs font-normal text-gray-400'>Risk & Reward</h3>
                                    <p className='text-xs font-bold dark:text-white'>{TotalRR}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${!showTable && 'hidden sm:block'}`} onClick={() => dispatch(handleDateClick())}>
                            <TradeTable columns={TradeColumns} data={TradeDetails || []} />
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
