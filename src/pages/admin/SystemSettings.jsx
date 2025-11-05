import React from 'react';
import { Settings, Bell, Shield, Database, Mail } from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">System Settings</h2>
          <Settings className="w-6 h-6 text-gray-500" />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-2 ml-8">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700">Email notifications for new reports</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700">Push notifications for SOS alerts</span>
              </label>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Security</h3>
            </div>
            <div className="space-y-2 ml-8">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700">Two-factor authentication required</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700">Auto-logout after 30 minutes</span>
              </label>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Data Management</h3>
            </div>
            <div className="space-y-2 ml-8">
              <button className="text-sm text-blue-600 hover:text-blue-800">Export all data</button>
              <br />
              <button className="text-sm text-blue-600 hover:text-blue-800">Backup database</button>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-gray-900">Email Configuration</h3>
            </div>
            <div className="space-y-2 ml-8">
              <input
                type="email"
                placeholder="Admin email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button className="text-sm text-blue-600 hover:text-blue-800">Update configuration</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
