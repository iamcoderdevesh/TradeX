export const Inputs = {
    //Basic Form Inputs
    FormInputs: [
        {
            id: "Symbol",
            label: "Symbol",
            divClass: "sm:col-span-2",
            placeholder: "Ex.: Apple",
            type: "text",
        },
        {
            id: "EntryDate",
            label: "Entry Date",
            divClass: "w-full",
            placeholder: "Select Date",
            type: "datetime-local",
        },
        {
            id: "ExitDate",
            label: "Exit Date",
            divClass: "w-full",
            placeholder: "Select Date",
            type: "datetime-local",
        },
        {
            id: "EntryPrice",
            label: "Entry Price",
            divClass: "w-full",
            placeholder: "Ex.: 100",
            type: "number",
        },
        {
            id: "ExitPrice",
            label: "Exit Price",
            divClass: "w-full",
            placeholder: "Ex.: 120",
            type: "number",
        },
        {
            id: "StopLoss",
            label: "Stop Loss",
            divClass: "w-full",
            placeholder: "Ex.: 90",
            type: "number",
        },
        {
            id: "Quantity",
            label: "Quantity",
            divClass: "w-full",
            placeholder: "Ex.: 200",
            type: "number",
        },
    ],
    //Form Additional Inputs
    FormAddInputs: [
        {
            id: "EntryReason",
            label: "Entry Reason",
            divClass: "sm:col-span-2",
            placeholder: "Ex.: Setup Created",
            type: "text",
        },
        {
            id: "ExitReason",
            label: "Exit Reason",
            divClass: "sm:col-span-2",
            placeholder: "Ex.: Target Hit",
            type: "text",
        },
        {
            id: "null",
            label: "",
            divClass: "",
            placeholder: "",
            type: ""
        },
        {
            id: "ScreenShot",
            label: "Upload Screenshot",
            divClass: "sm:col-span-2",
            placeholder: "",
            type: "file"
        },
        {
            id: "AddInfo",
            label: "Additional Information",
            divClass: "sm:col-span-2",
            placeholder: "Your description here",
            type: "textArea",
        },
    ],
    //Form Dropdowns
    FormDropdown: [
        {
            id: "Market",
            label: "Market",
            children: [
                "Select Market",
                "STOCKS",
                "FOREX",
                "CRYPTO",
                "OTIONS",
                "FUTURES",
            ],
        },
        {
            id: "Broker",
            label: "Broker",
            children: [
                "Select Broker",
                "ZERODHA",
                "ANGLE ONE",
                "UPSTOX",
                "DHAN",
            ],
        },
        {
            id: "Setup",
            label: "Setup",
            children: [
                "Select Setup",
                "Random",
            ],
        },
        {
            id: "Status",
            label: "Status",
            children: [
                "Closed",
                "Open",
            ],
        },
        {
            id: "Action",
            label: "Action",
            children: [
                "Buy",
                "Sell",
            ],
        },
    ],
    //Form Additional Dropdown
    FormAddDropdown: [
        {
            id: "Emotions",
            label: "Emotions",
            children: [
                "Select Emotions",
                "Normal",
                "Fear",
                "Greed",
                "Impatience",
            ],
        },
        {
            id: "MarketConditions",
            label: "Market Conditions",
            children: [
                "Select Market Conditions",
                "Fiat",
                "Sideways",
                "Trending",
                "Volatile",
            ],
        },
    ],
};