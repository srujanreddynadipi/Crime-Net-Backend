import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllReports } from '../../api/reports';

const SafetyAlertsAPI = () => {
  const { currentUser } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    loadSafetyAlerts();
  }, []);

  const loadSafetyAlerts = async () => {
    try {
      setLoading(true);
      // Fetch all reports and filter for high severity incidents
      const allReports = await getAllReports();
      const safetyAlerts = allReports
        .filter(report => ['HIGH', 'CRITICAL'].includes(report.severity))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 12); // Show latest 12 alerts
      
      setAlerts(safetyAlerts);
    } catch (err) {
      setError('Failed to load safety alerts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityInfo = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-200 text-red-800',
          icon: 'bg-red-200'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          badge: 'bg-orange-200 text-orange-800',
          icon: 'bg-orange-200'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          badge: 'bg-blue-200 text-blue-800',
          icon: 'bg-blue-200'
        };
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Safety Alerts</h3>
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading safety alerts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Safety Alerts</h3>
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadSafetyAlerts}
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
      <h3 className="text-2xl font-bold text-gray-800">Safety Alerts</h3>

      {alerts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No recent safety alerts</p>
          <p className="text-gray-500 text-sm">High-severity incidents will appear here</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {alerts.map((alert) => {
            const severityInfo = getSeverityInfo(alert.severity);
            return (
              <div 
                key={alert.reportId} 
                className={`rounded-2xl p-6 border-2 shadow-sm ${severityInfo.bg} ${severityInfo.border}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${severityInfo.icon}`}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-gray-800 font-bold">{alert.category.replace('_', ' ')}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityInfo.badge}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2 flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </p>
                    <p className="text-gray-500 text-xs mb-3 flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(alert.createdAt)}</span>
                    </p>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {alert.description}
                    </p>
                    <button className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-gray-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
        <h4 className="text-gray-800 font-bold text-lg mb-4">Subscribe to Alerts</h4>
        <p className="text-gray-600 mb-4">Get instant notifications about safety incidents in your area</p>
        <div className="flex space-x-3">
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location..." 
            className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800" 
          />
          <button className="bg-gradient-to-r from-purple-200 to-pink-300 text-gray-900 px-6 py-3 rounded-xl font-bold hover:shadow">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyAlertsAPI;
