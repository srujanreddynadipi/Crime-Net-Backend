import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Star, CheckCircle, Clock, Loader, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { submitFeedback, getUserFeedback } from '../../api/feedback';
import OfficerRating from './OfficerRating';

const FeedbackSystem = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    category: 'GENERAL',
    subject: '',
    message: '',
    rating: 0
  });

  const categories = [
    { value: 'GENERAL', label: 'General Feedback', icon: '💬' },
    { value: 'APP_BUG', label: 'App Issue/Bug', icon: '🐛' },
    { value: 'FEATURE_REQUEST', label: 'Feature Request', icon: '💡' },
    { value: 'OFFICER_FEEDBACK', label: 'Officer Feedback', icon: '👮' },
    { value: 'COMPLAINT', label: 'Complaint', icon: '⚠️' },
    { value: 'SUGGESTION', label: 'Suggestion', icon: '🌟' }
  ];

  useEffect(() => {
    loadFeedbackHistory();
  }, []);

  const loadFeedbackHistory = async () => {
    setLoading(true);
    try {
      const feedback = await getUserFeedback();
      setFeedbackHistory(feedback);
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await submitFeedback(formData);
      setSuccess(true);
      setFormData({
        category: 'GENERAL',
        subject: '',
        message: '',
        rating: 0
      });
      loadFeedbackHistory();
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingSubmit = async (ratingData) => {
    try {
      await submitFeedback({
        category: 'OFFICER_FEEDBACK',
        subject: `Rating for Case ${ratingData.caseId}`,
        message: ratingData.comment || 'No comment provided',
        rating: ratingData.rating,
        caseId: ratingData.caseId,
        officerId: ratingData.officerId
      });
      loadFeedbackHistory();
    } catch (error) {
      throw error;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWED':
        return 'bg-blue-100 text-blue-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Feedback & Ratings</h1>
              <p className="text-gray-600">Help us improve our service</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Submit Feedback</h2>
              
              {success && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-green-800 font-semibold">Thank you!</p>
                    <p className="text-green-700 text-sm">Your feedback has been submitted successfully.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Feedback Category *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        className={`p-4 border-2 rounded-xl transition-all text-left ${
                          formData.category === cat.value
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{cat.icon}</span>
                        <span className="text-sm font-medium text-gray-800">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief summary of your feedback"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide detailed feedback..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    required
                  />
                </div>

                {/* Overall Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Overall Experience (Optional)
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    {formData.rating > 0 && (
                      <span className="ml-3 text-sm text-gray-600">
                        {formData.rating} / 5
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Rate Officer */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <Star className="w-10 h-10 mb-3" />
              <h3 className="text-lg font-bold mb-2">Rate an Officer</h3>
              <p className="text-blue-100 text-sm mb-4">
                Help us recognize outstanding service by rating your assigned officer
              </p>
              <button
                onClick={() => setShowRatingModal(true)}
                className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Rate Officer
              </button>
            </div>

            {/* Feedback Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Feedback Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Submitted</span>
                  <span className="font-bold text-gray-800">{feedbackHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reviewed</span>
                  <span className="font-bold text-blue-600">
                    {feedbackHistory.filter(f => f.status === 'REVIEWED').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Resolved</span>
                  <span className="font-bold text-green-600">
                    {feedbackHistory.filter(f => f.status === 'RESOLVED').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Need Immediate Help?</h3>
              <p className="text-gray-600 text-sm mb-3">
                For urgent issues, please contact us directly
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">📞 Helpline: 1800-XXX-XXXX</p>
                <p className="text-gray-700">✉️ Email: support@crimenet.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback History */}
        {feedbackHistory.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Feedback History</h2>
            <div className="space-y-3">
              {feedbackHistory.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.subject}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{item.message}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    {item.rating && item.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Officer Rating Modal */}
        {showRatingModal && (
          <OfficerRating
            caseId="DEMO-001"
            officerId="officer-123"
            officerName="Officer John Doe"
            onClose={() => setShowRatingModal(false)}
            onSubmit={handleRatingSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default FeedbackSystem;
