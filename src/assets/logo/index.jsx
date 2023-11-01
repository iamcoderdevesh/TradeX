import React from 'react'
import { IoMdJournal } from "react-icons/io";

const Logo = () => {
    return (
        <a href="https://intensional-chair.000webhostapp.com/" className="flex items-center pl-2.5 mb-6">
            <IoMdJournal className="h-6 w-6 text-brand-500 mr-2 sm:w-10 sm:h-10" alt="TradeX Logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">TradeX</span>
        </a>
    )
}

export default Logo
