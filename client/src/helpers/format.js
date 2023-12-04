import React from 'react'
import { useSelector } from 'react-redux';

export const GetFomatedCurrency = (props) => {
    const currency = useSelector((state) => state.account.selectedCurrency, []);
    const amount = currency + parseFloat(props?.value).toFixed(2);

    return (
        <>
            {amount}
        </>
    )
}

export const GetFomatedPnl = (props) => {

    const { value, showCurrency = true } = props;
    const currency = useSelector((state) => state.account.selectedCurrency, []);

    const plusMinus = value?.toString()?.startsWith("-") ? '-' : '+';

    const output = plusMinus + (showCurrency ? currency : '') + value.toFixed(2) + (showCurrency ? '' : '%');

    return (
        <span className={value?.toString()?.startsWith("-") ? "text-red" : "text-green"}>{output}</span>
    )
}
