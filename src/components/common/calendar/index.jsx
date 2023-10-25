import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRange = () => {

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    return (
        <Datepicker
            primaryColor={"purple"}
            inputClassName="w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
            placeholder={"Date Range"} 
            value={value}
            onChange={handleValueChange}
            showShortcuts={false}
        />
    );
};
export default DateRange;