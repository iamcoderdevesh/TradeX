import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import DataTable from 'components/common/table/data-table';
import { useDeleteTradeMutation, useGetTradeStatisticsQuery } from 'state/api/trade/tradeApi';
import { useSelector } from 'react-redux';
import Statistics from 'components/common/stats';

const TradeStatistics = () => {

    const navigate = useNavigate();
    const useNavigateSearch = () => {
        return (pathname, params) =>
            navigate(`${pathname}?${createSearchParams(params)}`);
    };
    const navigateSearch = useNavigateSearch();

    const id = useSelector((state) => state.account?.selectedAccount?.AccountId);
    const { data, isLoading } = useGetTradeStatisticsQuery({ id }, {
        refetchOnMountOrArgChange: true,
        skip: !id
    });


    const [deleteTrade, { isLoading: isLoadingDelete }] = useDeleteTradeMutation();
    const handleDeleteClick = async (TradeId) => {
        try {
            await deleteTrade({ AccountId: id, TradeId }).unwrap();
        } catch (error) {
            return;
        }
    };

    return (
        <section className='h-full my-4 mt-8 lg:my-4'>
            <Statistics />
            <div className="bg-white dark:bg-main-dark h-full p-2 mt-2">
                <div className="p-2 mx-auto dark:text-white dark:fill-gray-400">
                    <DataTable
                        data={data || []}
                        pagination={true}
                        isEdit={true}
                        handleClick={(TradeId) => {
                            navigateSearch('/tracking', { id: TradeId });
                        }}
                        handleDeleteClick={handleDeleteClick}
                        handleEditClick={(TradeId) => {
                            navigateSearch('/add-Trade', { id: TradeId });
                        }}
                        Id={'TradeId'} />
                </div>
            </div>
        </section>
    )
}

export default TradeStatistics;