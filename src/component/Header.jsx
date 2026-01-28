// import React, { useEffect,useState } from "react";
// import {
//    Search,
//   Sparkles,
//   MessageSquare,
//   FileText,
//   Bell,
//   Moon,
//   Sun,
// } from "lucide-react";
// const Header = () => {
//     const [darkMode, setDarkMode] = useState(false);

//   // Apply dark mode to <html>
//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (darkMode) {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     <header className="w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-1 flex items-center justify-between">
//       {/* LEFT */}
//       <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//         👋 Hello, HR!
//       </h2>

//       {/* SEARCH */}
//       <div className="flex-1 flex justify-center px-6">
//         <div className="relative w-full max-w-xl">
//           <Search
//             size={18}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search anything"
//             className="w-full pl-11 pr-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-4">
//         {/* DARK MODE BUTTON */}
//         {/* <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
//         >
//           {darkMode ? (
//             <Sun className="text-yellow-400" size={18} />
//           ) : (
//             <Moon className="text-gray-600" size={18} />
//           )}
//         </button> */}

//         <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
//           <Sparkles size={18} className="text-gray-600 dark:text-gray-300" />
//         </button>

//         <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
//           <MessageSquare size={18} className="text-gray-600 dark:text-gray-300" />
//         </button>

//         <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
//           <FileText size={18} className="text-gray-600 dark:text-gray-300" />
//         </button>

//         {/* Notification */}
//         <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
//           <Bell size={18} className="text-gray-600 dark:text-gray-300" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
//             4
//           </span>
//         </button>

//         {/* PROFILE */}
//         <div className="flex items-center gap-3 border-l border-gray-200 dark:border-slate-700 pl-4">
//           <img
//             src="https://randomuser.me/api/portraits/women/44.jpg"
//             className="w-9 h-9 rounded-full"
//             alt="HR"
//           />
//           <div>
//             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//               HR
//             </p>
//             <p className="text-xs text-gray-500">
//               hr@pharmacy.com
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header


import { useState,useEffect } from "react";
import React from "react";
import { Search, Bell, Sun, Moon, ScrollText, AlertTriangle, TrendingDown, UserX } from "lucide-react";
import { IoChatboxEllipsesOutline, IoSparklesOutline } from "react-icons/io5";
import sun from '../assets/sun-icon-on-white-background-vector.jpg';
import { useNotifications } from '../context/NotificationContext';
import axios from "axios";
import { API_URL } from '../config/api';
// import { profile } from "console";


const ICON_BUTTON_BASE_CLASS =
  "w-10 h-10 p-2 rounded-lg transition-colors duration-300 flex items-center justify-center border border-gray-300";


const Header = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showMessagesPopup, setShowMessagesPopup] = useState(false);
  const [showNotificationsPopup, setShowNotificationsPopup] = useState(false);
  const [messageText, setMessageText] = useState("");
  
  // Get notifications from context
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearReadNotifications } = useNotifications();
  
//   const profileData =  {
//     imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
//     name: "abhi",
//     email: "kayal",
//   } 
 
