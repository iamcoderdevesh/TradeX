import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";

const DataTable = (props) => {

    const { data, columns, pagination } = props;

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    })

    return (
        <>
            <div className="relative overflow-x-auto no-scrollbar shadow-md dark:shadow-2xl sm:rounded-md">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-md text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} className="capitalize px-6 py-3 whitespace-nowrap">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                                    ${i % 2 === 0 ? "bg-white dark:bg-main-dark" : "bg-gray-100 dark:bg-primary-dark"}
                                    `}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
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

            {pagination && <DataTablePagination table={table} />}
        </>
    );
};

export default DataTable;