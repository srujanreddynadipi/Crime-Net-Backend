import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from './admin/components/AdminHeader';
import Sidebar from './admin/components/Sidebar';
import StatsOverview from './admin/components/StatsOverview';
import UserManagementAPI from './admin/UserManagementAPI';
import SystemAnalyticsAPI from './admin/SystemAnalyticsAPI';
import FeedbackManagementAPI from './admin/FeedbackManagementAPI';
import ReportsOverviewAPI from './admin/ReportsOverviewAPI';
import TipsManagementAPI from './admin/TipsManagementAPI';
import SOSMonitoring from './admin/SOSMonitoring';
import SystemSettings from './admin/SystemSettings';

// Dashboard Content Component
const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <StatsOverview />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Overview</h3>
            <p className="text-gray-600">Welcome to the CrimeNet Admin Dashboard. Use the sidebar to navigate through different sections.</p>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <p className="text-gray-600 text-sm">Activity logs will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:ml-64 pt-20">
        <div className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/users" element={<UserManagementAPI />} />
            <Route path="/police" element={<UserManagementAPI />} />
            <Route path="/cases" element={<ReportsOverviewAPI />} />
            <Route path="/analytics" element={<SystemAnalyticsAPI />} />
            <Route path="/feedback" element={<FeedbackManagementAPI />} />
            <Route path="/reports" element={<ReportsOverviewAPI />} />
            <Route path="/tips" element={<TipsManagementAPI />} />
            <Route path="/sos" element={<SOSMonitoring />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
