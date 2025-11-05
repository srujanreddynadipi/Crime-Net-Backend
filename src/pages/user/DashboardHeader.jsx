import React, { useState, useEffect } from 'react';
import { Shield, Menu, Bell, AlertCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserNotifications } from '../../api/notifications';

const DashboardHeader = ({ user, onMenuToggle, setActiveTab }) => {
  const { currentUser } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadUnreadCount();
      // Poll every 30 seconds
      const interval = setInterval(loadUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const loadUnreadCount = async () => {
    try {
      const notifications = await getUserNotifications();
      const unread = notifications.filter(n => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error('Failed to load notification count:', err);
    }
  };

  const handleNotificationClick = () => {
    setActiveTab('notifications');
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-lg border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button onClick={onMenuToggle} className="text-gray-700 lg:hidden hover:bg-white/60 p-2 rounded-lg transition-all">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-400 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent block">CrimeNet</span>
                <span className="text-xs text-gray-500">Stay Safe, Stay Connected</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveTab('sos')}
              className="hidden md:flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency SOS</span>
            </button>

            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="relative p-2 bg-white rounded-full border border-gray-200 hover:shadow-md transition-all"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

            <button className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full border border-gray-200 hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="font-bold text-gray-800 text-sm leading-none">
                  {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-gray-500 text-xs">Citizen</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden md:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
