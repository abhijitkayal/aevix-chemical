import React, { useEffect,useState } from "react";
import {
   Search,
  Sparkles,
  MessageSquare,
  FileText,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-1 flex items-center justify-between">
      {/* LEFT */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        👋 Hello, HR!
      </h2>

      {/* SEARCH */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search anything"
            className="w-full pl-11 pr-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* DARK MODE BUTTON */}
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" size={18} />
          ) : (
            <Moon className="text-gray-600" size={18} />
          )}
        </button> */}

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <Sparkles size={18} className="text-gray-600 dark:text-gray-300" />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <MessageSquare size={18} className="text-gray-600 dark:text-gray-300" />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <FileText size={18} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <Bell size={18} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            4
          </span>
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-slate-700 pl-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="w-9 h-9 rounded-full"
            alt="HR"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              HR
            </p>
            <p className="text-xs text-gray-500">
              hr@pharmacy.com
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
