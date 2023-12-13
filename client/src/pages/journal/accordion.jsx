import React, { useState } from 'react';
import { formatDate } from 'utils';
import { GetFormatedCurrency, GetFormatedPnl } from 'helpers/format';
import { FaChevronDown } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import AreaChart from 'components/charts/AreaChart';
import { TradeColumns } from 'components/common/table/columns';
import TradeTable from 'components/common/table/data-table/index';

const JournalAccordion = (props) => {
    const { JournalDate, TradeStatus, TotalNetPnL, Winrate, TotalTrades, TotalWins, TotalLoss, TotalFees, TotalGrossPnL, TradeDetails } = props.journal;

    const [isActive, setIsActive] = useState(false);

    const GetNetPnl = (TradeDetails) => {
        return TradeDetails?.map(trade => trade.NetPnL) || [];
    }

    return (
        <div className="w-full p-4 mt-8 sm:p-4 bg-white rounded-lg shadow dark:bg-main-dark">
            <div className="flex justify-between">
                <div className="flex flex-col sm:flex-row justify-between w-[350px]">
                    <div>
                        <h3 className="text-base font-medium dark:text-white">{formatDate(JournalDate, "local-date")}</h3>
                    </div>
                    <div className="hidden divider sm:flex">
                        <BsDot className="h-6 w-6 text-gray-400 dark:text-gray-600" />
                    </div>
                    <div className="flex">
                        <h3 className={`text-base font-medium text-${TradeStatus.toString().localeCompare("LOSS") === 0 ? 'red' : 'green'}`}>Net PnL</h3>
                        <div className="flex mx-3 mt-1">
                            <h5 className="flex leading-none text-base font-semibold pb-2"><GetFormatedPnl value={TotalNetPnL} /></h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <button className="w-8 h-8 bg-gray-300 dark:bg-gray-400 rounded-full flex justify-center items-center cursor-pointer" onClick={() => setIsActive(!isActive)}>
                        <FaChevronDown className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:gap-2 my-2 sm:grid-cols-3 lg:grid-cols-6 h-full">
                <div className="chart h-[85px]">
                    <AreaChart color={`${TradeStatus.toString().localeCompare("LOSS") === 0  ? '#f23645' : '#089981'}`} height={100} data={GetNetPnl(TradeDetails)} seriesName={"Net P&L"} />
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Winrate</h3>
                    <p className='text-base font-bold dark:text-white'>{Winrate}%</p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Total Trades</h3>
                    <p className='text-base font-bold dark:text-white'>{TotalTrades}</p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Wins / Losses</h3>
                    <p className='text-base font-bold dark:text-white'>{TotalWins}W / {TotalLoss}L</p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Fees & Charges</h3>
                    <p className='text-base font-bold dark:text-white'><GetFormatedCurrency value={TotalFees} /></p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Gross PnL</h3>
                    <p className='flex items-center text-base font-bold dark:text-white'><GetFormatedPnl value={TotalGrossPnL} /></p>
                </div>
            </div>
            {isActive && <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                <TradeTable columns={TradeColumns} data={TradeDetails || []} />
            </div>}
        </div>
    )
}

export default JournalAccordion;