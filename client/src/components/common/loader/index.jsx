import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useSelector } from 'react-redux';

export const TopLoader = () => {

    const progress = useSelector((state) => state.global.isLoading);

    return (
        <>
            <LoadingBar
                color='#7265e6'
                height={4}
                progress={progress}
            />
        </>
    )
}

export const NavigateTopLoader = () => {

    const location = useLocation();
    const ref = useRef(null);

    useEffect(() => {
        ref.current && ref.current.continuousStart();
    }, [location]); // detect route changes using location.pathname

    return (
        <>
            <LoadingBar
                color='#7265e6'
                height={4}
                ref={ref}
            />
            <div className='min-h-screen bg-white dark:bg-primary-dark'></div>
        </>
    )
}