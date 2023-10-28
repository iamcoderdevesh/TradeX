import React, { useState } from 'react'
import TabPanel from '../'
import { IoClose } from "react-icons/io5";
import { SubmitButton, DeleteButton, ResetButton, IconButton } from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';
import Dropdown from 'components/common/dropdown/index';

const Accounts = () => {

  const [showAddAccount, setShowAddAccount] = useState(false);

  return (
    <div>
      <TabPanel />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">

            {/* Manage Account Section */}
            {!showAddAccount &&
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <h2 className="mb-2 sm:mb-2 text-sm font-bold text-gray-900 dark:text-white">MANAGE ACCOUNTS</h2>
                </div>
                <div className="w-full flex sm:justify-end sm:items-start">
                  <SubmitButton id="add-account" onClick={() => setShowAddAccount(!showAddAccount)}>+ ADD ACCOUNT</SubmitButton>
                </div>
                <div className="sm:col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                          Silver
                        </td>
                        <td className="px-6 py-4">
                          Laptop
                        </td>
                        <td className="px-6 py-4">
                          $2999
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Microsoft Surface Pro
                        </th>
                        <td className="px-6 py-4">
                          White
                        </td>
                        <td className="px-6 py-4">
                          Laptop PC
                        </td>
                        <td className="px-6 py-4">
                          $1999
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Magic Mouse 2
                        </th>
                        <td className="px-6 py-4">
                          Black
                        </td>
                        <td className="px-6 py-4">
                          Accessories
                        </td>
                        <td className="px-6 py-4">
                          $99
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }

            {/* Add Account Section */}
            {showAddAccount &&
              <div>
                <div className='flex justify-between items-center border-b dark:border-gray-600 pb-4 mb-4 sm:mb-5'>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Account</h2>
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowAddAccount(!showAddAccount)}>
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>
                <form>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className='col-span-2'>
                      <InputField label={"Account Name"} placeholder={"Ex.: Crpyto (Binance)"} id={"account-name"} type={"text"} htmlName={"account-name"} />
                    </div>
                    <div>
                      <Dropdown label={"Select Market"} id={"ddMarket"}
                        children={
                          <>
                            <option>Select Market</option>
                            <option>STOCKS</option>
                            <option>FOREX</option>
                            <option>CRYPTO</option>
                          </>
                        } />
                    </div>
                    <div>
                      <Dropdown label={"Select Broker"} id={"ddBroker"}
                        children={
                          <>
                            <option>Select Broker</option>
                            <option>Binance</option>
                          </>
                        } />
                    </div>
                    <div>
                      <InputField label={"Initial Balance"} placeholder={"Ex.: $10,000"} id={"initial=balance"} type={"number"} htmlName={"initial-balance"} />
                    </div>
                    <div>
                      <Dropdown label={"Select Currency"} id={"ddCurrency"}
                        children={
                          <>
                            <option>Select Currency</option>
                            <option>₹ (INR)</option>
                            <option>$ (US DOLLAR)</option>
                          </>
                        } />
                    </div>
                    <div className="flex flex-row items-start mt-5">
                      <ResetButton id="reset">Reset</ResetButton>
                      <SubmitButton id="importTrade">Submit</SubmitButton>
                    </div>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts;
