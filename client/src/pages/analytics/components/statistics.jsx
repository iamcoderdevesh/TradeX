import React from 'react';
import { KeyValueTable } from 'components/common/table';
import { useGetDetailedStatisticsQuery } from 'state/api/trade/tradeApi';
import { useSelector } from 'react-redux';

const DetailedStats = () => {

  const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
  const type = 'detailed';
  const { data, isLoading } = useGetDetailedStatisticsQuery({
    id,
    type: "detailed"
  }, {
    refetchOnMountOrArgChange: true,
  });

  const stats_data = data
    ? Object.entries(data).map(([key, value]) => {
      const formattedKey = key.split(/(?=[A-Z])/).join(' ');
      return { key: formattedKey, value: value };
    }) : [];

  return (
    <>
      <div className='headings p-4'>
        <h3 className="text-base font-semibold dark:text-white">YOUR STATS</h3>
        <span className="text-sm font-medium dark:text-white">(All Dates)</span>
      </div>
      <div className="grid gap-y-6 md:grid-cols-2 p-4 text-sm font-medium gap-x-8">
        <KeyValueTable data={stats_data?.slice(0, 16)} />
        <KeyValueTable data={stats_data?.slice(16, 32)} />
      </div>
    </>
  )
}

export default DetailedStats;