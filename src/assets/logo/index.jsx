import React from 'react'
import { IoMdJournal } from "react-icons/io";

const Logo = (props) => {
    const { margin, height } = props;
    
    return (
        <a href="https://intensional-chair.000webhostapp.com/" className={`flex items-center pl-2.5 ${margin}`}>
            <IoMdJournal className={`h-6 w-6 text-brand-300 mr-2 ${height}`} alt="TradeX Logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">TradeX</span>
        </a>
    )
}

export default Logo
