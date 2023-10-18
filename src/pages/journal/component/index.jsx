import React, { useState } from 'react';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import AreaChart from 'components/charts/AreaChart';

const Accordion = ({ status }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="w-full p-4 mt-8 sm:p-4 bg-white rounded-lg shadow dark:bg-main-dark">
            <div className="flex justify-between">
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
                    <button className="w-8 h-8 bg-gray-300 dark:bg-gray-400 rounded-full flex justify-center items-center cursor-pointer" onClick={() => setIsActive(!isActive)}>
                        <FaChevronDown className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:gap-2 my-2 sm:grid-cols-3 lg:grid-cols-6 h-full">
                <div className="chart h-[85px]">
                    <AreaChart color={`${status ? '#089981' : '#f23645'}`} />
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Winrate</h3>
                    <p className='text-base font-bold dark:text-white'>100.00%</p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Total Trades</h3>
                    <p className='text-base font-bold dark:text-white'>3</p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Wins / Losses</h3>
                    <p className='text-base font-bold dark:text-white'>3W / 2L</p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Fees & Charges</h3>
                    <p className='text-base font-bold dark:text-white'>$50.12</p>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <h3 className='text-sm font-normal text-gray-400'>Gross PnL</h3>
                    <p className='text-base font-bold dark:text-white'>$1300.12</p>
                </div>
            </div>
            {isActive && <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </div>
    );
};

export default Accordion;