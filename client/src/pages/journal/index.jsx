import React from 'react';
import { useGetJournalDetailsQuery } from 'state/api/journal/journalApi';
import { useSelector } from 'react-redux';
import JournalAccordion from './accordion';

const Journal = () => {

    const id = useSelector((state) => state.account?.selectedAccount?.AccountId) || 0;
    const { data: JournalDetails, isLoading } = useGetJournalDetailsQuery({ id }, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <>
            {
                JournalDetails?.map((journalDetails) => (
                    <JournalAccordion journal={journalDetails} />
                ))
            }
        </>
    );
}

export default Journal;
