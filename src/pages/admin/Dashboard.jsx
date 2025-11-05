import React from 'react';
import StatsCards from './StatsCards';
import UserManagementAPI from './UserManagementAPI';
import ReportsOverviewAPI from './ReportsOverviewAPI';
import SystemAnalyticsAPI from './SystemAnalyticsAPI';
import TipsManagementAPI from './TipsManagementAPI';
import FeedbackManagementAPI from './FeedbackManagementAPI';
import SystemSettings from './SystemSettings';

// Import police SOS Monitoring (reuse for admin)
import SOSMonitoring from '../police/SOSMonitoring';

const Dashboard = ({ activeTab }) => {
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <SystemAnalyticsAPI />
          </>
        );
      case 'users':
        return <UserManagementAPI />;
      case 'reports':
        return <ReportsOverviewAPI />;
      case 'analytics':
        return <SystemAnalyticsAPI />;
      case 'tips':
        return <TipsManagementAPI />;
      case 'sos':
        return <SOSMonitoring />;
      case 'feedback':
        return <FeedbackManagementAPI />;
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
