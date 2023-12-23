import React, { useEffect } from 'react';
import { ToastContainer } from 'components/common/alerts';
import { useRefreshQuery } from 'state/api/user/userApi';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { TopLoader } from 'components/common/loader';

const Prefetch = () => {

    const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
    const navigate = useNavigate();
    const { data, error, isLoading: isLoadingRefresh } = useRefreshQuery(isAuthenticated, {
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        if (!data?.success && error && !isAuthenticated) {
            navigate('/auth/login');
        }
    }, [data, isLoadingRefresh]);

    return (
        <>
            <TopLoader />
            <ToastContainer />
            <Outlet />
        </>
    )
}

export default Prefetch;
