import React from "react";

const Dropdown = (props) => {
    const { id, children, selected, label } = props;


    return (
        <>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <select id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                {children}
            </select>
        </>
    );
};

export default Dropdown;
