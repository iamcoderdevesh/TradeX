import React from 'react'
import Dropdown from 'components/common/dropdown';
import Button from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';

const ImportTrade = () => {
  return (
    <div className="h-screen">
      <div className="flex">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">Import Your Trades</h2>
            <form>
              <div className="grid gap-4 sm:grid-cols-1 sm:gap-6">
                <div>
                  <Dropdown label={"Select Broker"} id={"ddBroker"}
                    children={
                      <>
                        <option>Select Broker</option>
                        <option>ZERODHA</option>
                        <option>ANGLE ONE</option>
                        <option>UPSTOX</option>
                        <option>DHAN</option>
                      </>
                    } />
                </div>
                <div>
                  <Dropdown label={"Select Profolio"} id={"ddPortfolio"}
                    children={
                      <>
                        <option>Select Broker</option>
                        <option>Default</option>
                      </>
                    } />
                </div>
                <div>
                  <div className="">
                    <InputField label={"Upload Your CSV File"} placeholder={"Choose a file"} id={"fileCSV"} type={"file"} htmlName={"csvfile"} />
                  </div>
                </div>
                <div className="flex flex-row items-center mt-5">
                  <Button type="reset" id="reset" label="Reset" buttonClass="inline-flex items-center px-5 py-2.5  mr-4 text-xs sm:text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600" />
                  <Button type="submit" id="importTrade" label="Import Trade" buttonClass="inline-flex items-center px-5 py-2.5 text-xs sm:text-sm font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportTrade;
