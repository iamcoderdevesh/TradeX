import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { BiChevronDown } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import routes from "routes/routes";
import { useStateContext } from 'context/ContextProvider';

// SidebarLink component for individual links
const SidebarLink = ({ to, icon, name, active, submenu }) => (
    <NavLink
        to={to}
        className={`flex items-center p-2 font-${active ? 'bold' : 'normal'} text-${active ? 'brand-500 dark:text-white' : 'gray-900'} rounded-lg dark:text-${active ? 'white' : 'gray-400'} hover:bg-gray-200 dark:hover:bg-gray-700`}>
        <div className={`${submenu && 'w-5 h-5'} text-${active ? 'brand-500 dark:text-white' : 'gray-500 dark:text-gray-400 dark:group-hover:text-white group-hover:text-black'}`}>{icon}</div>
        <span className="ml-3 text-sm">{name}</span>
    </NavLink>
);

// SidebarMenu component for rendering menus
const SidebarMenu = ({ route }) => {
    const location = useLocation();

    // Check if the current location is active
    const isActive = (routeName) => location.pathname.includes(routeName);
    
    const [expandedMenu, setExpandedMenu] = useState(false);

    const handleExpandedMenu = () => {
        expandedMenu ? setExpandedMenu(false) : setExpandedMenu(true);
    }

    return (
        <div key={route.id}>
            <button type="button" onClick={handleExpandedMenu} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                <div className={`text-${!expandedMenu ? 'brand-500 dark:text-white' : 'gray-500 dark:text-gray-400'}`}>{route.icon}</div>
                <span className={`flex-1 font-normal text-sm ml-3 text-left whitespace-nowrap ${!expandedMenu ? 'text-brand-500 dark:text-white font-semibold' : 'dark:text-gray-400'}`}>{route.name}</span>
                <BiChevronDown className={`text-${!expandedMenu ? 'brand-500 dark:text-white' : 'gray-500 dark:text-gray-400'} w-6 h-6`} />
            </button>
            <ul id="dropdown-example" className={`${expandedMenu && 'hidden'} py-2 space-y-2`}>
                {routes.submenu.map((link) => (
                    <li key={link.id}>
                        <SidebarLink
                            to={`/${link.path}`}
                            name={link.name}
                            submenu={true}
                            active={isActive(link.path)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Sidebar = () => {
    const location = useLocation();

    // Check if the current location is active
    const isActive = (routeName) => location.pathname.includes(routeName);

    const { activeMenu, setActiveMenu } = useStateContext();

    const handleSidebar = () => {
        activeMenu ? setActiveMenu(false) : setActiveMenu(true);
    }

    return (
        <div>
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full ${activeMenu ? 'md:translate-x-0 -translate-x-full' : 'max-md:transform-none'} border-r border-gray-200 dark:border-gray-700`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-main-dark">
                    <div className="flex justify-between center">
                        <a href="https://intensional-chair.000webhostapp.com/" className="flex items-center pl-2.5 mb-5">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">TradeX</span>
                        </a>
                        <button onClick={handleSidebar} className="h-6 w-6">
                            <IoClose className="md:hidden block h-6 w-6 dark:text-white" />
                        </button>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {routes.menu.map((route) =>
                            route.id === 5 ? (
                                <SidebarMenu key={route.id} route={route} />
                            ) : (
                                <li key={route.id}>
                                    <SidebarLink
                                        to={`/${route.path}`}
                                        icon={route.icon}
                                        name={route.name}
                                        active={isActive(route.path)} />
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
