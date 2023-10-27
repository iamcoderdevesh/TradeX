import { IconButton } from 'components/common/buttons/index';
import React, { useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Tracking = () => {

  const [showAdd, setShowAdd] = useState(false);

  return (
    <section className='h-screen'>
      <div className="nav-header flex justify-between items-center my-3 mt-8 md:my-4">
        <div>
          <IconButton>
            <FaArrowLeftLong className="mr-2" />Back
          </IconButton>
        </div>
        <div className='flex items-center'>
          <IconButton>
            <FaArrowLeftLong className="mr-2" />Previous
          </IconButton>
          <IconButton>Next
            <FaArrowRightLong className="ml-2" />
          </IconButton>
        </div>
      </div>
      <div className="flex">
        <div className="w-full max-w-2xl p-6 m-2 space-y-5 sm:p-8 bg-white rounded-lg shadow-md dark:bg-main-dark">
          <div className="py-8 px-1 lg:py-2 border-b dark:border-gray-600">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-400">DOGE USDT</h2>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-400 ">Fri, OCT 27, 2023</span>
          </div>
          <div className="pnl-section flex justify-between items-center">
            <h3 className={`text-lg font-medium my-2 text-green`}>Net P&L</h3>
            <div className="flex items-center">
              <AiFillCaretUp className="text-green mr-1" />
              <h5 className={`text-lg font-semibold text-green`}>$1250.12</h5>
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
              <span className={`text-sm font-medium text-green my-2 text-right`}>2.25%</span>
              <span className="text-sm font-medium dark:text-white my-2 text-right">$250.00</span>
              <span className={`text-sm font-medium text-green my-2 text-right`}>$1500.12</span>
              <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
              <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
              <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
              <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
              <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
              <span className="text-sm font-medium text-red my-2 text-right">$500.00</span>
              <span className="text-sm font-medium dark:text-white my-2 text-right">2.20</span>
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
                  <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
                  <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
                  <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
                  <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
                  <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
                  <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
                  <span className="text-sm font-medium dark:text-white my-2 text-right">-</span>
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
      </div>
    </section>
  )
}

export default Tracking
