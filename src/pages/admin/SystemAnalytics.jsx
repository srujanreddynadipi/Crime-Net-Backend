import React from 'react';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

const SystemAnalytics = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">System Analytics</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Reports This Month</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
            <span className="text-green-500 text-sm font-semibold">+12%</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Resolution Rate</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
            <span className="text-green-500 text-sm font-semibold">+5%</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">892</p>
              </div>
            </div>
            <span className="text-green-500 text-sm font-semibold">+8%</span>
          </div>

          <div className="mt-6">
            <button className="w-full py-3 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              View Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
