import React from 'react';
import StatsCards from './StatsCards';
import ActiveCasesTable from './ActiveCasesTable';
import LiveCrimeMap from './LiveCrimeMap';
import SecureChat from './SecureChat';
import MissingPersons from './MissingPersons';
import CommunityWatch from './CommunityWatch';
import ReportsModule from './ReportsModule';
import SOSMonitoring from './SOSMonitoring';
import CaseAssignment from './CaseAssignment';
import ReportManagementAPI from './ReportManagementAPI';
import EvidenceVaultAPI from './EvidenceVaultAPI';
import AnalyticsDashboardAPI from './AnalyticsDashboardAPI';

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
            <AnalyticsDashboardAPI />
          </>
        );
      case 'sos':
        return <SOSMonitoring />;
      case 'assignment':
        return <CaseAssignment />;
      case 'report-management':
        return <ReportManagementAPI />;
      case 'cases':
        return <ActiveCasesTable />;
      case 'map':
        return <LiveCrimeMap />;
      case 'messages':
        return <SecureChat />;
      case 'analytics':
        return <AnalyticsDashboardAPI />;
      case 'community':
        return <CommunityWatch />;
      case 'missing':
        return <MissingPersons />;
      case 'evidence':
        return <EvidenceVaultAPI />;
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
