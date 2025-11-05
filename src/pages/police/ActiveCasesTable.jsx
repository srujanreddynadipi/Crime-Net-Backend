import React, { useState } from 'react';
import { Search, Filter, MapPin, Eye, X, Camera, Image, FileText, UserCheck, MessageSquare } from 'lucide-react';
import { mockCases } from './mockData';

const ActiveCasesTable = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'text-blue-400 bg-blue-500/20';
      case 'in-progress': return 'text-yellow-400 bg-yellow-500/20';
      case 'resolved': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h3 className="text-2xl font-bold text-white">Active Cases</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search cases..."
              className="bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-gray-400 font-medium py-3 px-4">Case ID</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Type</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Location</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Priority</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Time</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCases.map((caseItem) => (
              <tr key={caseItem.id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                <td className="py-4 px-4">
                  <span className="text-white font-bold">{caseItem.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{caseItem.type}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{caseItem.location}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status.replace('-', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-400 text-sm">{caseItem.time}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedCase(caseItem)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      Accept
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Case Details - {selectedCase.id}</h3>
                <p className="text-gray-400">Reported by {selectedCase.reporter}</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Crime Type</p>
                <p className="text-white font-bold text-lg">{selectedCase.type}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white font-bold text-lg">{selectedCase.location}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Priority</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(selectedCase.priority)}`}>
                  {selectedCase.priority.toUpperCase()}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Evidence Count</p>
                <p className="text-white font-bold text-lg">{selectedCase.evidence} files</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
              <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Description</span>
              </h4>
              <p className="text-gray-300 leading-relaxed">
                This is a detailed description of the incident. The reporter has provided comprehensive information including time, date, and circumstances. Multiple witnesses have been identified and evidence has been uploaded to the system.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
              <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Evidence Files</span>
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-blue-500 transition-all cursor-pointer">
                    <Image className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="text-gray-300 text-xs">Evidence_{i}.jpg</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                <UserCheck className="w-5 h-5" />
                <span>Accept Case</span>
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Contact Reporter</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/20">
                Reassign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveCasesTable;
