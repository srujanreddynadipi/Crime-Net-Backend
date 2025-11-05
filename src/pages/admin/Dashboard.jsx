import React from 'react';
import StatsCards from './StatsCards';
import UserManagement from './UserManagement';
import ReportsOverview from './ReportsOverview';
import SystemAnalytics from './SystemAnalytics';
import TipsManagement from './TipsManagement';
import SOSMonitoring from './SOSMonitoring';
import FeedbackManagement from './FeedbackManagement';
import SystemSettings from './SystemSettings';

const Dashboard = ({ activeTab }) => {
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <StatsCards />
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <ReportsOverview />
              <SystemAnalytics />
            </div>
          </>
        );
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <ReportsOverview />;
      case 'analytics':
        return <SystemAnalytics />;
      case 'tips':
        return <TipsManagement />;
      case 'sos':
        return <SOSMonitoring />;
      case 'feedback':
        return <FeedbackManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <StatsCards />;
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      {renderContent()}
    </div>
  );
};

export default Dashboard;
