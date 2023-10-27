import React from "react";

const TanStackKeyValueTable = (props) => {

    const { data } = props;

    return (
        <div className="relative overflow-x-auto no-scrollbar shadow-md dark:shadow-2xl">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={`border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${index % 2 === 0 ? "bg-gray-100 dark:bg-primary-dark" : "bg-white dark:bg-main-dark"}`}>
                            <td className="px-2 py-1 break-words">{item.key}</td>
                            <td className="px-2 py-1 break-words">{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TanStackKeyValueTable;
