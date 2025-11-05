import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ChevronRight, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getReportsByUser, getReportTimeline } from '../../api/reports';

const MyCasesAPI = () => {
  const { currentUser } = useAuth();
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (currentUser?.uid) {
      loadUserCases();
    }
  }, [currentUser]);
  
  const loadUserCases = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getReportsByUser(currentUser.uid);
      setCases(data);
    } catch (err) {
      console.error('Error loading cases:', err);
      setError('Failed to load your cases');
    } finally {
      setLoading(false);
    }
  };
  
  const loadTimeline = async (caseId) => {
    try {
      const data = await getReportTimeline(caseId);
      setTimeline(data);
    } catch (err) {
      console.error('Error loading timeline:', err);
      setTimeline([]);
    }
  };
  
  const handleViewDetails = async (caseItem) => {
    setSelectedCase(caseItem);
    await loadTimeline(caseItem.reportId);
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'RESOLVED': return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-700 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Handle Firestore Timestamp object {_seconds, _nanoseconds}
    let date;
    if (timestamp._seconds !== undefined) {
      date = new Date(timestamp._seconds * 1000);
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else {
      return 'Invalid Date';
    }
    
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">My Cases</h3>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      {cases.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">You haven't filed any reports yet.</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
            File Your First Report
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <div key={caseItem.reportId} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2 flex-wrap gap-2">
                    <span className="font-bold text-gray-800">#{caseItem.caseNumber}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status.replace('_', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(caseItem.severity)}`}>
                      {caseItem.severity}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-1">{caseItem.title}</p>
                  <p className="text-gray-600 text-sm mb-2">{caseItem.category?.replace('_', ' ')}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{caseItem.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(caseItem.createdAt)}</span>
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleViewDetails(caseItem)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all whitespace-nowrap"
                >
                  View Details
                </button>
              </div>
              
              {caseItem.assignedOfficerId && (
                <p className="text-gray-600 text-xs mt-2">
                  Assigned Officer ID: <span className="font-bold text-gray-800">{caseItem.assignedOfficerId}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Case #{selectedCase.caseNumber}</h3>
                <p className="text-gray-600">{selectedCase.title}</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedCase.status)}`}>
                  {selectedCase.status.replace('_', ' ')}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Priority</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(selectedCase.priority)}`}>
                  {selectedCase.priority || 'N/A'}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Category</p>
                <p className="text-gray-800 font-bold">{selectedCase.category?.replace('_', ' ')}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Reported</p>
                <p className="text-gray-800 font-bold">{formatDate(selectedCase.createdAt)}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-2">Location</h4>
              <p className="text-gray-700">{selectedCase.location}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedCase.description}</p>
            </div>
            
            {timeline.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Timeline</h4>
                <div className="space-y-3">
                  {timeline.map((event, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium text-sm">{event.action}</p>
                        <p className="text-gray-500 text-xs">{formatDate(event.timestamp)}</p>
                        {event.note && <p className="text-gray-600 text-xs mt-1">{event.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                Chat with Officer
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCasesAPI;
