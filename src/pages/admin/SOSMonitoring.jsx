import React from 'react';
import { AlertOctagon, MapPin, Clock } from 'lucide-react';

const SOSMonitoring = () => {
  // Mock data - will be replaced with API calls
  const sosAlerts = [
    { id: 1, user: 'John Doe', location: 'Downtown', time: '5 mins ago', status: 'ACTIVE' },
    { id: 2, user: 'Jane Smith', location: 'Park Avenue', time: '15 mins ago', status: 'RESPONDED' },
    { id: 3, user: 'Bob Johnson', location: 'Main Street', time: '1 hour ago', status: 'RESOLVED' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return 'bg-red-100 text-red-800 animate-pulse';
      case 'RESPONDED': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">SOS Alert Monitoring</h2>
          <AlertOctagon className="w-6 h-6 text-red-500" />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {sosAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 flex-1">
                <AlertOctagon className={`w-8 h-8 ${alert.status === 'ACTIVE' ? 'text-red-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{alert.user}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{alert.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{alert.time}</span>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOSMonitoring;
