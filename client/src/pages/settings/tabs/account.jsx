import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import TabPanel from '../'
import { IoClose } from "react-icons/io5";
import { SubmitButton } from 'components/common/buttons';
import { DefaultTable } from 'components/common/table';
import { AccountColumns } from 'components/common/table/columns';
import AccountForm from './forms/accountForm';
import { useDeleteAccountMutation, useGetAllAccountDetailsQuery } from 'state/api/accounts/accountApi';

const Accounts = () => {
  
  const navigate = useNavigate();
  const [showAddAccount, setShowAddAccount] = useState(false);

  const useNavigateSearch = () => {
    return (pathname, params) =>
    navigate(`${pathname}?${createSearchParams(params)}`);
  };
  const navigateSearch = useNavigateSearch();

  const { data, isLoading: isLoadingAcc } = useGetAllAccountDetailsQuery();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleDeleteClick = async (accountId) => {
    try {
      await deleteAccount({ AccountId: accountId }).unwrap();
    } catch (error) {
      return;
    }
  };

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
                  <SubmitButton id="add-account" onClick={() => {
                    setShowAddAccount(!showAddAccount);
                    navigate('/settings/accounts');
                  }}>+ ADD ACCOUNT</SubmitButton>
                </div>
                <div className="sm:col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg">
                  <DefaultTable
                    data={data?.account || []}
                    columns={AccountColumns}
                    isEdit={true}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={(AccountId) => {
                      setShowAddAccount(true);
                      navigateSearch('/settings/accounts', { accountId: AccountId });
                    }}
                    Id={'AccountId'} />
                </div>
              </div>
            }

            {/* Add Account Section */}
            {showAddAccount &&
              <>
                <div className='flex justify-between items-center border-b dark:border-gray-600 pb-4 mb-4 sm:mb-5'>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Account</h2>
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowAddAccount(!showAddAccount)}>
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>
                <AccountForm setShowAccountPage={setShowAddAccount} />
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts;