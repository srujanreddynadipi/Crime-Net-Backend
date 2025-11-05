import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Eye, X, Camera, Image, FileText, UserCheck, MessageSquare } from 'lucide-react';
import { getReportsByStatus } from '../../api/reports';

const ActiveCasesTable = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchActiveCases();
  }, []);

  const fetchActiveCases = async () => {
    try {
      setLoading(true);
      const reports = await getReportsByStatus('UNDER_INVESTIGATION');
      setCases(reports || []);
    } catch (error) {
      console.error('Error fetching active cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp._seconds 
      ? new Date(timestamp._seconds * 1000)
      : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const filteredCases = cases.filter(c => 
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.reportId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    const p = priority?.toUpperCase();
    switch(p) {
      case 'CRITICAL': return 'text-red-400 bg-red-500/20';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20';
      case 'LOW': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'SUBMITTED': return 'text-blue-400 bg-blue-500/20';
      case 'UNDER_INVESTIGATION': return 'text-yellow-400 bg-yellow-500/20';
      case 'RESOLVED': return 'text-green-400 bg-green-500/20';
      case 'CLOSED': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6">Active Cases</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-white/5 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h3 className="text-2xl font-bold text-white">Active Cases ({filteredCases.length})</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={fetchActiveCases}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {filteredCases.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No active cases found</p>
          <p className="text-gray-500 text-sm mt-2">Cases under investigation will appear here</p>
        </div>
      ) : (
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
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.reportId} className="border-b border-white/10 hover:bg-white/5 transition-all">
                  <td className="py-4 px-4">
                    <span className="text-white font-bold">{caseItem.reportId || caseItem.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{caseItem.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">{caseItem.location || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-400 text-sm">{formatDate(caseItem.createdAt)}</span>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCase && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-linear-to-br from-gray-900 to-blue-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Case Details - {selectedCase.reportId}</h3>
                <p className="text-gray-400">Reported by User ID: {selectedCase.userId}</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Crime Type</p>
                <p className="text-white font-bold text-lg">{selectedCase.category}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white font-bold text-lg">{selectedCase.location || 'Not specified'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Priority</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(selectedCase.priority)}`}>
                  {selectedCase.priority}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Assigned Officer</p>
                <p className="text-white font-bold text-lg">{selectedCase.assignedOfficerId || 'Unassigned'}</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
              <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Title</span>
              </h4>
              <p className="text-gray-300 leading-relaxed font-semibold mb-2">
                {selectedCase.title}
              </p>
              <h4 className="text-white font-bold mb-2 mt-4">Description</h4>
              <p className="text-gray-300 leading-relaxed">
                {selectedCase.description}
              </p>
            </div>

            {selectedCase.latitude && selectedCase.longitude && (
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
                <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Coordinates</span>
                </h4>
                <p className="text-gray-300">
                  Lat: {selectedCase.latitude}, Long: {selectedCase.longitude}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button 
                onClick={() => setSelectedCase(null)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveCasesTable;
