import React from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import DateRange from 'components/common/calendar';
import { ProfilePopup, ModalPopup } from 'components/common/popup';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSidebar, setFilterPopup } from 'state';
import { capitalizeWords } from 'utils';
import ThemeButton from 'state/theme';
import { FilterAccountDropdown } from 'components/common/dropdown/accountDropdown';
import { FullScreenButton } from 'components/common/buttons';
import sampleExcel from 'sample/sample_import_trades.xlsx';

const Navbar = () => {

    const activeMenu = useSelector((state) => state.global.activeSidebar);
    const filterPopup = useSelector((state) => state.global.filterPopup);
    const dispatch = useDispatch();
    const location = useLocation();

    const accountId = useSelector((state) => state.account?.selectedAccount?.AccountId);
    
    return (
        <>
            <nav className={`fixed top-0 z-20 ${activeMenu && 'md:ml-64 md:w-[calc(100%-256px)]'} w-full bg-white border-b border-gray-200 dark:bg-main-dark dark:border-gray-700`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none dark:text-gray-400" onClick={() => dispatch(setActiveSidebar())}>
                                {activeMenu
                                    ? <AiOutlineMenuFold id="open" className="w-6 h-6" />
                                    : <AiOutlineMenuUnfold id="close" className="w-6 h-6" />}
                            </button>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{capitalizeWords(location.pathname)}</h2>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className='lg:hidden'>
                                <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none rounded-lg text-sm p-2.5" onClick={() => dispatch(setFilterPopup())}>
                                    <FaFilter className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="hidden lg:flex items-center">
                                {/* <DateRange range={true} /> */}
                                {
                                    location.pathname == '/import-trades'
                                        &&
                                        <div className=''>
                                            <a type="button" class="text-brand-300 border border-brand-300 hover:bg-brand-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-brand-300 dark:text-brand-300 dark:hover:text-white dark:hover:bg-brand-300" href={sampleExcel}>
                                                <svg class="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                                <span class="sr-only">Icon description</span>
                                            </a>
                                        </div>
                                }
                                <div className='w-48 mx-4'>
                                    <FilterAccountDropdown label={''} value={accountId} />
                                </div>
                            </div>
                            <div>
                                <ThemeButton />
                            </div>
                            <div>
                                <FullScreenButton />
                            </div>
                            <div className="flex items-center">
                                <ProfilePopup />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {filterPopup &&
                <ModalPopup
                    header={
                        <div>
                            <h3 className="text-base font-medium dark:text-white">Filters</h3>
                        </div>}
                    body={
                        <div className="flex flex-col justify-between">
                            <div className='my-2'>
                                {/* <label htmlFor="date-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Date Range</label>
                                <DateRange range={false} /> */}
                            </div>
                            <div className='my-2'>
                                <FilterAccountDropdown label={'Select Account'} value={accountId} />
                            </div>
                        </div>
                    } />
            }
        </>
    )
}

export default Navbar;