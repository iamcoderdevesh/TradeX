import React from "react";

const Dropdown = (props) => {
    const { id, children, htmlName, label, errorMsg, onChange, onBlur, value } = props;

    let inputClass = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-100 focus:border-primary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-100 dark:focus:border-primary-100";

    const errorClass = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

    return (
        <>
            {label !== '' && <label htmlFor={id} className={`block mb-2 text-sm font-medium ${errorMsg ? `text-red-700 dark:text-red-500` : `text-gray-900 dark:text-white`}`}>{label}</label>}
            <select 
                id={id} 
                name={htmlName} 
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className={errorMsg ? errorClass : inputClass}>
                {children}
            </select>
            {errorMsg && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{errorMsg}</span></p>}
        </>
    );
};


export default Dropdown;
