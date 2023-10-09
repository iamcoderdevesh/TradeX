import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { BiChevronDown } from "react-icons/bi";
import routes from "routes/routes";

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

    return (
        <div key={route.id}>
            <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example" >
                <div className="text-gray-500 dark:text-gray-400">
                    {route.icon}
                </div>
                <span className="flex-1 font-normal text-sm ml-3 text-left whitespace-nowrap dark:text-gray-400">
                    {route.name}
                </span>
                <BiChevronDown className="text-gray-500 dark:text-gray-400 w-6 h-6" />
            </button>
            <ul id="dropdown-example" className="hidden py-2 space-y-2">
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
    return (
        <div>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-main-dark dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-main-dark">
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
                                        active={isActive(route.path)}
                                    />
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
