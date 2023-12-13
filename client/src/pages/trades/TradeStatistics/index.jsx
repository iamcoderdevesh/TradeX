import React from 'react';
import TradeTable from 'components/common/table/data-table';
import { useGetTradeStatisticsQuery } from 'state/api/trade/tradeApi';
import { useSelector } from 'react-redux';
import Statistics from 'components/common/stats';
import { TradeColumns } from 'components/common/table/data-table/columns';

const TradeStatistics = () => {

    const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
    const { data, isLoading } = useGetTradeStatisticsQuery({ id }, {
        refetchOnMountOrArgChange: true,
        skip: !id
    });

    return (
        <section className='h-full my-4 mt-8 lg:my-4'>
            <Statistics />
            <div className="bg-white dark:bg-main-dark h-full p-2 mt-2">
                <div className="p-2 mx-auto dark:text-white dark:fill-gray-400">
                    <TradeTable
                        data={data || []}
                        columns={TradeColumns}
                        pagination={true}
                        isEdit={true} />
                </div>
            </div>
        </section>
    )
}

export default TradeStatistics;