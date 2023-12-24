import React, { useEffect } from 'react';
import Navbar from 'layouts/MainLayout/Navbar';
import Sidebar from 'layouts/MainLayout/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import { TopLoader } from 'components/common/loader';
import { ToastContainer } from 'components/common/alerts';
import { useGetStatisticsQuery } from 'state/api/trade/tradeApi';
import { useRefreshQuery } from 'state/api/user/userApi';
import { setMode } from 'state';

export const Layout = () => {

    const activeMenu = useSelector((state) => state.global.activeSidebar);
    const pnlPopup = useSelector((state) => state.global.pnlPopup);
    const filterPopup = useSelector((state) => state.global.filterPopup);

    const id = useSelector((state) => state.account?.selectedAccount?.AccountId, []);
    const { isLoading } = useGetStatisticsQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id,
    });

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className={`min-h-screen p-2 bg-gray-50 dark:bg-primary-dark ${activeMenu && 'md:ml-64'} md:p-4`}>
                <div className="p-2 mt-8 md:p-4">
                    <Outlet />
                </div>
            </div>
            {(pnlPopup || filterPopup) && <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
        </>
    )
}

export const MainLayout = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
    const navigate = useNavigate();
    const { data, isLoading: isLoadingRefresh } = useRefreshQuery(isAuthenticated, {
        refetchOnMountOrArgChange: true,
    });
    
    useEffect(() => {
        if ((data?.message === "Unauthorized" || data?.message === "Forbidden") && !isAuthenticated) {
            navigate('/auth/login');         
        }

        const mode = localStorage.getItem("themeMode");
        mode && dispatch(setMode(mode));

    }, [data, isLoadingRefresh, isAuthenticated]);

    return (
        <>
            <TopLoader />
            <ToastContainer />
            <Outlet />
        </>
    )
}
