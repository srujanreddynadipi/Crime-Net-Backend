import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { alerts } from './mockData';

const SafetyAlerts = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Safety Alerts</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {alerts.map((alert) => (
          <div key={alert.id} className={`rounded-2xl p-6 border-2 shadow-sm ${
            alert.severity === 'urgent' ? 'bg-red-50 border-red-200' :
            alert.severity === 'high' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                alert.severity === 'urgent' ? 'bg-red-200' :
                alert.severity === 'high' ? 'bg-orange-200' : 'bg-blue-200'
              }`}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-800 font-bold">{alert.type}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    alert.severity === 'urgent' ? 'bg-red-200 text-red-800' :
                    alert.severity === 'high' ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{alert.location}</p>
                <p className="text-gray-500 text-xs mb-3">{alert.time}</p>
                <button className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-gray-200">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
        <h4 className="text-gray-800 font-bold text-lg mb-4">Subscribe to Alerts</h4>
        <p className="text-gray-600 mb-4">Get instant notifications about safety incidents in your area</p>
        <div className="flex space-x-3">
          <input type="text" placeholder="Enter your location..." className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800" />
          <button className="bg-gradient-to-r from-purple-200 to-pink-300 text-gray-900 px-6 py-3 rounded-xl font-bold hover:shadow">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default SafetyAlerts;
