import React, { useState } from 'react';
import { MapPin, Clock, X, CheckCircle } from 'lucide-react';
import { userCases } from './mockData';

const MyCases = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'under-review':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'assigned':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">My Cases</h3>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {userCases.map((caseItem) => (
          <div key={caseItem.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-bold text-gray-800">{caseItem.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-1">{caseItem.type}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{caseItem.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{caseItem.date}</span>
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedCase(caseItem)} className="bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:shadow">
                View Details
              </button>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-800 font-bold">{caseItem.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-300 to-purple-400 h-2 rounded-full"
                  style={{ width: `${caseItem.progress}%` }}
                />
              </div>
              {caseItem.officer && (
                <p className="text-gray-600 text-xs mt-2">
                  Assigned to: <span className="font-bold text-gray-800">{caseItem.officer}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCase && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Case #{selectedCase.id}</h3>
                <p className="text-gray-600">{selectedCase.type}</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedCase.status)}`}>
                  {selectedCase.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Priority</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedCase.priority)}`}>
                  {selectedCase.priority.toUpperCase()}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Location</p>
                <p className="text-gray-800 font-bold">{selectedCase.location}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Reported</p>
                <p className="text-gray-800 font-bold">{selectedCase.date}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Timeline</h4>
              <div className="space-y-3">
                {[
                  { status: 'Report Filed', time: '2 days ago', completed: true },
                  { status: 'Under Review', time: '1 day ago', completed: true },
                  { status: 'Officer Assigned', time: '12 hours ago', completed: true },
                  { status: 'Investigation', time: 'In Progress', completed: false },
                  { status: 'Resolution', time: 'Pending', completed: false },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-gradient-to-br from-green-200 to-green-300' : 'bg-gray-300'
                    }`}>
                      {step.completed ? <CheckCircle className="w-5 h-5 text-green-700" /> : <Clock className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-sm">{step.status}</p>
                      <p className="text-gray-500 text-xs">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 py-3 rounded-xl font-bold hover:shadow">
                Chat with Officer
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCases;
