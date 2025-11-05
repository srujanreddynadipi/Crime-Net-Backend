import React from 'react';
import StatsCards from './StatsCards';
import ActiveCasesTable from './ActiveCasesTable';
import LiveCrimeMap from './LiveCrimeMap';
import SecureChat from './SecureChat';
import AnalyticsDashboard from './AnalyticsDashboard';
import MissingPersons from './MissingPersons';
import CommunityWatch from './CommunityWatch';
import EvidenceVault from './EvidenceVault';
import ReportsModule from './ReportsModule';

const Dashboard = ({ activeTab }) => {
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <StatsCards />
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <ActiveCasesTable />
              <LiveCrimeMap />
            </div>
            <AnalyticsDashboard />
          </>
        );
      case 'cases':
        return <ActiveCasesTable />;
      case 'map':
        return <LiveCrimeMap />;
      case 'messages':
        return <SecureChat />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'community':
        return <CommunityWatch />;
      case 'missing':
        return <MissingPersons />;
      case 'evidence':
        return <EvidenceVault />;
      case 'reports':
        return <ReportsModule />;
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
