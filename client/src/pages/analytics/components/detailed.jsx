import React from 'react'
import ReturnsChart from 'components/charts/ReturnsChart';
import DetailedStats from './statistics';
import { GetFormatedPnl } from 'helpers/format';
import { useSelector } from 'react-redux';

const Detailed = () => {

  const data = useSelector((state) => state.account?.stats, []);
  const { netDailyPnl, totalReturns } = data || [];

  return (
    <>
      <div className="h-auto my-4 bg-white dark:bg-main-dark rounded-md shadow-sm">
        <DetailedStats />
      </div>
      <div className="flex flex-col">
        <h3 className='text-base font-medium dark:text-white mb-2'>Daily Returns</h3>
        <div className="rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
          <div className="flex m-4 mt-6">
            <h5 className="flex items-center justify-center leading-none text-base font-medium pb-2">
              <GetFormatedPnl value={netDailyPnl} showIcon={true} />
              <div className='ml-2'></div>
              <GetFormatedPnl value={totalReturns} showPercentage={true} showPlusMinus={false} showBracket={true} />
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400"></p>
          </div>
          <div className="w-full p-4 md:p-6 md:pt-0">
            <ReturnsChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Detailed;
