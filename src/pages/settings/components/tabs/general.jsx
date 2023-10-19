import React from 'react'
import TabPanel from '../'
import Button from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';

const General = () => {
  return (
    <div>
      <TabPanel />
      <div className="flex justify-center items-center">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">General Settings</h2>
            <form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <InputField label={"First Name"} id={"firstName"} type={"text"} htmlName={"firstName"} />
                </div>
                <div className="w-full">
                  <InputField label={"Last Name"} id={"lastName"} type={"text"} htmlName={"lastName"} />
                </div>
                <div className="sm:col-span-2">
                  <InputField label={"Email"} id={"email"} type={"email"} htmlName={"email"} />
                </div>
                <div className="w-full">
                  <InputField label={"Phone"} id={"phone"} type={"phone"} htmlName={"phone"} />
                </div>
                <div className="w-full">
                  <InputField label={"Birthday"} id={"birthday"} type={"date"} htmlName={"birthday"} />
                </div>
                <div className="sm:col-span-2">
                  <InputField label={"Your avatar"} placeholder={"Choose a file"} id={"ProfileImg"} type={"file"} htmlName={"profileImg"} />
                </div>
                <div className="flex flex-row items-center mt-5">
                  <Button type="reset" id="reset" label="Reset" buttonClass="inline-flex items-center px-5 py-2.5  mr-4 text-xs sm:text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600" />
                  <Button type="submit" id="importTrade" label="Submit" buttonClass="inline-flex items-center px-5 py-2.5 text-xs sm:text-sm font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General