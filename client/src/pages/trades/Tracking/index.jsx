import { IconButton } from 'components/common/buttons/index';
import React, { useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useGetTradeStatisticsQuery } from 'state/api/trade/tradeApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetFormatedCurrency, GetFormatedPnl } from 'helpers/format';
import { formatDate } from 'utils';

const Tracking = () => {

  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();    

  const [tradeId, setTradeId] = useState(new URLSearchParams(useLocation().search).get('id'));
  const id = useSelector((state) => state.account?.selectedAccount?.AccountId);

  const { data, isLoading, refetch } = useGetTradeStatisticsQuery({ id, tradeId }, {
    refetchOnMountOrArgChange: true,
    skip: !id
  });

  const { TradeName, Setup, EntryDate, EntryPrice, ExitPrice, StopLoss, Quantity, EntryReason, ExitReason, MarketCondition, Emotions, AdditionalInfo, TradeStatus, NetPnL, GrossPnL, NetRoi, Fees, TradeRisk, RiskReward, previousTradeId, nextTradeId } = data || [];

  return (
    <section className='min-h-screen h-full w-full max-w-2xl flex flex-col '>
      <div className="flex justify-between items-center my-3 mt-8 md:my-4">
        <div>
          <IconButton onClick={() => navigate(-1)}>
            <FaArrowLeftLong className="mr-2" />Back
          </IconButton>
        </div>
        <div className='flex items-center'>
          <IconButton disabled={!previousTradeId}
            onClick={() => {
              if (previousTradeId) {
                setTradeId(previousTradeId);
                refetch();
              }
            }}>
            <FaArrowLeftLong className="mr-2" />Previous
          </IconButton>
          <IconButton disabled={!nextTradeId}
            onClick={() => {
              if (nextTradeId) {
                setTradeId(nextTradeId);
                refetch();
              }
            }}>
            Next<FaArrowRightLong className="ml-2" />
          </IconButton>
        </div>
      </div>
      <div className="p-6 m-2 space-y-5 sm:p-8 bg-white rounded-lg shadow-md dark:bg-main-dark">
        <div className="py-2 border-b dark:border-gray-600">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-400">{TradeName}</h2>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-400 ">{formatDate(EntryDate, "local-date")}</span>
        </div>
        <div className="pnl-section flex justify-between items-center">
          <h3 className={`text-lg font-medium my-2 ${TradeStatus === 'WIN' ? 'text-green' : 'text-red'}`}>Net P&L</h3>
          <div className="flex items-center">
            <h5 className={`text-lg font-semibold`}><GetFormatedPnl value={NetPnL} /></h5>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className="headers flex flex-col">
            <span className="text-sm font-medium dark:text-white my-2">Net ROI</span>
            <span className="text-sm font-medium dark:text-white my-2">Commission & Fees</span>
            <span className="text-sm font-medium dark:text-white my-2">Gross P&L</span>
            <span className="text-sm font-medium dark:text-white my-2">Quantity Traded</span>
            <span className="text-sm font-medium dark:text-white my-2">Stop Loss</span>
            <span className="text-sm font-medium dark:text-white my-2">Entry Price</span>
            <span className="text-sm font-medium dark:text-white my-2">Initial Target</span>
            <span className="text-sm font-medium dark:text-white my-2">Exit Price</span>
            <span className="text-sm font-medium dark:text-white my-2">Trade Risk</span>
            <span className="text-sm font-medium dark:text-white my-2">Risk Reward</span>
          </div>
          <div className="data flex flex-col">
            <span className={`text-sm font-medium my-2 text-right`}><GetFormatedPnl value={NetRoi} showPercentage={true} /></span>
            <span className="text-sm font-medium dark:text-white my-2 text-right"><GetFormatedCurrency value={Fees} /></span>
            <span className={`text-sm font-medium my-2 text-right`}><GetFormatedPnl value={GrossPnL} /></span>
            <span className="text-sm font-medium dark:text-white my-2 text-right">{Quantity?.toFixed(2)}</span>
            <span className="text-sm font-medium dark:text-white my-2 text-right">{StopLoss?.toFixed(2)}</span>
            <span className="text-sm font-medium dark:text-white my-2 text-right"><GetFormatedCurrency value={EntryPrice} /></span>
            <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
            <span className="text-sm font-medium dark:text-white my-2 text-right"><GetFormatedCurrency value={ExitPrice} /></span>
            <span className="text-sm font-medium text-red my-2 text-right"><GetFormatedCurrency value={TradeRisk} /></span>
            <span className="text-sm font-medium dark:text-white my-2 text-right">{RiskReward?.toFixed(2)}</span>
          </div>
        </div>
        {showAdd &&
          <>
            <div>
              <h2 className="pb-4 col-span-2 text-xl border-b font-semibold text-gray-900 dark:text-white dark:border-gray-600">Additional Details</h2>
            </div>
            <div className='h-auto flex justify-between items-start'>
              <div className="headers flex flex-col justify-start items-start">
                <span className="text-sm font-medium dark:text-white my-2">Setup</span>
                <span className="text-sm font-medium dark:text-white my-2">Tags</span>
                <span className="text-sm font-medium dark:text-white my-2">Entry Reason</span>
                <span className="text-sm font-medium dark:text-white my-2">Exit Reason</span>
                <span className="text-sm font-medium dark:text-white my-2">Emotions</span>
                <span className="text-sm font-medium dark:text-white my-2">Market Conditions</span>
                <span className="text-sm font-medium dark:text-white my-2">Additional Information</span>
              </div>
              <div className="data flex flex-col justify-start items-end">
                <span className="text-sm font-medium dark:text-white my-2 text-right">{Setup}</span>
                <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
                <span className="text-sm font-medium dark:text-white my-2 text-right">{EntryReason}</span>
                <span className="text-sm font-medium dark:text-white my-2 text-right">{ExitReason}</span>
                <span className="text-sm font-medium dark:text-white my-2 text-right">{Emotions}</span>
                <span className="text-sm font-medium dark:text-white my-2 text-right">{MarketCondition}</span>
                <span className="text-sm font-medium dark:text-white my-2 text-right">{AdditionalInfo}</span>
              </div>
            </div>
          </>
        }
        <div className="flex flex-row items-center justify-center my-4 sm:my-8">
          <button onClick={() => setShowAdd(!showAdd)} className="flex flex-col items-center justify-center">
            {showAdd && <BiChevronUp className="dark:text-white cursor-pointer" />}
            <h3 className="text-base dark:text-white cursor-pointer">{showAdd ? "Less" : "More"}</h3>
            {!showAdd && <BiChevronDown className="dark:text-white cursor-pointer" />}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Tracking
