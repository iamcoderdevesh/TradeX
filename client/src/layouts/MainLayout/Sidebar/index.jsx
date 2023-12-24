import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { BiChevronDown } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoMdJournal } from "react-icons/io";
import routes from "routes/routes";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSidebar } from 'state'
import Logo from "assets/logo/index";
import useIsMobile from "helpers/resize";

// SidebarLink component for individual links
const SidebarLink = ({ to, icon, name, active, submenu, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={`flex items-center py-3 px-4 font-medium text-${active ? 'brand-100' : 'gray-900'} dark:text-${active ? 'white border-r-brand-100 border-r-2 bg-brand-50 dark:bg-gray-700' : 'gray-400'} hover:bg-brand-50 dark:hover:bg-gray-700`}>
        <div className={`text-${active ? 'brand-100' : 'gray-500 dark:text-gray-400 dark:group-hover:text-white group-hover:text-black'} ${submenu ? 'w-5 h-5' : ''}`}>{icon}</div>
        <span className="ml-3 text-xs">{name}</span>
    </NavLink>
);

// SidebarMenu component for rendering menus
const SidebarMenu = ({ route }) => {
    const location = useLocation();

    // Check if the current location is active
    const isActive = (routeName) => location.pathname.includes(routeName);

    const dispatch = useDispatch();
    const [expandedMenu, setExpandedMenu] = useState(false);
    const isMobile = useIsMobile();
    
    return (
        <div key={route.id}>
            <button type="button" onClick={() => setExpandedMenu(!expandedMenu)} className="flex items-center w-full py-3 px-4 text-base text-gray-900 transition duration-75 hover:bg-brand-50 dark:text-white dark:hover:bg-gray-700">
                <div className={`text-${expandedMenu ? 'brand-100 dark:text-white' : 'gray-500 dark:text-gray-400'}`}>{route.icon}</div>
                <span className={`flex-1 font-medium text-xs ml-3 text-left whitespace-nowrap ${expandedMenu ? 'text-brand-100 dark:text-white font-semibold' : 'dark:text-gray-400'}`}>{route.name}</span>
                <BiChevronDown className={`text-${expandedMenu ? 'brand-100 dark:text-white' : 'gray-500 dark:text-gray-400'} w-6 h-6`} />
            </button>
            <ul id="dropdown-example" className={`${!expandedMenu && 'hidden'}`}>
                {routes.submenu.map((link) => (
                    //Skip Tracking Page in (submenu) 
                    link.id !== 2 && <li key={link.id}>
                        <SidebarLink
                            to={`/${link.path}`}
                            name={link.name}
                            submenu={true}
                            onClick={() => isMobile && dispatch(setActiveSidebar())}
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
    const isActive = (routeName) => {
        if (location.pathname === "/" && routeName.includes('dashboard')) {
            return true;
        }
        return location.pathname.includes(routeName)
    };

    const activeMenu = useSelector((state) => state.global.activeSidebar);
    const dispatch = useDispatch();
    const isMobile = useIsMobile();

    return (
        <div>
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-30 0 w-64 h-screen transition-transform -translate-x-full ${activeMenu ? 'md:translate-x-0 -translate-x-full' : 'max-md:transform-none'} border-r border-gray-200 dark:border-gray-700`}>
                <div className="h-full py-4 overflow-y-auto bg-white dark:bg-main-dark">
                    <div className="flex justify-between center px-3 pb-4">
                        <Logo margin={"mb-2"} height={"sm:h-7"} />
                        <button onClick={() => dispatch(setActiveSidebar())} className="h-6 w-6">
                            <IoClose className="md:hidden block h-6 w-6 dark:text-white" />
                        </button>
                    </div>
                    <ul className="font-medium">
                        {routes.menu.map((route) =>
                            route.id === 4 ? (
                                <SidebarMenu key={route.id} route={route} />
                            ) : (
                                <li key={route.id}>
                                    <SidebarLink
                                        to={`/${route.path}`}
                                        icon={route.icon}
                                        name={route.name}
                                        submenu={false}
                                        onClick={() => isMobile && dispatch(setActiveSidebar())}
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
