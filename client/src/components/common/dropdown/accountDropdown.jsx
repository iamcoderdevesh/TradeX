import React from 'react';
import Dropdown from './index';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAccount, setSelectedCurrencySymbol } from 'state/api/accounts/accountSlice';

const AccountDropdown = (props) => {

    const AccountInfo = useSelector((state) => state.account.accountInfo, []);

    return (
        <>

            <Dropdown id={"ddAccount"} children={props.children} htmlName={props.htmlName} label={props.label} errorMsg={props.errorMsg} onChange={props.onChange} onBlur={props.onBlur} value={props.value}
                children={
                    <>
                        <option value={0}>Select Account</option>
                        {
                            AccountInfo?.map((account) => (
                                <option key={account.AccountId} value={account.AccountId}>{account.AccountName}</option>
                            ))
                        }
                    </>
                } />
        </>
    )
}

const FilterAccountDropdown = (props) => {

    const { label, value } = props;

    const AccountInfo = useSelector((state) => state.account.accountInfo, []);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const selectedAccount = AccountInfo.find(account => account.AccountId === parseInt(e.target.value));
        if (selectedAccount) {
            const CurrencySymbol = selectedAccount?.Currency?.toString()?.charAt(0);
            dispatch(setSelectedAccount(selectedAccount));
            dispatch(setSelectedCurrencySymbol(CurrencySymbol));
        }
    }

    return (
        <>
            <Dropdown id={"ddAccount"} onChange={handleChange} label={label} value={value}
                children={
                    <>
                        <option value={0}>Select Account</option>
                        {
                            AccountInfo?.map((account) => (
                                <option key={account.AccountId} value={account.AccountId}>{account.AccountName}</option>
                            ))
                        }
                    </>
                } />
        </>
    )
}

export { AccountDropdown, FilterAccountDropdown };