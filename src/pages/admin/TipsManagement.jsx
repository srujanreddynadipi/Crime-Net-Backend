import React from 'react';
import { Lightbulb, Eye, Check } from 'lucide-react';

const TipsManagement = () => {
  // Mock data - will be replaced with API calls
  const tips = [
    { id: 1, trackingCode: 'TIP-001', category: 'Theft', submitted: '2025-11-05', status: 'PENDING' },
    { id: 2, trackingCode: 'TIP-002', category: 'Vandalism', submitted: '2025-11-04', status: 'REVIEWED' },
    { id: 3, trackingCode: 'TIP-003', category: 'Suspicious Activity', submitted: '2025-11-03', status: 'ACTIONED' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWED': return 'bg-blue-100 text-blue-800';
      case 'ACTIONED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Anonymous Tips Management</h2>
          <Lightbulb className="w-6 h-6 text-yellow-500" />
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tips.map((tip) => (
                <tr key={tip.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{tip.trackingCode}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tip.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tip.submitted}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(tip.status)}`}>
                      {tip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Check className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TipsManagement;
