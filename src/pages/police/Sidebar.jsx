import React from 'react';
import { BarChart3, FileText, MapPin, MessageSquare, TrendingUp, Users, AlertTriangle, Lock, Phone, AlertOctagon, UserCheck } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'sos', label: 'SOS Monitoring', icon: AlertOctagon },
    { id: 'assignment', label: 'Case Assignment', icon: UserCheck },
    { id: 'report-management', label: 'Report Management', icon: FileText },
    { id: 'cases', label: 'Active Cases', icon: FileText },
    { id: 'map', label: 'Live Crime Map', icon: MapPin },
    { id: 'messages', label: 'Secure Chat', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'community', label: 'Community Watch', icon: Users },
    { id: 'missing', label: 'Missing Persons', icon: AlertTriangle },
    { id: 'evidence', label: 'Evidence Vault', icon: Lock },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return ( 
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
        <aside className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 shadow-xl z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } pt-20`}>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-white text-indigo-600 shadow-lg font-semibold'
                    : 'text-white hover:bg-white/20'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30">
          <p className="text-white font-bold mb-2">Emergency Support</p>
          <p className="text-white/90 text-sm mb-3">24/7 Control Room</p>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all">
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
