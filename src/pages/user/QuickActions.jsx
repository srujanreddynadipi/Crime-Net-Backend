import React from 'react';
import { AlertCircle, MapPinned, MessageSquare, Search } from 'lucide-react';

const QuickActions = ({ setActiveTab }) => {
  const actions = [
    { id: 'report', label: 'Report Crime', icon: AlertCircle, gradient: 'from-red-200 to-pink-300', desc: 'File a new complaint' },
    { id: 'track', label: 'Track Case', icon: MapPinned, gradient: 'from-blue-200 to-purple-300', desc: 'Check case status' },
    { id: 'chat', label: 'Chat with Officer', icon: MessageSquare, gradient: 'from-green-200 to-teal-300', desc: 'Secure messaging' },
    { id: 'missing', label: 'Report Missing', icon: Search, gradient: 'from-orange-200 to-red-300', desc: 'Person or item' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => setActiveTab(action.id)}
            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-left"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-3`}>
              <action.icon className="w-6 h-6 text-gray-700" />
            </div>
            <p className="font-bold text-gray-800 text-sm mb-1">{action.label}</p>
            <p className="text-gray-500 text-xs">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
