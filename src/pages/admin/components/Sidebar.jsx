import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, ShieldCheck, FileText, BarChart3, PieChart, Radio, Bell, 
  Settings, Database, ShieldAlert
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { id: 'users', label: 'User Management', icon: Users, path: '/admin/users' },
    { id: 'police', label: 'Police Management', icon: ShieldCheck, path: '/admin/police' },
    { id: 'cases', label: 'Case Management', icon: FileText, path: '/admin/cases' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { id: 'reports', label: 'Reports', icon: PieChart, path: '/admin/reports' },
    { id: 'community', label: 'Community Monitor', icon: Radio, path: '/admin/feedback' },
    { id: 'alerts', label: 'Alert System', icon: Bell, path: '/admin/sos' },
    { id: 'settings', label: 'System Settings', icon: Settings, path: '/admin/settings' },
    { id: 'logs', label: 'Activity Logs', icon: Database, path: '/admin/tips' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      <aside className={`fixed left-0 top-0 h-full w-64 bg-linear-to-b from-white via-purple-50 to-pink-50 shadow-xl z-40 transform transition-transform duration-300 border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } pt-20`}>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-linear-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">System Status</p>
              <p className="text-white/80 text-xs">All systems normal</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1 bg-white/20 rounded-lg p-2 text-center">
              <p className="text-white text-xs">Uptime</p>
              <p className="text-white font-bold text-sm">99.9%</p>
            </div>
            <div className="flex-1 bg-white/20 rounded-lg p-2 text-center">
              <p className="text-white text-xs">Load</p>
              <p className="text-white font-bold text-sm">42%</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
