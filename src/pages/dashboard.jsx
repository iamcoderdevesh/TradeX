import React from 'react'
import { AiOutlineLineChart, AiFillSliders } from "react-icons/ai";
import { LuDollarSign } from "react-icons/lu";
import { MdOutlineBarChart } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";

const dashboard = () => {
    return (
        <div className="p-2 bg-gray-50 dark:bg-primary-dark md:ml-64 md:p-4">
            <div className="p-2 mt-14 md:p-4">
                <h3 className='text-2xl font-medium dark:text-white my-4'>Dashboard</h3>
                <div className="grid grid-rows-1 gap-7 mb-4 lg:grid-cols-4">
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
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-white dark:bg-main-dark">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-white dark:bg-main-dark">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-main-dark">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard

