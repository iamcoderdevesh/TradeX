import React from 'react';
import TabPanel from '../'
import { DeleteButton } from 'components/common/buttons';
import ProfileForm from './forms/profileForm';

const General = () => {

  return (
    <div>
      <TabPanel />
      <div className="flex flex-col justify-center items-center">
        <ProfileForm />
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <h2 className="mb-2 sm:mb-2 text-sm font-bold text-gray-900 dark:text-white">Delete your account</h2>
                  <span className="text-sm text-gray-600 dark:text-white">Please note, deleting your account is a permanent action and will no be recoverable once completed.</span>
                </div>
                <div className="w-full flex sm:justify-end sm:items-start">
                  <DeleteButton id="profileBtn">Delete</DeleteButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General;