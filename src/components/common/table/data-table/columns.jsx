import { classNames } from "components/utils";

import { RiArrowUpDownLine } from 'react-icons/ri';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

import Checkbox from "components/common/checkbox";
import StatusPill from "components/common/statusPill";

export const TradeColumns = [
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