import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import routes from "routes/routes";
import { classNames } from "utils";

const TabPanel = () => {

    // Check if the current location is active
    const location = useLocation();
    const isActive = (routeName) => location.pathname.includes(routeName);

    return (
        <section className="sm:flex flex-col justify-center items-center">
            <div>
                <div className="my-3 mt-6">
                    <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>OVERVIEW</span>
                    <h3 className='text-2xl font-medium dark:text-white'>Account</h3>
                </div>
                <div className="sm:w-760 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-nowrap overflow-x-auto no-scrollbar -mb-px">
                        {
                            routes.tabs.map((route) =>
                                <li key={route.id} className="mr-2">
                                    <NavLink
                                        to={`/${route.path}`}>
                                        <span className={classNames("text-sm inline-block p-4 border-b-2 rounded-t-lg whitespace-nowrap",
                                            isActive(route.path) ? "active text-brand-100 border-brand-100 dark:text-white dark:border-brand-100"
                                                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                        )}>{route.name}</span>
                                    </NavLink>
                                </li>
                            )}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default TabPanel;