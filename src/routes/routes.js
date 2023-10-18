import React from "react";

//Icons
import { AiOutlineHome, AiOutlineDashboard, AiOutlinePieChart, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillBarChartLineFill, BsFillJournalBookmarkFill } from "react-icons/bs";
import { PiCellSignalNoneThin } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

//Pages
import { Home, Dashboard, Analytics, BackTester, PnLCalendar, AddTrade, ImportTrade, Journal, TradeLogs, StrategyLibrary } from 'pages';

const routes = {
    menu: [
        {
            id: 0,
            order: 1,
            name: "Home",
            path: "home",
            icon: <AiOutlineHome className="w-5 h-5 transition duration-75" />,
            tooltip: "Home",
            component: <Home />,
        },
        {
            id: 1,
            order: 2,
            name: "Dashboard",
            path: "dashboard",
            icon: <AiOutlineDashboard className="w-5 h-5 transition duration-75" />,
            tooltip: "DashBoard",
            component: <Dashboard />,
        },
        // {
        //     id: 2,
        //     order: 3,
        //     name: "Analytics",
        //     path: "analytics",
        //     icon: <AiOutlinePieChart className="w-5 h-5 transition duration-75" />,
        //     tooltip: "Analytics",
        //     component: <Analytics />,
        // },
        {
            id: 3,
            order: 4,
            name: "PnL Calender",
            path: "pnl-calender",
            icon: <SlCalender className="w-5 h-5 transition duration-75" />,
            tooltip: "PnL Calender",
            component: <PnLCalendar />,
        },
        {
            id: 4,
            order: 5,
            name: "Trades",
            path: "",
            icon: <AiOutlinePlusCircle className="w-5 h-5 transition duration-75" />,
            tooltip: "Trades",
            component: <></>,
        },
        {
            id: 5,
            order: 6,
            name: "Backtester",
            path: "backtester",
            icon: <BsFillBarChartLineFill className="w-5 h-5 transition duration-75" />,
            tooltip: "Backtester",
            component: <BackTester />,
        },
        {
            id: 6,
            order: 7,
            name: "Strategy Library",
            path: "strategy-library",
            icon: <MdOutlineLibraryBooks className="w-5 h-5 transition duration-75" />,
            tooltip: "Strategy Library",
            component: <StrategyLibrary />,
        },
    ],
    submenu: [
        {
            id: 0,
            order: 1,
            name: "Add Trade",
            path: "add-trade",
            icon: <PiCellSignalNoneThin className="w-5 h-5 transition duration-75" />,
            tooltip: "Add Trades",
            component: <AddTrade />,
        },
        {
            id: 1,
            order: 2,
            name: "Import Trades",
            path: "import-trades",
            icon: <PiCellSignalNoneThin className="w-5 h-5 transition duration-75" />,
            tooltip: "import-trades",
            component: <ImportTrade />,
        },
        {
            id: 2,
            order: 3,
            name: "Journal",
            path: "journal",
            icon: <PiCellSignalNoneThin className="w-5 h-5 transition duration-75" />,
            tooltip: "Journal",
            component: <Journal />,
        },
        {
            id: 3,
            order: 4,
            name: "TradeLog",
            path: "tradeLog",
            icon: <PiCellSignalNoneThin className="w-5 h-5 transition duration-75" />,
            tooltip: "TradeLog",
            component: <TradeLogs />,
        },
    ],
};

export default routes;