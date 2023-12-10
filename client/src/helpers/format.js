import React from 'react'
import { useSelector } from 'react-redux';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

export const GetFormatedCurrency = (props) => {
    const { value = 0 } = props;
    const currency = useSelector((state) => state.account.selectedCurrency, []) || '';
    const amount = currency + parseFloat(value).toFixed(2);

    return (
        <>
            {amount}
        </>
    )
}

export const GetFormatedPnl = (props) => {

    const { value = 0, showCurrency = true, showPlusMinus = true, showPercentage = false, showIcon = false, showBracket = false } = props;
    const currency = useSelector((state) => state.account.selectedCurrency, []) || '';

    const conVal = parseInt(value);
    const sign = showPlusMinus ? (conVal > 0 ? '+' : conVal < 0 ? '-' : '') : '';
    const output = sign + ((showCurrency && !showPercentage) ? currency : '') + (Math.abs(parseFloat(value)).toFixed(2)) + (showPercentage ? '%' : '');

    return (
        <>
            {showIcon ? (
                conVal < 0 ? <AiFillCaretDown className="text-red mr-1" /> : <AiFillCaretUp className="text-green mr-1" />
            ) : null}
            <span className={conVal < 0 ? "text-red" : conVal > 0 ? "text-green" : 'dark:text-white'}>
                {showBracket ? ('(' + output + ')') : output}
            </span>
        </>
    )
}
