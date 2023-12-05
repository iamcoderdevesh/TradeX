import React from 'react';
import DataTable from 'components/common/table/data-table';
import { useGetTradeDetailsQuery } from 'state/api/trade/tradeApi';
import { useSelector } from 'react-redux';
import Statistics from 'components/common/stats';

const TradeStatistics = () => {

    const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
    const { data, isLoading } = useGetTradeDetailsQuery(id, {
        refetchOnMountOrArgChange: true,
    });
    
    return (
        <section className='h-full my-4 mt-8 lg:my-4'>
            <Statistics />
            <div className="bg-white dark:bg-main-dark h-full p-2 mt-2">
                <div className="p-2 mx-auto dark:text-white dark:fill-gray-400">
                    <DataTable data={data || []} pagination={true} />
                </div>
            </div>
        </section>
    )
}

export default TradeStatistics;