const [profileData, setProfileData] = useState({
  name: "",
  email: "",
});


  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
      // Add your message sending logic here
    }
  };

  const handleAIAssistant = () => {
    console.log("AI Assistant button clicked!");
  };

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const email = localStorage.getItem("loginEmail");
      console.log("Stored email:", email); // Debug log
      
      if (!email) {
        console.log("No email found in localStorage");
        return;
      }

      const res = await axios.get(
        `https://aevix-chemical-3-gnuu.onrender.com/api/profile/${email}`
      );

      setProfileData({
        name: res.data.name,
        email: res.data.email,
      });
      console.log("Profile data fetched:", res.data);
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err.message);
    }
  };

  fetchProfile();
}, []);

  // Reusable hover class function
  const getHoverClass = (extraClasses = "") =>
    `${extraClasses} hover:bg-gray-100`;

  return (
    <>
      <div
        className="flex items-center justify-between shadow-md ml-6 px-6 py-3 fixed top-0 left-64 right-3.5 z-40 duration-300 bg-gray-100 text-gray-900"
      >
        {/* Left Section: Hello & Dark Mode Toggle */}
        <div className="gap-4 flex mx-2 items-center">
          <h2 className="text-lg font-semibold">👋 Hello, {profileData?.name}</h2>
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            // Applying the base class and consistent hover effect
            className={`${ICON_BUTTON_BASE_CLASS} ${getHoverClass()}`} 
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <Sun size={24} className="text-yellow-400" />
            ) : (
              <Moon size={24} className="text-gray-700" />
            )} */}
            {/* <span className="ml-1 text-xs">{darkMode ? "light" : "dark"}</span> */}
          {/* </button> */}
        </div>
        
        {/* Center Section: Search Bar and AI Assistant */}
        <div className="flex items-center flex-1 max-w-lg space-x-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search anything"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white border-gray-300 text-gray-900"
            />
          </div>
          {/* AI ICON BUTTON - Now consistent with others */}
         {/* <button
  onClick={handleAIAssistant}
  className={`${ICON_BUTTON_BASE_CLASS} ${
    darkMode ? "text-gray-100" : "text-gray-900"
  } ${getHoverClass()}`}
  title="AI Assistant"
>
  <IoSparklesOutline size={24} color="red"/>
  <span className="ml-1 text-xs">AI</span>
</button> */}

        </div>
        
        {/* Right Section: Messages, Notes, Notifications, and Profile */}
        <div className="flex items-center gap-2 mx-2">
          {/* Messages Button - Now consistent */}
          {/* <button
            onClick={() => setShowMessagesPopup(true)}
            className={`${ICON_BUTTON_BASE_CLASS} ${getHoverClass()}`}
            title="Messages"
          >
            <IoChatboxEllipsesOutline size={24} className="text-gray-700" />
            <span className="ml-1 text-xs">Chat</span>
          </button> */}
          {/* Notes Button - Now consistent */}
          {/* <button
            // onClick={() => navigate("/add-note")}
            className={`${ICON_BUTTON_BASE_CLASS} ${getHoverClass()}`}
            title="Add Note"
          >
            <ScrollText size={24} />
            <span className="ml-1 text-xs">Note</span>
          </button> */}
          {/* Notifications Button - Now consistent */}
          <p
            onClick={() => setShowNotificationsPopup(true)}
            className={`${ICON_BUTTON_BASE_CLASS} bg-white relative cursor-pointer ${getHoverClass()}`}
            title="Notifications"
          >
            <Bell size={24} className="text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
          </p>
          
          {/* Profile Area */}
          <div
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-300 ${getHoverClass()}`} // Applied hover to the entire profile div
            onClick={() => setShowProfilePopup(true)}
          >
            {/* <img
              src={profileData.imageUrl}
              alt="profile"
              className="w-8 h-8 rounded-full"
            /> */}
            <div>
              <p className="text-sm font-medium">{profileData?.name}</p>
              <p className="text-xs text-gray-500">
                {profileData?.email}
              </p>
            </div>
            {/* <div>
              <p className="text-xs">Login Time: 9:00</p>
              <span className="text-xs">Suggested Logout Time: 18:00</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Popups (omitted for brevity, no changes needed here) */}
      {showProfilePopup && (
        // ... (profile popup content)
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="rounded-lg p-6 w-96 relative bg-white text-gray-900">
                <button
                    onClick={() => setShowProfilePopup(false)}
                    className="absolute top-3 right-3 text-red-500 text-xl font-bold"
                >
                    ✕
                </button>
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={profileData.imageUrl}
                        alt="profile"
                        className="w-24 h-24 rounded-full"
                    />
                    <div className="text-center space-y-1">
                        <p className="font-semibold text-lg">{profileData.name}</p>
                        <p className="text-sm text-gray-400">{profileData.email}</p>
                    </div>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => {
                          // Clear stored user data and notify other components
                          localStorage.removeItem('user');
                          localStorage.removeItem('loginEmail');
                          try {
                            window.dispatchEvent(new CustomEvent('user:logout'));
                          } catch (e) {
                            // ignore
                          }
                          alert('Logging out...');
                          window.location.href = "/";
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
      )}

      {showMessagesPopup && (
        // ... (messages popup content)
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="rounded-lg p-6 w-96 relative bg-white text-gray-900">
                <button
                    onClick={() => setShowMessagesPopup(false)}
                    className="absolute top-3 right-3 text-red-500 text-xl font-bold"
                >
                    ✕
                </button>
                <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold">Messages</h3>
                    <div className="space-y-2">
                        <p className="text-sm">No new messages.</p>
                        <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full h-24 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none bg-white border-gray-300 text-gray-900"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={!messageText.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {showNotificationsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="rounded-lg p-6 w-[500px] max-h-[600px] relative bg-white text-gray-900 shadow-2xl">
                <button
                    onClick={() => setShowNotificationsPopup(false)}
                    className="absolute top-3 right-3 text-red-500 text-xl font-bold hover:text-red-700"
                >
                    ✕
                </button>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-500 hover:text-blue-700"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                    
                    <div className="space-y-2 max-h-[450px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="text-center py-8">
                                <Bell size={48} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-sm text-gray-400">No notifications</p>
                            </div>
                        ) : (
                            <>
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-gray-500 mb-2">UNREAD ({unreadCount})</p>
                                        {notifications.filter(n => !n.read).map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-3 rounded-lg mb-2 border-l-4 cursor-pointer transition-colors ${
                                                    notification.severity === 'critical'
                                                        ? 'bg-red-50 border-red-500 hover:bg-red-100'
                                                        : 'bg-yellow-50 border-yellow-500 hover:bg-yellow-100'
                                                }`}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <div className="flex items-start gap-2">
                                                    {notification.type === 'ledger_exceeded' ? (
                                                        <UserX size={18} className="text-red-600 mt-0.5" />
                                                    ) : notification.severity === 'critical' ? (
                                                        <AlertTriangle size={18} className="text-red-600 mt-0.5" />
                                                    ) : (
                                                        <TrendingDown size={18} className="text-yellow-600 mt-0.5" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-xs text-gray-700 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(notification.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {notifications.filter(n => n.read).length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs font-semibold text-gray-500">READ</p>
                                            <button
                                                onClick={clearReadNotifications}
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                        {notifications.filter(n => n.read).map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="p-3 rounded-lg mb-2 bg-gray-100 border-l-4 border-gray-300 opacity-60"
                                            >type === 'ledger_exceeded' ? (
                                                        <UserX size={18} className="text-gray-500 mt-0.5" />
                                                    ) : notification.
                                                <div className="flex items-start gap-2">
                                                    {notification.severity === 'critical' ? (
                                                        <AlertTriangle size={18} className="text-gray-500 mt-0.5" />
                                                    ) : (
                                                        <TrendingDown size={18} className="text-gray-500 mt-0.5" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-gray-700">
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(notification.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Header;
