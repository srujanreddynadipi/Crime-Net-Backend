import React from 'react';
import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

const ReportsOverview = () => {
  // Mock data - will be replaced with API calls
  const reports = [
    { id: 1, title: 'Theft at Main Street', status: 'PENDING', priority: 'High', date: '2025-11-05', officer: 'Unassigned' },
    { id: 2, title: 'Vandalism in Park', status: 'IN_PROGRESS', priority: 'Medium', date: '2025-11-04', officer: 'Jane Smith' },
    { id: 3, title: 'Assault Report', status: 'RESOLVED', priority: 'High', date: '2025-11-03', officer: 'Alice Brown' },
    { id: 4, title: 'Noise Complaint', status: 'PENDING', priority: 'Low', date: '2025-11-05', officer: 'Unassigned' },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'PENDING': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'IN_PROGRESS': return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case 'RESOLVED': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Reports Overview</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 flex-1">
                {getStatusIcon(report.status)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">Officer: {report.officer}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(report.priority)}`}>
                  {report.priority}
                </span>
                <span className="text-sm text-gray-500">{report.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsOverview;
