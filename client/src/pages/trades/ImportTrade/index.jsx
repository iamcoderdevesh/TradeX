import React from 'react'
import Dropdown from 'components/common/dropdown';
import { SubmitButton, ResetButton } from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';

const ImportTrade = () => {
  return (
    <>
      <div className="flex">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">Import Your Trades</h2>
            <form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className='col-span-2 sm:col-span-1'>
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
                <div className='col-span-2 sm:col-span-1'>
                  <Dropdown label={"Select Account"} id={"ddPortfolio"}
                    children={
                      <>
                        <option>Select Account</option>
                        <option>Default</option>
                      </>
                    } />
                </div>
                <div className="col-span-2">
                  <InputField label={"Upload Your CSV File"} placeholder={"Choose a file"} id={"fileCSV"} type={"file"} htmlName={"csvfile"} />
                </div>
                <div className='col-span-2'>
                  <InputField label={"Description"} placeholder={"Add Description"} id={"tag-description"} type={"textArea"} htmlName={"tag-description"} />
                </div>
                <div className="flex flex-row items-start mt-5">
                  <ResetButton id="reset">Reset</ResetButton>
                  <SubmitButton id="importTrade">Submit</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImportTrade;
