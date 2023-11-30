import React, { useState } from 'react'
import TabPanel from '../'
import { IoClose } from "react-icons/io5";
import { SubmitButton } from 'components/common/buttons';
import { DefaultTable } from 'components/common/table';
import { TagsColumns } from 'components/common/table/columns';
import TagForm from './forms/tagFrom';
import { useGetAllTagsQuery } from 'state/api/tags/tagApi';

const Tags = () => {

  const [showAddTags, setShowAddTags] = useState(false);
  const { data, isLoading } = useGetAllTagsQuery({
    refetchOnMountOrArgChange: true,
  });
  console.log(data);

  return (
    <div>
      <TabPanel />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">

            {/* Manage Account Section */}
            {!showAddTags &&
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <h2 className="mb-2 sm:mb-2 text-sm font-bold text-gray-900 dark:text-white">MANAGE TAGS</h2>
                </div>
                <div className="w-full flex sm:justify-end sm:items-start">
                  <SubmitButton id="add-account" onClick={() => setShowAddTags(!showAddTags)}>+ ADD TAGS</SubmitButton>
                </div>
                <div className="sm:col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg">
                  <DefaultTable data={data || []} columns={TagsColumns} />
                </div>
              </div>
            }

            {/* Add Account Section */}
            {showAddTags &&
              <div>
                <div className='flex justify-between items-center border-b dark:border-gray-600 pb-4 mb-4 sm:mb-5'>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Tags</h2>
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowAddTags(!showAddTags)}>
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>
                <TagForm />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tags;
