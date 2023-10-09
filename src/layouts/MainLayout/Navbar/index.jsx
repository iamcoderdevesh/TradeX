import React from 'react'
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useStateContext } from 'context/ContextProvider';

const Navbar = () => {

    const { setMode, currentMode } = useStateContext(); 

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300 dark:bg-main-dark dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none dark:text-gray-400">
                            <span className="sr-only">Open sidebar</span>
                            <AiOutlineMenu id="open" className="w-6 h-6" />
                            <AiOutlineCloseCircle id="close" className="hidden w-6 h-6" />
                        </button>
                        <a href="https://intensional-chair.000webhostapp.com" className="flex ml-2 md:mr-24">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">TradeX</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <button id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none rounded-lg text-sm p-2.5"
                            onClick={setMode}>
                            {currentMode === 'dark' ? (
                                <BsSunFill className="w-5 h-5" id="theme-toggle-light-icon" />
                            ) : (
                                <BsFillMoonFill className="w-4 h-4" id="theme-toggle-dark-icon" />
                            )}
                        </button>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="user photo" />
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
