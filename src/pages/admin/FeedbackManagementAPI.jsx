import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, User, TrendingUp, Award } from 'lucide-react';
import { getAllFeedback, getFeedbackByOfficer } from '../../api/feedback';
import { getUsersByRole } from '../../api/users';

const FeedbackManagementAPI = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOfficer, setSelectedOfficer] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedOfficer && selectedOfficer !== 'all') {
      fetchOfficerFeedback(selectedOfficer);
    } else {
      fetchAllFeedback();
    }
  }, [selectedOfficer]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [feedbackData, officersData] = await Promise.all([
        getAllFeedback(),
        getUsersByRole('POLICE')
      ]);
      setFeedbacks(feedbackData || []);
      setOfficers(officersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFeedback = async () => {
    try {
      const data = await getAllFeedback();
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const fetchOfficerFeedback = async (officerId) => {
    try {
      const data = await getFeedbackByOfficer(officerId);
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching officer feedback:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp._seconds 
      ? new Date(timestamp._seconds * 1000)
      : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const calculateOfficerStats = () => {
    const stats = {};
    
    feedbacks.forEach(feedback => {
      const officerId = feedback.officerId;
      if (!stats[officerId]) {
        stats[officerId] = {
          totalRatings: 0,
          sumRatings: 0,
          feedbackCount: 0
        };
      }
      stats[officerId].totalRatings++;
      stats[officerId].sumRatings += feedback.rating;
      stats[officerId].feedbackCount++;
    });

    return Object.entries(stats).map(([officerId, data]) => {
      const officer = officers.find(o => o.userId === officerId);
      return {
        officerId,
        officerName: officer?.fullName || 'Unknown Officer',
        avgRating: (data.sumRatings / data.totalRatings).toFixed(1),
        feedbackCount: data.feedbackCount
      };
    }).sort((a, b) => b.avgRating - a.avgRating);
  };

  const officerStats = calculateOfficerStats();
  const overallAvgRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Feedback Management</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">{overallAvgRating}</p>
                <div className="flex">
                  {renderStars(Math.round(overallAvgRating))}
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top Officers</p>
              <p className="text-2xl font-bold text-gray-900">{officerStats.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Officers Leaderboard */}
      {officerStats.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Officer Performance Leaderboard
          </h3>
          <div className="space-y-3">
            {officerStats.slice(0, 5).map((stat, index) => (
              <div key={stat.officerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-400 text-white' :
                    index === 1 ? 'bg-gray-300 text-gray-700' :
                    index === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{stat.officerName}</p>
                    <p className="text-xs text-gray-500">{stat.feedbackCount} reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(Math.round(stat.avgRating))}
                  </div>
                  <span className="font-bold text-lg text-gray-900">{stat.avgRating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">All Feedback ({feedbacks.length})</h2>
            <select
              value={selectedOfficer}
              onChange={(e) => setSelectedOfficer(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Officers</option>
              {officers.map(officer => (
                <option key={officer.userId} value={officer.userId}>
                  {officer.fullName || officer.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        {feedbacks.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No feedback found</p>
            <p className="text-gray-500 text-sm mt-2">Feedback will appear here once submitted</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {feedbacks.map((feedback) => {
              const officer = officers.find(o => o.userId === feedback.officerId);
              return (
                <div key={feedback.feedbackId} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {officer?.fullName || 'Unknown Officer'}
                        </p>
                        <p className="text-sm text-gray-500">
                          by User {feedback.userId?.substring(0, 8)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStars(feedback.rating)}
                      <p className="text-xs text-gray-500 mt-1">{formatDate(feedback.createdAt)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
                  {feedback.reportId && (
                    <p className="text-xs text-gray-500 mt-2">Related to Report: {feedback.reportId}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackManagementAPI;
