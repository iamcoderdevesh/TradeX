import React from 'react'
import { AiOutlineLineChart, AiFillCaretUp } from "react-icons/ai";
import { LuDollarSign } from "react-icons/lu";
import { MdOutlineBarChart } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";
import LineChart from 'components/charts/LineChart';
import BarChart from 'components/charts/BarChart';
import ColumnChart from 'components/charts/ColumnChart';

const Dashboard = () => {

    return (
        <>
            <h3 className='text-xl font-medium dark:text-white my-4 mt-8 lg:my-4'>Dashboard</h3>
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

            <div className="grid grid-rows-1 gap-7 mb-8 lg:grid-cols-3 h-full">
                <div className="flex flex-col lg:col-span-2">
                    <h3 className='text-base font-medium dark:text-white mb-2'>Total PnL</h3>
                    <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <div className="flex m-4 mt-6">
                            <AiFillCaretUp className="text-green mr-1" />
                            <h5 className="leading-none text-base font-medium text-green pb-2">$1,12,900 (45.67%)</h5>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400"></p>
                        </div>
                        <div className="w-full bg-white rounded-lg shadow dark:bg-main-dark p-4 md:p-6 md:pt-0">
                            <LineChart />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h3 className='text-base font-medium dark:text-white mb-2'>Weekly PnL</h3>
                    <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <h3 className='text-base font-medium text-gray-400 dark:text-white m-6'>This Week Statistics</h3>
                        <div className="w-full bg-white rounded-lg shadow dark:bg-main-dark p-4 md:p-6 md:pt-0">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="leading-none text-[24px] font-semibold text-gray-900 dark:text-white pb-2">$2,340</h5>
                                </div>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green dark:text-green text-center">
                                    32.5%
                                    <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                    </svg>
                                </div>
                            </div>
                            <BarChart />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-rows-1 gap-7 mb-8 lg:grid-cols-3 h-auto">
                <div className="flex flex-col lg:col-span-2 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <h3 className='text-base font-medium dark:text-white m-4'>Net Profit</h3>
                    <div className="w-full p-4 md:p-6">
                        <ColumnChart />
                    </div>
                </div>
                <div className="flex flex-col h-[360px] w-full rounded-md border border-gray-200 dark:border-gray-900 bg-white dark:bg-main-dark">
                    <h3 className='text-base font-medium dark:text-white m-4'>Recent Transaction</h3>
                    <div className="relative overflow-x-auto shadow-md">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-main-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-main-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="px-6 py-4">
                                        $1999
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-main-dark hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-main-dark hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-main-dark hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <h3 className='text-base font-medium dark:text-white my-4'>Recent Trades</h3>
                <div className="flex flex-col h-auto mb-4 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                    <div className="relative overflow-x-auto shadow-md">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-main-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        Silver
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-main-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="px-6 py-4">
                                        White
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop PC
                                    </td>
                                    <td className="px-6 py-4">
                                        $1999
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-main-dark hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        Black
                                    </td>
                                    <td className="px-6 py-4">
                                        Accessories
                                    </td>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-main-dark hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        Black
                                    </td>
                                    <td className="px-6 py-4">
                                        Accessories
                                    </td>
                                    <td className="px-6 py-4">
                                        $99
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
