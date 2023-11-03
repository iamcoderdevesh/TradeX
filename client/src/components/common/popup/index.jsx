import React from 'react'

import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setFilterPopup } from 'state';

const ModalPopup = (props) => {

    const dispatch = useDispatch();

    const { header, body } = props;

    return (
        <div className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-y-scroll md:inset-0 min-h-screen max-h-full justify-center items-center sm:flex'  onClick={() => dispatch(setFilterPopup())}>
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

export default ModalPopup
