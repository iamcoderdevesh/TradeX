import { classNames } from "utils";
import StatusPill from "components/common/statusPill";

export const RecentTradeCols = [
    {
        accessorKey: "Symbol",
        header: () => <span>Symbol</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Symbol")}</div>
    },
    {
        accessorKey: "Status",
        header: () => <span>Status</span>,
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
];

export const TradeColumns = [
    {
        accessorKey: "Symbol",
        header: () => <span>Symbol</span>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("Symbol")}</div>
    },
    {
        accessorKey: "Status",
        header: () => <div className="capitalize">Status</div>,
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