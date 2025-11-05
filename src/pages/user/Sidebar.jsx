import React from 'react';
import { Home, AlertCircle, FileText, MapPinned, MessageSquare, Users, Bell, Search, HelpCircle, Settings, Phone, Zap, User, Eye, EyeOff, AlertTriangle, BarChart3, Star } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'sos', label: 'Emergency SOS', icon: AlertTriangle, highlight: true },
    { id: 'report', label: 'Report Crime', icon: AlertCircle },
    { id: 'cases', label: 'My Cases', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback & Ratings', icon: Star },
    { id: 'tips', label: 'Anonymous Tips', icon: EyeOff },
    { id: 'track-tip', label: 'Track Tip', icon: Eye },
    { id: 'track', label: 'Track Case', icon: MapPinned },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'community', label: 'Community Watch', icon: Users },
    { id: 'alerts', label: 'Safety Alerts', icon: Bell },
    { id: 'missing', label: 'Missing Persons', icon: Search },
    { id: 'resources', label: 'Help & Resources', icon: HelpCircle },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white via-blue-50 to-purple-50 shadow-xl z-40 transform transition-transform duration-300 border-r border-gray-200 ${
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
                item.highlight 
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg animate-pulse'
                  : activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 shadow'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-br from-red-200 to-pink-300 rounded-2xl p-4 shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-700" />
            </div>
            <div>
              <p className="text-red-900 font-bold text-sm">Emergency</p>
              <p className="text-red-800/80 text-xs">24/7 Support</p>
            </div>
          </div>
          <button className="w-full bg-white hover:bg-gray-100 text-red-600 py-2 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Call 100</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
