import React, { useState } from 'react';
import { Search, Clock, MapPin, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { trackTip } from '../../api/tips';

const TrackTip = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [tipData, setTipData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      setError('Please enter a tracking code');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await trackTip(trackingCode.trim());
      setTipData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Tip not found. Please check your tracking code and try again.');
      setTipData(null);
      console.error('Error tracking tip:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          label: 'Under Review',
          description: 'Your tip has been received and is being reviewed by law enforcement.'
        };
      case 'IN_PROGRESS':
        return {
          icon: Eye,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Being Investigated',
          description: 'Law enforcement is actively investigating this tip.'
        };
      case 'RESOLVED':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          label: 'Resolved',
          description: 'This tip has been investigated and appropriate action has been taken.'
        };
      case 'CLOSED':
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          label: 'Closed',
          description: 'This tip has been closed.'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          label: status || 'Unknown',
          description: 'Status information is being updated.'
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Track Your Anonymous Tip</h2>
          <p className="text-gray-600">
            Enter your tracking code to check the status of your submitted tip.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex space-x-3">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => {
                setTrackingCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Enter your tracking code (e.g., TIP-ABC123)"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Track Tip</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Tip Details */}
        {tipData && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`${getStatusInfo(tipData.status).bg} ${getStatusInfo(tipData.status).border} border-2 rounded-2xl p-6`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {React.createElement(getStatusInfo(tipData.status).icon, {
                    className: `w-12 h-12 ${getStatusInfo(tipData.status).color}`
                  })}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Status: {getStatusInfo(tipData.status).label}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {getStatusInfo(tipData.status).description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Submitted</p>
                      <p className="text-gray-800 font-medium">{formatDate(tipData.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Last Updated</p>
                      <p className="text-gray-800 font-medium">{formatDate(tipData.lastUpdatedAt || tipData.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip Information */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Tip Information</h4>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Title</p>
                  <p className="text-gray-800 font-medium">{tipData.title}</p>
                </div>

                {/* Category */}
                {tipData.category && (
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Category</p>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {tipData.category.replace('_', ' ')}
                    </span>
                  </div>
                )}

                {/* Location */}
                {tipData.location && (
                  <div>
                    <p className="text-gray-500 text-sm mb-1 flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </p>
                    <p className="text-gray-800">{tipData.location}</p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Description</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{tipData.description}</p>
                </div>

                {/* Tracking Code */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Tracking Code</p>
                  <code className="inline-block bg-white px-3 py-2 rounded-lg border border-gray-200 text-blue-700 font-mono font-bold">
                    {tipData.trackingCode}
                  </code>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> The status of your tip is updated as law enforcement reviews and investigates. 
                Check back periodically for updates. Thank you for helping keep our community safe.
              </p>
            </div>
          </div>
        )}

        {/* Help Section (shown when no tip is displayed) */}
        {!tipData && !loading && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">How to Track Your Tip</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Enter the tracking code you received when you submitted your tip</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Click "Track Tip" to view the current status</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Check back anytime to see updates on your tip</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                <strong>Lost your tracking code?</strong> Unfortunately, tracking codes cannot be recovered as tips are completely anonymous. 
                Make sure to save your tracking code when you submit a tip.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackTip;
