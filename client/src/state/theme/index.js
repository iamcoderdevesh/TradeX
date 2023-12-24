import React from 'react'
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from 'state';

const ThemeButton = () => {

    const dispatch = useDispatch();
    const currentMode = useSelector((state) => state.global.mode);

    return (
        <>
            <button id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none rounded-lg text-sm p-2.5"
                onClick={() => dispatch(setMode())}>
                {currentMode === 'dark' ? (
                    <BsSunFill className="w-5 h-5" id="theme-toggle-light-icon" />
                ) : (
                    <BsFillMoonFill className="w-4 h-4" id="theme-toggle-dark-icon" />
                )}
            </button>
        </>
    )
}

export default ThemeButton;