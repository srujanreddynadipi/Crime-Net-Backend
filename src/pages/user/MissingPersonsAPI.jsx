import React, { useState, useEffect } from 'react';
import { User, MapPin, Share2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllReports } from '../../api/reports';

const MissingPersonsAPI = () => {
  const { currentUser } = useAuth();
  const [missingPersons, setMissingPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMissingPersons();
  }, []);

  const loadMissingPersons = async () => {
    try {
      setLoading(true);
      // Fetch all reports and filter for MISSING_PERSON category
      const allReports = await getAllReports();
      const missingReports = allReports
        .filter(report => report.category === 'MISSING_PERSON')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setMissingPersons(missingReports);
    } catch (err) {
      setError('Failed to load missing persons reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'IN_PROGRESS':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'PENDING':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Missing Persons</h3>
        </div>
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading missing persons reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Missing Persons</h3>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadMissingPersons}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Missing Persons</h3>
        <button className="bg-gradient-to-r from-red-200 to-pink-300 text-gray-900 px-6 py-3 rounded-xl font-bold hover:shadow flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Report Missing Person</span>
        </button>
      </div>

      {missingPersons.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No missing persons reports found</p>
          <p className="text-gray-500 text-sm">Missing persons reports will appear here</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {missingPersons.map((person) => (
            <div key={person.reportId} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="bg-gradient-to-br from-orange-200 to-red-300 h-48 flex items-center justify-center">
                <User className="w-24 h-24 text-white/80" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(person.status)}`}>
                    {person.status === 'RESOLVED' ? 'FOUND' : 'SEARCHING'}
                  </span>
                  <span className="text-gray-400 text-xs">{formatDate(person.createdAt)}</span>
                </div>
                <h4 className="text-gray-800 font-bold text-xl mb-2">{person.title}</h4>
                <p className="text-gray-600 text-sm mb-4 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Last seen: {person.location}</span>
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {person.description}
                </p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 py-2 rounded-lg font-medium hover:shadow">
                    View Details
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissingPersonsAPI;
