import { useState, useEffect } from "react";
import { Search, Bell, AlertTriangle, TrendingDown, UserX } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";
import axios from "axios";

const ICON_BUTTON_BASE_CLASS =
  "w-10 h-10 p-2 rounded-lg transition-colors duration-300 flex items-center justify-center border";

const Header = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showMessagesPopup, setShowMessagesPopup] = useState(false);
  const [showNotificationsPopup, setShowNotificationsPopup] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearReadNotifications,
  } = useNotifications();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("loginEmail");
        if (!email) return;

        const res = await axios.get(
          `https://aevix-chemical-mpbw.vercel.app/api/profile/${email}`,
        );

        setProfileData({
          name: res.data.name,
          email: res.data.email,
          imageUrl: res.data.imageUrl || profileData.imageUrl,
        });
      } catch (err) {
        console.error(
          "Profile fetch error:",
          err.response?.data || err.message,
        );
      }
    };
    fetchProfile();
  }, []);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const getHoverClass = (extraClasses = "") =>
    `${extraClasses} hover:bg-gray-100`;

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between md:justify-between shadow-md px-4 md:px-6 py-3 fixed top-0 left-0 md:left-64 right-0 z-40 duration-300 bg-gray-100 text-gray-900">
        {/* MOBILE CENTERED HELLO */}
        <div className="flex-1 flex justify-center md:justify-start">
          <h2 className="text-lg font-semibold truncate">{`👋 Hello, ${profileData?.name}`}</h2>
        </div>

        {/* DESKTOP SEARCH BAR */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search anything"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 ml-auto">
          {/* SEARCH BUTTON (mobile only) */}
          <p
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className={`${ICON_BUTTON_BASE_CLASS} md:hidden border-gray-300 bg-white text-white-700 ${getHoverClass()}`}
          >
            <Search size={20} />
          </p>

          {/* NOTIFICATIONS */}
          <p
            onClick={() => setShowNotificationsPopup(true)}
            className={`${ICON_BUTTON_BASE_CLASS} border-gray-300 bg-white text-gray-700 relative cursor-pointer ${getHoverClass()}`}
            title="Notifications"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full min-w-4.5 text-center">
                {unreadCount}
              </span>
            )}
          </p>

          {/* PROFILE (hidden on mobile) */}
          <div
            className={` sm:flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-300 ${getHoverClass()}`}
            onClick={() => setShowProfilePopup(true)}
          >
            <img
              src={profileData.imageUrl}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium truncate">
                {profileData?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {profileData?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {showMobileSearch && (
        <div className="fixed top-15 left-0 right-0 px-4 py-2 bg-gray-100 shadow-md md:hidden z-40">
          <div className="relative">
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
        </div>
      )}

      {/* PROFILE POPUP */}
      {showProfilePopup && (
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
                  localStorage.removeItem("user");
                  localStorage.removeItem("loginEmail");
                  try {
                    window.dispatchEvent(new CustomEvent("user:logout"));
                  } catch {}
                  alert("Logging out...");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES POPUP */}
      {showMessagesPopup && (
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

      {/* NOTIFICATIONS POPUP */}
      {showNotificationsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="rounded-lg p-6 w-125 max-h-150 relative bg-white text-gray-900 shadow-2xl overflow-y-auto">
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

              <div className="space-y-2 max-h-112 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-400">No notifications</p>
                  </div>
                ) : (
                  <>
                    {notifications.filter((n) => !n.read).length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 mb-2">
                          UNREAD ({unreadCount})
                        </p>
                        {notifications
                          .filter((n) => !n.read)
                          .map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg mb-2 border-l-4 cursor-pointer transition-colors ${
                                notification.severity === "critical"
                                  ? "bg-red-50 border-red-500 hover:bg-red-100"
                                  : "bg-yellow-50 border-yellow-500 hover:bg-yellow-100"
                              }`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start gap-2">
                                {notification.type === "ledger_exceeded" ? (
                                  <UserX
                                    size={18}
                                    className="text-red-600 mt-0.5"
                                  />
                                ) : notification.severity === "critical" ? (
                                  <AlertTriangle
                                    size={18}
                                    className="text-red-600 mt-0.5"
                                  />
                                ) : (
                                  <TrendingDown
                                    size={18}
                                    className="text-yellow-600 mt-0.5"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-700 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(
                                      notification.timestamp,
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                    {notifications.filter((n) => n.read).length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-gray-500">
                            READ
                          </p>
                          <button
                            onClick={clearReadNotifications}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Clear all
                          </button>
                        </div>
                        {notifications
                          .filter((n) => n.read)
                          .map((notification) => (
                            <div
                              key={notification.id}
                              className="p-3 rounded-lg mb-2 bg-gray-100 border-l-4 border-gray-300 opacity-60"
                            >
                              <div className="flex items-start gap-2">
                                {notification.severity === "critical" ? (
                                  <AlertTriangle
                                    size={18}
                                    className="text-gray-500 mt-0.5"
                                  />
                                ) : (
                                  <TrendingDown
                                    size={18}
                                    className="text-gray-500 mt-0.5"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-gray-700">
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(
                                      notification.timestamp,
                                    ).toLocaleString()}
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
