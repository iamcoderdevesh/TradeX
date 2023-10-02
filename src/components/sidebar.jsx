import React from "react";
import { components } from "../data/sidebarData";

const sidebar = () => {
    return (
        <div>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-main-dark dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-main-dark">
                    <ul className="space-y-2 font-medium">
                        {
                            components.menu.map((items) => (
                                items.id === 5 ?
                                    <div key={items.id}>
                                        <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                            {items.icon}
                                            <span className="flex-1 ml-3 text-left whitespace-nowrap">{items.name}</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 10 6">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="m1 1 4 4 4-4" />
                                            </svg>
                                        </button>
                                        <ul id="dropdown-example" className="hidden py-2 space-y-2">
                                            {components.submenu.map((link) => (
                                                <li key={link.id}>
                                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                                                        {link.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    : <li key={items.id}>
                                        <a href="#"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                                            {items.icon}
                                            <span className="ml-3">{items.name}</span>
                                        </a>
                                    </li>
                            ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default sidebar;
