import React, { useState } from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useStateContext } from 'context/ContextProvider';
import { NavLink } from 'react-router-dom';
import routes from "routes/routes";

const Navbar = () => {

    const { setMode, currentMode, activeMenu, setActiveMenu } = useStateContext();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <nav className={`fixed top-0 z-40 ${activeMenu && 'md:ml-64 md:w-[calc(100%-256px)]'} w-full bg-white border-b border-gray-200 dark:bg-main-dark dark:border-gray-700`}>
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none dark:text-gray-400" onClick={() => setActiveMenu(!activeMenu)}>
                            {activeMenu
                                ? <AiOutlineMenuFold id="open" className="w-6 h-6" />
                                : <AiOutlineMenuUnfold id="close" className="w-6 h-6" />}
                        </button>
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
                                                <NavLink
                                                    to={`/${route.path}`}
                                                    onClick={() => setShowProfile(!showProfile)}>
                                                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">{route.name}</span>
                                                </NavLink>
                                            </li>
                                        )}
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
