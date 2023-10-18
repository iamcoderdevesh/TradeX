import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";
import Checkbox from "components/common/checkbox";
import StatusPill from "components/common/statusPill";
import { RiArrowUpDownLine } from 'react-icons/ri';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import { DataTablePagination } from "./data-table-pagination";
import { classNames } from "components/utils";

const data = [
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "WIN",
        "Open Date": "10/18/2023",
        "Close Date": "10/18/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹100.00",
        "Exit Price": "₹110.00",
        "Stop Loss": "₹90.00",
        Quantity: "50.00",
        "Net PnL": "+₹500.00",
        "Net ROI": "+5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Target Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
    {
        Symbol: "NIFTY",
        Status: "LOSS",
        "Open Date": "10/16/2023",
        "Close Date": "10/16/2023",
        Action: "BUY / LONG",
        "Entry Price": "₹200.00",
        "Exit Price": "₹190.00",
        "Stop Loss": "₹190.00",
        Quantity: "50.00",
        "Net PnL": "-₹500.00",
        "Net ROI": "-5.00%",
        Setup: "5EMA",
        "Entry Reason": "Setup Created",
        "Exit Reason": "Stop Loss Hit",
        Emotions: "Normal",
        "Additional Info": "",
    },
]

const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "Symbol",
        header: () => <span>Symbol</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Symbol")}</div>
    },
    {
        accessorKey: "Status",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center justify-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    {column.getIsSorted() === "desc" ? (
                        <FaArrowDown className="ml-2 w-4 h-4" />
                    ) : column.getIsSorted() === "asc" ? (
                        <FaArrowUp className="ml-2 w-4 h-4" />
                    ) : (
                        <RiArrowUpDownLine className="ml-2 h-4 w-4" />
                    )}
                </button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">
                <StatusPill value={row.getValue("Status")} />
            </div>
        )
    },
    {
        accessorKey: "Open Date",
        header: () => <div className="capitalize">Open Date</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Open Date")}</div>
    },
    {
        accessorKey: "Close Date",
        header: () => <div className="capitalize">Close Date</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Close Date")}</div>
    },
    {
        accessorKey: "Action",
        header: () => <div className="capitalize">Action</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Action")}</div>
    },
    {
        accessorKey: "Entry Price",
        header: () => <div className="capitalize">Entry Price</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Entry Price")}</div>
    },
    {
        accessorKey: "Exit Price",
        header: () => <div className="capitalize">Exit Price</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Exit Price")}</div>
    },
    {
        accessorKey: "Stop Loss",
        header: () => <div className="capitalize">Stop Loss</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Stop Loss")}</div>
    },
    {
        accessorKey: "Quantity",
        header: () => <div className="capitalize">Quantity</div>,
        cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("Quantity")}</div>
    },
    {
        accessorKey: "Net PnL",
        header: () => <div className="capitalize">Net PnL</div>,
        cell: ({ row }) => <div className={classNames("capitalize font-medium", row.getValue("Net PnL").startsWith("-") ? "text-red" : "text-green")}>{row.getValue("Net PnL")}</div>
    },
    {
        accessorKey: "Net ROI",
        header: () => <div className="capitalize">Net ROI</div>,
        cell: ({ row }) => <div className={classNames("capitalize font-medium", row.getValue("Net ROI").startsWith("-") ? "text-red" : "text-green")}>{row.getValue("Net ROI")}</div>
    },
    {
        accessorKey: "Setup",
        header: () => <div className="capitalize">Setup</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Setup")}</div>
    },
    {
        accessorKey: "Entry Reason",
        header: () => <div className="capitalize">Entry Reason</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Entry Reason")}</div>
    },
    {
        accessorKey: "Exit Reason",
        header: () => <div className="capitalize">Exit Reason</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Exit Reason")}</div>
    },
    {
        accessorKey: "Emotions",
        header: () => <div className="capitalize">Emotions</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Emotions")}</div>
    },
    {
        accessorKey: "Additional Info",
        header: () => <div className="capitalize">Additional Info</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Additional Info")}</div>
    },
]

const DataTable = () => {

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
        <div className="p-2 mx-auto dark:text-white dark:fill-gray-400">
            <div className="relative overflow-x-auto no-scrollbar shadow-md dark:shadow-2xl sm:rounded-md">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-md text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} className="capitalize px-3.5 py-2 whitespace-nowrap text-center">
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
                                        <td key={cell.id} className="px-3.5 py-2 whitespace-nowrap">
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

            <DataTablePagination table={table} />
        </div>
    );
};

export default DataTable;