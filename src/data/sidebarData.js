import {AiOutlineHome, AiOutlineDashboard, AiOutlinePieChart, AiFillPlusCircle} from "react-icons/ai";
import {BsFillBarChartLineFill, BsFillJournalBookmarkFill} from "react-icons/bs";
import {LuImport} from "react-icons/lu";
import {MdOutlineLibraryBooks} from "react-icons/md";
import {SlCalender} from "react-icons/sl";

export const components = {
  menu: [
    {
      id: 0,
      order: 1,
      name: "Home",
      icon: <AiOutlineHome className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Home",
    },
    {
      id: 1,
      order: 2,
      name: "Dashboard",
      icon: <AiOutlineDashboard className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "DashBoard",
    },
    {
      id: 2,
      order: 3,
      name: "Analytics",
      icon: <AiOutlinePieChart className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Analytics",
    },
    {
      id: 3,
      order: 4,
      name: "Backtester",
      icon: <BsFillBarChartLineFill className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Backtester",
    },
    {
      id: 4,
      order: 5,
      name: "PnL Calender",
      icon: <SlCalender className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "PnL Calender",
    },
    {
      id: 5,
      order: 6,
      name: "Trades",
      icon: <AiFillPlusCircle className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Trades",
    },
    {
      id: 7,
      order: 8,
      name: "Strategy Library",
      icon: <MdOutlineLibraryBooks className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Strategy Library",
    },
  ],
  submenu: [
    {
      id: 0,
      order: 1,
      name: "Add Trades",
      icon: <AiOutlineHome className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Add Trades",
    },
    {
      id: 1,
      order: 2,
      name: "Import Trades",
      icon: <LuImport className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Import Trades",
    },
    {
      id: 2,
      order: 3,
      name: "Journal",
      icon: <BsFillJournalBookmarkFill className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />,
      tooltip: "Journal",
    },
  ],
};
