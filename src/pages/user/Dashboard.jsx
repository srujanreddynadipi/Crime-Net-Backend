import React from 'react';
import QuickStats from './QuickStats';
import QuickStatsAPI from './QuickStatsAPI';
import QuickActions from './QuickActions';
import MyCases from './MyCases';
import MyCasesAPI from './MyCasesAPI';
import SafetyTips from './SafetyTips';
import CommunityFeed from './CommunityFeed';
import ReportCrime from './ReportCrime';
import ReportCrimeAPI from './ReportCrimeAPI';
import ChatModule from './ChatModule';
import ChatModuleAPI from './ChatModuleAPI';
import MissingPersons from './MissingPersons';
import MissingPersonsAPI from './MissingPersonsAPI';
import SafetyAlerts from './SafetyAlerts';
import SafetyAlertsAPI from './SafetyAlertsAPI';
import HelpResources from './HelpResources';
import UserProfile from './UserProfile';
import AnonymousTips from './AnonymousTips';
import TrackTip from './TrackTip';
import NotificationsCenter from './NotificationsCenter';
import SOSAlert from './SOSAlert';
import AnalyticsDashboard from './AnalyticsDashboard';
import FeedbackSystem from './FeedbackSystem';

const Dashboard = ({ activeTab, setActiveTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <QuickStatsAPI />
            <QuickActions setActiveTab={setActiveTab} />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MyCasesAPI />
              </div>
              <div>
                <SafetyTips />
                <CommunityFeed />
              </div>
            </div>
          </>
        );
      case 'report':
        return <ReportCrimeAPI />;
      case 'cases':
        return <MyCasesAPI />;
      case 'chat':
        return <ChatModuleAPI />;
      case 'missing':
        return <MissingPersonsAPI />;
      case 'alerts':
        return <SafetyAlertsAPI />;
      case 'community':
        return <CommunityFeed />;
      case 'resources':
        return <HelpResources />;
      case 'tips':
        return <AnonymousTips />;
      case 'track-tip':
        return <TrackTip />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'sos':
        return <SOSAlert />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'feedback':
        return <FeedbackSystem />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <UserProfile />;
      default:
        return <QuickStatsAPI />;
    }
  };

  return <div className="flex-1 p-4 md:p-8">{renderContent()}</div>;
};

export default Dashboard;
