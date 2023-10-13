import React from 'react';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import AreaChart from 'components/charts/AreaChart';

const Journal = () => {
  return (
    <section className='h-screen'>
      <h3 className='text-xl font-medium dark:text-white my-4 mt-8 lg:my-4'>Journal</h3>
      <div className="w-full p-4 mt-8 sm:p-4 bg-white rounded-lg shadow dark:bg-main-dark">
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row justify-between w-96">
            <div>
              <h3 className="text-lg font-medium dark:text-white">Mon, Oct 10, 2023</h3>
            </div>
            <div className="hidden divider sm:flex items-center">
              <BsDot className="h-6 w-6 text-gray-400 dark:text-gray-600" />
            </div>
            <div className="flex">
              <h3 className='text-lg font-medium text-green'>Net PnL</h3>
              <div className="flex mx-3 mt-1">
                <AiFillCaretUp className="text-green mr-1" />
                <h5 className="leading-none text-lg font-semibold text-green pb-2">$1250.12</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <button className="w-8 h-8 bg-gray-300 dark:bg-gray-400 rounded-full flex justify-center items-center cursor-pointer">
              <FaChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-2 my-2 sm:grid-cols-3 lg:grid-cols-6 h-full">
          <div className="chart h-[85px]">
            <AreaChart color={"#089981"}/>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Winrate</h3>
            <p className='text-lg font-bold dark:text-white'>100.00%</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Total Trades</h3>
            <p className='text-lg font-bold dark:text-white'>3</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Wins / Losses</h3>
            <p className='text-lg font-bold dark:text-white'>3W / 2L</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Fees & Charges</h3>
            <p className='text-lg font-bold dark:text-white'>$50.12</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Gross PnL</h3>
            <p className='text-lg font-bold dark:text-white'>$1300.12</p>
          </div>
        </div>
      </div>
      <div className="w-full p-4 mt-8 sm:p-4 bg-white rounded-lg shadow dark:bg-main-dark">
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row justify-between w-96">
            <div>
              <h3 className="text-lg font-medium dark:text-white">Mon, Oct 10, 2023</h3>
            </div>
            <div className="hidden divider sm:flex items-center">
              <BsDot className="h-6 w-6 text-gray-400 dark:text-gray-600" />
            </div>
            <div className="flex">
              <h3 className='text-lg font-medium text-red'>Net PnL</h3>
              <div className="flex mx-3 mt-1">
                <AiFillCaretDown className="text-red mr-1" />
                <h5 className="leading-none text-lg font-semibold text-red pb-2">$1250.12</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <button className="w-8 h-8 bg-gray-300 dark:bg-gray-400 rounded-full flex justify-center items-center cursor-pointer">
              <FaChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-2 my-2 sm:grid-cols-3 lg:grid-cols-6 h-full">
          <div className="chart h-[85px]">
            <AreaChart color={"#f23645"}/>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Winrate</h3>
            <p className='text-lg font-bold dark:text-white'>100.00%</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Total Trades</h3>
            <p className='text-lg font-bold dark:text-white'>3</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Wins / Losses</h3>
            <p className='text-lg font-bold dark:text-white'>3W / 2L</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Fees & Charges</h3>
            <p className='text-lg font-bold dark:text-white'>$50.12</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Gross PnL</h3>
            <p className='text-lg font-bold dark:text-white'>$1300.12</p>
          </div>
        </div>
      </div>
      <div className="w-full p-4 mt-8 sm:p-4 bg-white rounded-lg shadow dark:bg-main-dark">
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row justify-between w-96">
            <div>
              <h3 className="text-lg font-medium dark:text-white">Mon, Oct 10, 2023</h3>
            </div>
            <div className="hidden divider sm:flex items-center">
              <BsDot className="h-6 w-6 text-gray-400 dark:text-gray-600" />
            </div>
            <div className="flex">
              <h3 className='text-lg font-medium text-green'>Net PnL</h3>
              <div className="flex mx-3 mt-1">
                <AiFillCaretUp className="text-green mr-1" />
                <h5 className="leading-none text-lg font-semibold text-green pb-2">$1250.12</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <button className="w-8 h-8 bg-gray-300 dark:bg-gray-400 rounded-full flex justify-center items-center cursor-pointer">
              <FaChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-2 my-2 sm:grid-cols-3 lg:grid-cols-6 h-full">
          <div className="chart h-[85px]">
            <AreaChart color={"#089981"}/>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Winrate</h3>
            <p className='text-lg font-bold dark:text-white'>100.00%</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Total Trades</h3>
            <p className='text-lg font-bold dark:text-white'>3</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Wins / Losses</h3>
            <p className='text-lg font-bold dark:text-white'>3W / 2L</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Fees & Charges</h3>
            <p className='text-lg font-bold dark:text-white'>$50.12</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Gross PnL</h3>
            <p className='text-lg font-bold dark:text-white'>$1300.12</p>
          </div>
        </div>
      </div>
      <div className="w-full p-4 mt-8 sm:p-4 bg-white rounded-lg shadow dark:bg-main-dark">
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row justify-between w-96">
            <div>
              <h3 className="text-lg font-medium dark:text-white">Mon, Oct 10, 2023</h3>
            </div>
            <div className="hidden divider sm:flex items-center">
              <BsDot className="h-6 w-6 text-gray-400 dark:text-gray-600" />
            </div>
            <div className="flex">
              <h3 className='text-lg font-medium text-green'>Net PnL</h3>
              <div className="flex mx-3 mt-1">
                <AiFillCaretUp className="text-green mr-1" />
                <h5 className="leading-none text-lg font-semibold text-green pb-2">$1250.12</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <button className="w-8 h-8 bg-gray-300 dark:bg-gray-400 rounded-full flex justify-center items-center cursor-pointer">
              <FaChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-2 my-2 sm:grid-cols-3 lg:grid-cols-6 h-full">
          <div className="chart h-[85px]">
            <AreaChart color={"#089981"}/>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Winrate</h3>
            <p className='text-lg font-bold dark:text-white'>100.00%</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Total Trades</h3>
            <p className='text-lg font-bold dark:text-white'>3</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Wins / Losses</h3>
            <p className='text-lg font-bold dark:text-white'>3W / 2L</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Fees & Charges</h3>
            <p className='text-lg font-bold dark:text-white'>$50.12</p>
          </div>
          <div className="flex flex-col justify-end items-center">
            <h3 className='text-base font-normal text-gray-400'>Gross PnL</h3>
            <p className='text-lg font-bold dark:text-white'>$1300.12</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journal;
