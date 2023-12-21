import { classNames } from "utils";
import StatusPill from "components/common/statusPill";
import { formatDate } from "utils";
import { GetFormatedCurrency, GetFormatedPnl } from "helpers/format";

export const RecentTradeCols = [
    {
        accessorKey: "Symbol",
        header: () => <span>Symbol</span>,
        cell: ({ row }) => <div className="uppercase">{row.getValue("Symbol")}</div>
    },
    {
        accessorKey: "TradeStatus",
        header: () => <span>Status</span>,
        cell: ({ row }) => (
            <div className="capitalize">
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
        header: () => <div className="capitalize text-center">Net P&L</div>,
        cell: ({ row }) => <div className="text-center whitespace-nowrap capitalize font-medium"><GetFormatedPnl value={row.getValue("NetPnL")} /></div>
    },
    {
        accessorKey: "NetRoi",
        header: () => <div className="capitalize text-center">Net ROI</div>,
        cell: ({ row }) => <div className="text-center whitespace-nowrap capitalize font-medium"><GetFormatedPnl value={row.getValue("NetRoi")} showPercentage={true} showCurrency={false} /></div>
    },
];

export const TradeColumns = [
    {
        accessorKey: "Symbol",
        header: () => <span>Symbol</span>,
        cell: ({ row }) => <div className="uppercase">{row.getValue("Symbol")}</div>
    },
    {
        accessorKey: "TradeStatus",
        header: () => <span>Status</span>,
        cell: ({ row }) => (
            <div className="capitalize">
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
        cell: ({ row }) => <div className="flex items-center capitalize font-medium"><GetFormatedPnl value={row.getValue("NetRoi")} showPercentage={true} showCurrency={false} /></div>
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
        cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("Quantity")}</div>
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
];

export const AccountColumns = [
    {
        accessorKey: "AccountName",
        header: () => <span>Account Name</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("AccountName")}</div>
    },
    {
        accessorKey: "Broker",
        header: () => <span>Broker</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Broker")}</div>
    },
    {
        accessorKey: "InitialBalance",
        header: () => <span>Balance</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("InitialBalance")}</div>
    },
    {
        accessorKey: "Currency",
        header: () => <span>Currency</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Currency")}</div>
    },
];

export const TagsColumns = [
    {
        accessorKey: "TagName",
        header: () => <span>Tag Name</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("TagName")}</div>
    },
    {
        accessorKey: "TagType",
        header: () => <span>Type</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("TagType")}</div>
    },
    {
        accessorKey: "TagDesc",
        header: () => <span>Description</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("TagDesc")}</div>
    },
];

export const ImportHistColumns = [
    {
        accessorKey: "Imported On",
        header: () => <span>Imported On</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Imported On")}</div>
    },
    {
        accessorKey: "Broker Name",
        header: () => <span>Broker Name</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Broker Name")}</div>
    },
    {
        accessorKey: "Account Name",
        header: () => <span>Account Name</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Account Name")}</div>
    },
    {
        accessorKey: "Total Trades",
        header: () => <span>Total Trades</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Total Trades")}</div>
    },
    {
        accessorKey: "File",
        header: () => <span>File</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("File")}</div>
    },
];