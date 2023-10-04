import React from 'react'
import { AiOutlineLineChart, AiFillSliders } from "react-icons/ai";

const dashboard = () => {
    return (
        <div className="p-4 bg-gray-50 dark:bg-primary-dark md:ml-64">
            <div className="p-4 mt-14">
                <h3 className='text-2xl font-medium dark:text-white mb-4'>Dashboard</h3>
                <div className="grid grid-rows-1 gap-4 mb-4 lg:grid-cols-3">
                    <div className="flex flex-row justify-between h-24 rounded border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <div className="flex items-center">
                            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                <div className="rounded-full bg-slate-200 p-3 dark:bg-navy-700">
                                    <span className="flex items-center text-brand-500 dark:text-white">
                                        <AiOutlineLineChart className="w-7 h-7 text-gray-500 dark:text-gray-400" />
                                    </span>
                                </div>
                            </div>
                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                                <h4 className="text-xl font-medium dark:text-white">$22,450</h4>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center m-4">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="font-medium text-green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path><path d="M7 14l5-5 5 5z"></path></svg><p className="text-sm font-bold text-green"> +2.45% </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between h-24 rounded border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <div className="flex items-center">
                            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                <div className="rounded-full bg-slate-200 p-3 dark:bg-navy-700">
                                    <span className="flex items-center text-brand-500 dark:text-white">
                                        <AiFillSliders className="h-7 w-7 text-gray-500 dark:text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"/>
                                    </span>
                                </div>
                            </div>
                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-400">Your PnL</p>
                                <h4 className="text-xl font-medium dark:text-white">$450.00</h4>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center m-4">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="font-medium text-green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path><path d="M7 14l5-5 5 5z"></path></svg><p className="text-sm font-bold text-green"> +10.02% </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between h-24 rounded border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                        <div className="flex items-center">
                            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                <div className="rounded-full bg-slate-200 p-3 dark:bg-navy-700">
                                    <span className="flex items-center text-brand-500 dark:text-white">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="h-7 w-7" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path></svg>
                                    </span>
                                </div>
                            </div>
                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-400">Total Trades</p>
                                <h4 className="text-xl font-medium dark:text-white">20</h4>
                            </div>
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

