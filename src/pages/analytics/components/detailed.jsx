import React from 'react'
import DataTable from 'components/common/table';
import { AiFillCaretUp } from "react-icons/ai";
import ReturnsChart from 'components/charts/ReturnsChart';

const Detailed = () => {

  const data = [
    {
      Symbol: "Apple MacBook Pro 17",
      Status: "WIN",
    },
    {
      Symbol: "Microsoft Surface Pro",
      Status: "LOSS",
    },
    {
      Symbol: "Magic Mouse 2",
      Status: "LOSS",
    },
  ]

  const columns = [
    {
      accessorKey: "Symbol",
      header: () => <span>Symbol</span>,
      cell: ({ row }) => <div className="capitalize">{row.getValue("Symbol")}</div>
    },
    {
      accessorKey: "Status",
      header: () => <span>Status</span>,
      cell: ({ row }) => <div className="capitalize">{row.getValue("Status")}</div>
    },
  ]

  return (
    <>
      <div className="h-auto my-4 bg-white dark:bg-main-dark rounded-md shadow-sm">
        <div className="overflow-hidden min-w-max">
          <div className='headings p-4'>
            <h3 className="text-base font-semibold dark:text-white">YOUR STATS</h3>
            <span className="text-sm font-medium dark:text-white">(All Dates)</span>
          </div>
          <div className="grid gap-y-6 md:grid-cols-2 p-4 text-sm font-medium gap-x-8">
            <DataTable data={data} columns={columns} pagination={false} />
            <DataTable data={data} columns={columns} pagination={false} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className='text-base font-medium dark:text-white mb-2'>Daily Returns</h3>
        <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
          <div className="flex m-4 mt-6">
            <AiFillCaretUp className="text-green mr-1" />
            <h5 className="leading-none text-base font-medium text-green pb-2">$2,450 (45.67%)</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400"></p>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:bg-main-dark p-4 md:p-6 md:pt-0">
            <ReturnsChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Detailed;
