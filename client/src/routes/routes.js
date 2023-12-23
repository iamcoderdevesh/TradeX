import React, { lazy } from "react";

//Icons
import { AiOutlineHome, AiOutlinePieChart, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillBarChartLineFill, BsFillJournalBookmarkFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { PiCellSignalNoneThin } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";

//Tabs
const Accounts = lazy(() => import("pages/settings/tabs/account"));
const General = lazy(() => import("pages/settings/tabs/general"));
const Imports = lazy(() => import("pages/settings/tabs/import"));
const Tags = lazy(() => import("pages/settings/tabs/tags"));
const TradeSettings = lazy(() => import("pages/settings/tabs/tradeSetting"));

//Pages
const Home = lazy(() => import("pages/home"));
const BackTester = lazy(() => import("pages/backtester"));
const StrategyLibrary = lazy(() => import("pages/backtester"));
const Login = lazy(() => import("pages/auth/login"));
const Signup = lazy(() => import("pages/auth/signup"));
const Analytics = lazy(() => import("pages/analytics"));
const Dashboard = lazy(() => import("pages/dashboard"));
const PnLCalendar = lazy(() => import("pages/calendar"));
const Journal = lazy(() => import("pages/journal"));
const AddTrade = lazy(() => import("pages/trades/AddTrade"));
const ImportTrade = lazy(() => import("pages/trades/ImportTrade"));
const Tracking = lazy(() => import("pages/trades/Tracking"));
const TradeStatistics = lazy(() => import("pages/trades/TradeStatistics"));


const routes = {
    menu: [
        // {
        //     id: 0,
        //     order: 1,
        //     name: "Home",
        //     path: "home",
        //     icon: <AiOutlineHome className="w-5 h-5 transition duration-75" />,
        //     tooltip: "Home",
        //     component: <Home />,
        // },
        {
            id: 1,
            order: 2,
            name: "Dashboard",
            path: "dashboard",
            icon: <BiSolidDashboard className="w-5 h-5 transition duration-75" />,
            tooltip: "DashBoard",
            component: <Dashboard />,
        },
        {
            id: 2,
            order: 3,
            name: "Analytics",
            path: "analytics",
            icon: <AiOutlinePieChart className="w-5 h-5 transition duration-75" />,
            tooltip: "Analytics",
            component: <Analytics />,
        },
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
            name: "Journal",
            path: "journal",
            icon: <MdOutlineLibraryBooks className="w-5 h-5 transition duration-75" />,
            tooltip: "Journal",
            component: <Journal />,
        },
        {
            id: 6,
            order: 7,
            name: "Trade Statistics",
            path: "trade-statistics",
            icon: <HiMiniArrowsRightLeft className="w-5 h-5 transition duration-75" />,
            tooltip: "Trade Statistics",
            component: <TradeStatistics />,
        },
        // {
        //     id: 5,
        //     order: 6,
        //     name: "Backtester",
        //     path: "backtester",
        //     icon: <BsFillBarChartLineFill className="w-5 h-5 transition duration-75" />,
        //     tooltip: "Backtester",
        //     component: <BackTester />,
        // },
        // {
        //     id: 6,
        //     order: 7,
        //     name: "Strategy Library",
        //     path: "strategy-library",
        //     icon: <MdOutlineLibraryBooks className="w-5 h-5 transition duration-75" />,
        //     tooltip: "Strategy Library",
        //     component: <StrategyLibrary />,
        // },
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
            name: "Track",
            path: "tracking",
            icon: <PiCellSignalNoneThin className="w-5 h-5 transition duration-75" />,
            tooltip: "Track",
            component: <Tracking />,
        },
    ],
    profile: [
        {
            id: 0,
            order: 1,
            name: "Dashboard",
            path: "dashboard",
            component: <Dashboard />,
        },
        {
            id: 1,
            order: 2,
            name: "Settings",
            path: "general-settings",
            component: <General />,
        },
    ],
    tabs: [
        {
            id: 0,
            order: 1,
            name: "General",
            path: "general-settings",
            component: <General />,
        },
        {
            id: 1,
            order: 2,
            name: "Accounts",
            path: "settings/accounts",
            component: <Accounts />,
        },
        // {
        //     id: 2,
        //     order: 3,
        //     name: "Trade Settings",
        //     path: "settings/trade-settings",
        //     component: <TradeSettings />,
        // },
        {
            id: 3,
            order: 4,
            name: "Tags Managements",
            path: "settings/tags-mmanagements",
            component: <Tags />,
        },
        {
            id: 4,
            order: 5,
            name: "Import History",
            path: "settings/import-history",
            component: <Imports />,
        },
    ],
    auth: [
        {
            id: 0,
            order: 1,
            name: "Login",
            path: "auth/login",
            component: <Login />,
        },
        {
            id: 0,
            order: 1,
            name: "Sigup",
            path: "auth/signup",
            component: <Signup />,
        },
    ],
};

export default routes;