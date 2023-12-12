import { classNames } from "utils";
import { RiArrowUpDownLine } from 'react-icons/ri';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import Checkbox from "components/common/checkbox";
import StatusPill from "components/common/statusPill";
import { formatDate } from "utils/index";
import { GetFormatedCurrency, GetFormatedPnl } from "helpers/format";

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
        cell: ({ row }) => <div className="uppercase">{row.getValue("Symbol")}</div>
    },
    {
        accessorKey: "TradeStatus",
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
            <div className="uppercase">
                <StatusPill value={row.getValue("TradeStatus")} />
            </div>
        )
    },
    {
        accessorKey: "EntryDate",
        header: () => <div className="capitalize">Open Date</div>,
        cell: ({ row }) => <div className="capitalize">{formatDate(row.getValue("EntryDate"), 'dd/mm/yyyy')}</div>
    },
    {
        accessorKey: "ExitDate",
        header: () => <div className="capitalize">Close Date</div>,
        cell: ({ row }) => <div className="capitalize">{formatDate(row.getValue("ExitDate"), 'dd/mm/yyyy')}</div>
    },
    {
        accessorKey: "Action",
        header: () => <div className="capitalize">Action</div>,
        cell: ({ row }) => <div className="uppercase">{row.getValue("Action")}</div>
    },
    {
        accessorKey: "NetPnL",
        header: () => <div className="capitalize">Net P&L</div>,
        cell: ({ row }) => <div className="flex items-center capitalize font-medium"><GetFormatedPnl value={row.getValue("NetPnL")} /></div>
    },
    {
        accessorKey: "NetRoi",
        header: () => <div className="capitalize">Net ROI</div>,
        cell: ({ row }) => <div className="flex items-center capitalize font-medium"><GetFormatedPnl value={row.getValue("NetRoi")} showPercentage={true} /></div>
    },
    {
        accessorKey: "EntryPrice",
        header: () => <div className="capitalize">Entry Price</div>,
        cell: ({ row }) => <div className="capitalize"><GetFormatedCurrency value={row.getValue("EntryPrice")} /></div>
    },
    {
        accessorKey: "ExitPrice",
        header: () => <div className="capitalize">Exit Price</div>,
        cell: ({ row }) => <div className="capitalize"><GetFormatedCurrency value={row.getValue("ExitPrice")} /></div>
    },
    {
        accessorKey: "StopLoss",
        header: () => <div className="capitalize">Stop Loss</div>,
        cell: ({ row }) => <div className="capitalize"><GetFormatedCurrency value={row.getValue("StopLoss")} /></div>
    },
    {
        accessorKey: "Quantity",
        header: () => <div className="capitalize">Quantity</div>,
        cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("Quantity").toFixed(2)}</div>
    },
    {
        accessorKey: "Setup",
        header: () => <div className="capitalize">Setup</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Setup")}</div>
    },
    {
        accessorKey: "EntryReason",
        header: () => <div className="capitalize">Entry Reason</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("EntryReason")}</div>
    },
    {
        accessorKey: "ExitReason",
        header: () => <div className="capitalize">Exit Reason</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("ExitReason")}</div>
    },
    {
        accessorKey: "Emotions",
        header: () => <div className="capitalize">Emotions</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Emotions")}</div>
    },
    {
        accessorKey: "MarketCondition",
        header: () => <div className="capitalize">Market Condition</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("MarketCondition")}</div>
    },
    {
        accessorKey: "AdditionalInfo",
        header: () => <div className="capitalize">Additional Info</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("AdditionalInfo")}</div>
    },
]