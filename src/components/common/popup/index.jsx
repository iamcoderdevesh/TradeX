import React from 'react'
import { useStateContext } from 'context/ContextProvider';
import { IoClose } from "react-icons/io5";

const ModalPopup = (props) => {

    const { showPopup, setShowPopup } = useStateContext();
    const { header, body } = props;

    return (
        <div className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center flex'>
            <div className="relative w-full max-w-5xl max-h-full p-8 mt-8 sm:p-4 z-50 bg-white rounded-lg shadow-lg dark:bg-main-dark">
                <div className="flex justify-between items-center my-2">
                    {header}
                    <div className="col">
                        <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowPopup(!showPopup)}>
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
