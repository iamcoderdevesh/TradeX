// Custom components
import React from "react";

function InputField(props) {
    const { label, id, type, placeholder, disabled, require, handleChange, htmlName } = props;
    let inputClass = "";

    type === "file"
        ? inputClass = "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        : inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

    return (
        <>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            {type === "textArea"
                ? <textarea id={id} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder={placeholder}></textarea>
                : <input disabled={disabled} required={require} type={type} id={id} placeholder={placeholder} className={`${inputClass}`} name={htmlName} onChange={handleChange}/>}
        </>
    );
}

export default InputField;