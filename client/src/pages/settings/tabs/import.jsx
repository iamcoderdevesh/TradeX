import React from 'react'
import TabPanel from '../'
import { DeleteButton } from 'components/common/buttons';
import { DefaultTable } from 'components/common/table';
import { ImportHistColumns, TagsColumns } from 'components/common/table/columns';
import { useGetImportTradeQuery } from 'state/api/trade/tradeApi';
import { useDeleteTagMutation, useGetTagDetailsQuery } from 'state/api/tags/tagApi';

const Imports = () => {

  // const { data, isLoading: isLoadingTag } = useGetTagDetailsQuery();
  const { data, isLoading } = useGetImportTradeQuery();
  // console.log(data);

  return (
    <div>
      <TabPanel />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <h2 className="mb-2 sm:mb-2 text-lg font-bold text-gray-900 dark:text-white">Import History</h2>
                </div>
                <div className="sm:col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg">
                  <DefaultTable
                    data={data || []}
                    columns={ImportHistColumns}
                    Id={'TagId'} />
                </div>
                {/* <div className="sm:col-span-2 flex sm:justify-end sm:items-start">
                  <DeleteButton id="clear-tags">CLEAR ALL TRADES</DeleteButton>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Imports;
