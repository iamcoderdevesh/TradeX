import React from 'react'
import Navbar from 'layouts/MainLayout/Navbar';
import Sidebar from 'layouts/MainLayout/Sidebar';
import { Outlet } from "react-router-dom";
import { useStateContext } from 'context/ContextProvider';

const Layout = () => {

    const { activeMenu, showPopup } = useStateContext();

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className={`min-h-screen p-2 bg-gray-50 dark:bg-primary-dark ${activeMenu && 'md:ml-64'} md:p-4`}>
                <div className="p-2 mt-8 md:p-4">
                    <Outlet />
                </div>
            </div>
            {showPopup && <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}

        </>
    )
}

export default Layout
