import React from 'react';
import { DefaultTable } from 'components/common/table';
import { RecentTradeCols } from 'components/common/table/columns';
import { useGetRecentTradeQuery } from 'state/api/trade/tradeApi';
import { useSelector } from 'react-redux';

const RecentTrades = () => {

    const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
    const { data, isLoading } = useGetRecentTradeQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id
    });

    return (
        <div>
            <h3 className='text-base font-medium dark:text-white my-4'>Recent Trades</h3>
            <div className="flex flex-col h-auto mb-4 rounded-md border border-gray-200 dark:border-gray-900 shadow-sm bg-white dark:bg-main-dark">
                <DefaultTable columns={RecentTradeCols} data={data || []} />
            </div>
        </div>
    )
}

export default RecentTrades
