import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { setFilterPopup } from 'state';
import LogoutButton from 'components/common/buttons/logoutButton';
import routes from "routes/routes";

export const ModalPopup = (props) => {

    const dispatch = useDispatch();

    const { header, body } = props;

    return (
        <div className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-y-scroll md:inset-0 min-h-screen max-h-full justify-center items-center sm:flex' onClick={() => dispatch(setFilterPopup())}>
            <div className="relative w-full max-w-5xl max-h-full p-4 mt-8 z-50 bg-white rounded-lg shadow-lg dark:bg-main-dark" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center my-2">
                    {header}
                    <div className="col">
                        <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => dispatch(setFilterPopup())}>
                            <IoClose className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                {body}
            </div>
        </div>
    )
}

export const ProfilePopup = () => {

    const userInfo = useSelector((state) => state.auth.userInfo, []);
    const { FirstName, Email } = userInfo || {};
    const [showProfile, setShowProfile] = useState(false);
    let ref = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!ref?.current?.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    return (
        <div className="flex items-center ml-3" ref={ref}>
            <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setShowProfile(!showProfile)} >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="user photo" />
                </button>
            </div>
            <div className={`${!showProfile && 'hidden'} w-52 fixed top-0 right-0 z-50 mt-14 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}>
                <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                        {FirstName}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        {Email}
                    </p>
                </div>
                <ul className="py-1" role="none">
                    {routes.profile.map((route) =>
                        <li key={route.id}>
                            <Link
                                to={`/${route.path}`}
                                onClick={() => setShowProfile(!showProfile)}>
                                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">{route.name}</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            </div>
        </div>
    )
}
