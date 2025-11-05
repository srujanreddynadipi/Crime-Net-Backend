import React from 'react';
import { LayoutDashboard, Users, FileText, Lightbulb, AlertOctagon, BarChart3, MessageSquare, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'reports', label: 'All Reports', icon: FileText },
    { id: 'tips', label: 'Anonymous Tips', icon: Lightbulb },
    { id: 'sos', label: 'SOS Alerts', icon: AlertOctagon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white via-purple-50 to-blue-50 shadow-xl z-40 transform transition-transform duration-300 border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } pt-20`}>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-200 to-blue-300 text-gray-900 shadow'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-br from-purple-200 to-blue-300 rounded-2xl p-4 shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <p className="text-purple-900 font-bold text-sm">Admin Panel</p>
              <p className="text-purple-800/80 text-xs">System Control</p>
            </div>
          </div>
          <button className="w-full bg-white hover:bg-gray-100 text-purple-600 py-2 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
