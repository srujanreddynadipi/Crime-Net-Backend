import React from 'react';
import { Target, TrendingUp, Activity, Clock, BarChart3 } from 'lucide-react';
import { mockHotspots } from './mockData';

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Target className="w-6 h-6" />
            <span>Crime Hotspots</span>
          </h3>
          <div className="space-y-4">
            {mockHotspots.map((hotspot, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold">{hotspot.area}</span>
                  <div className="flex items-center space-x-2">
                    {hotspot.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    ) : hotspot.trend === 'down' ? (
                      <TrendingUp className="w-4 h-4 text-green-400 transform rotate-180" />
                    ) : (
                      <Activity className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className={`text-sm font-bold ${
                      hotspot.trend === 'up' ? 'text-red-400' : 
                      hotspot.trend === 'down' ? 'text-green-400' : 
                      'text-yellow-400'
                    }`}>
                      {hotspot.percentage > 0 ? '+' : ''}{hotspot.percentage}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{hotspot.crimes} incidents</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span>Response Time Analytics</span>
          </h3>
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 border border-white/20 h-64 flex flex-col justify-center">
            <div className="text-center mb-6">
              <p className="text-6xl font-bold text-white mb-2">8.2m</p>
              <p className="text-gray-300">Average Response Time</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-400">6.1m</p>
                <p className="text-gray-400 text-xs">Urgent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">8.5m</p>
                <p className="text-gray-400 text-xs">High</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">10.2m</p>
                <p className="text-gray-400 text-xs">Medium</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6" />
          <span>Case Resolution Trends</span>
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {['This Week', 'This Month', 'Last 3 Months', 'This Year'].map((period, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">{period}</p>
              <p className="text-3xl font-bold text-white mb-1">{85 + idx * 2}%</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                  style={{ width: `${85 + idx * 2}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
