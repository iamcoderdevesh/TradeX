import React from 'react'
import Navbar from 'layouts/MainLayout/Navbar';
import Sidebar from 'layouts/MainLayout/Sidebar';
import { Outlet } from "react-router-dom";
import { useStateContext } from 'context/ContextProvider';

const Layout = () => {

    const { activeMenu } = useStateContext();
    
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className={`p-2 h-screen bg-gray-50 dark:bg-primary-dark ${activeMenu && 'md:ml-64'} md:p-4`}>
                <div className="p-2 mt-8 md:p-4">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
