import React, { useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { useStateContext } from 'context/ContextProvider';
import { Link, useLocation } from 'react-router-dom';
import routes from "routes/routes";
import Dropdown from 'components/common/dropdown';
import DateRange from 'components/common/calendar';
import ModalPopup from 'components/common/popup';

const Navbar = () => {

    // Check if the current location is active
    const location = useLocation();

    const { setMode, currentMode, activeMenu, setActiveMenu, filterPopup, setFilterPopup } = useStateContext();
    const [showProfile, setShowProfile] = useState(false);

    const capitalizeWords = (str) => {
        if (str.includes("settings")) {
            str = str.replace(str, "settings");
        }
        str = str.replace(/\//i, "");
        str = str.replace(/-/i, " ");
        return str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <>
            <nav className={`fixed top-0 z-20 ${activeMenu && 'md:ml-64 md:w-[calc(100%-256px)]'} w-full bg-white border-b border-gray-200 dark:bg-main-dark dark:border-gray-700`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none dark:text-gray-400" onClick={() => setActiveMenu(!activeMenu)}>
                                {activeMenu
                                    ? <AiOutlineMenuFold id="open" className="w-6 h-6" />
                                    : <AiOutlineMenuUnfold id="close" className="w-6 h-6" />}
                            </button>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{capitalizeWords(location.pathname)}</h2>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className='lg:hidden'>
                                <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none rounded-lg text-sm p-2.5" onClick={() => setFilterPopup(!filterPopup)}>
                                    <FaFilter className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="hidden lg:flex items-center">
                                <div className='w-56'>
                                    <DateRange range={true} />
                                </div>
                                <div className='w-48 mx-4'>
                                    <Dropdown id={"ddBroker"} label={''}
                                        children={
                                            <>
                                                <option>Default</option>
                                            </>
                                        } />
                                </div>
                            </div>
                            <div>
                                <button id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none rounded-lg text-sm p-2.5"
                                    onClick={setMode}>
                                    {currentMode === 'dark' ? (
                                        <BsSunFill className="w-5 h-5" id="theme-toggle-light-icon" />
                                    ) : (
                                        <BsFillMoonFill className="w-4 h-4" id="theme-toggle-dark-icon" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center ml-3">
                                    <div>
                                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            onClick={() => setShowProfile(!showProfile)} >
                                            <span className="sr-only">Open user menu</span>
                                            <img className="w-8 h-8 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="user photo" />
                                        </button>
                                    </div>
                                    <div className={`${!showProfile && 'hidden'} fixed top-0 right-0 z-50 mt-14 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                Neil Sims
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                                neil.sims@flowbite.com
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            {routes.profile.map((route) =>
                                                <li key={route.id}>
                                                    <Link
                                                        to={`/${route.path}`}
                                                        onClick={() => setShowProfile(!showProfile)}>
                                                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">{route.name}</span>
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link
                                                    to={"/auth/login"}
                                                    onClick={() => setShowProfile(!showProfile)}>
                                                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {filterPopup &&
                <ModalPopup
                    header={
                        <div>
                            <h3 className="text-base font-medium dark:text-white">Filters</h3>
                        </div>}
                    body={
                        <div className="flex flex-col justify-between">
                            <div className='my-2'>
                                <label htmlFor="date-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Date Range</label>
                                <DateRange range={false} />
                            </div>
                            <div className='my-2'>
                                <label htmlFor="date-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Account</label>
                                <Dropdown id={"ddBroker"} label={''}
                                    children={
                                        <>
                                            <option>Default</option>
                                        </>
                                    } />
                            </div>
                        </div>
                    } />
            }
        </>
    )
}

export default Navbar;
