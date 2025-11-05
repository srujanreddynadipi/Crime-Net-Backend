import React, { useState } from 'react';
import { Menu, Shield, Activity, Bell, User } from 'lucide-react';

const DashboardHeader = ({ officer, onMenuToggle }) => {
  const [notifications, setNotifications] = useState(5);

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-2xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button onClick={onMenuToggle} className="text-white lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <Shield className="w-10 h-10 text-yellow-400" strokeWidth={2.5} />
            <div>
              <span className="text-2xl font-bold text-white block">CrimeNet Police</span>
              <span className="text-xs text-gray-300">Officer Dashboard</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Active</span>
            </div>

            <button className="relative p-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all">
              <Bell className="w-6 h-6 text-white" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>

            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-white font-bold text-sm">{officer.name}</p>
                <p className="text-gray-300 text-xs">{officer.badge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
