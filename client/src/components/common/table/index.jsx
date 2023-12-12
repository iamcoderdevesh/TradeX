import React from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

export const KeyValueTable = (props) => {

    const { data } = props;

    return (
        <div className="relative overflow-x-auto no-scrollbar shadow-md dark:shadow-2xl">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={`border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${index % 2 === 0 ? "bg-gray-100 dark:bg-primary-dark" : "bg-white dark:bg-main-dark"}`}>
                            <td className="px-2 py-1 break-words capitalize">{item.key}</td>
                            <td className="px-2 py-1 break-words">{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const DefaultTable = (props) => {

    const { columns, data, isEdit, handleClick, handleEditClick, handleDeleteClick, Id } = props;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="relative overflow-x-auto no-scrollbar shadow-md dark:shadow-2xl">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-md text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} className="capitalize px-6 py-3 text-center whitespace-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                )
                            })}
                            {isEdit && <th scope="col" className="capitalize px-6 py-3 text-center whitespace-nowrap"></th>}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row, i) => (
                            <tr
                                key={row.id}
                                onClick={() => handleClick && handleClick(row?.original?.[Id])}
                                className={`border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${handleClick && 'cursor-pointer'} ${i % 2 === 0 ? "bg-white dark:bg-main-dark" : "bg-gray-100 dark:bg-primary-dark"}`}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-4 text-center whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}

                                {
                                    isEdit && <td className="py-4 w-16 flex items-center justify-between">
                                        <button className="font-medium text-gray-900 dark:text-white hover:underline" onClick={() => handleEditClick(row?.original?.[Id])}><MdEdit className="w-5 h-5" /></button>
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDeleteClick(row?.original?.[Id])}><MdDeleteOutline className="w-5 h-5" /></button>
                                    </td>
                                }
                            </tr>
                        ))
                    ) : (
                        <tr className="text-center h-32">
                            <td colSpan={12}>No Record Found!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};