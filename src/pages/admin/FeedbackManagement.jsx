import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const FeedbackManagement = () => {
  // Mock data - will be replaced with API calls
  const feedbacks = [
    { id: 1, officer: 'Jane Smith', rating: 5, comment: 'Very helpful and professional', citizen: 'John Doe', date: '2025-11-05' },
    { id: 2, officer: 'Alice Brown', rating: 4, comment: 'Quick response time', citizen: 'Bob Johnson', date: '2025-11-04' },
    { id: 3, officer: 'Jane Smith', rating: 5, comment: 'Excellent service', citizen: 'Mary Wilson', date: '2025-11-03' },
  ];

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

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Feedback Management</h2>
          <MessageSquare className="w-6 h-6 text-blue-500" />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Officer: {feedback.officer}</h3>
                  <p className="text-sm text-gray-500">From: {feedback.citizen}</p>
                </div>
                <div className="text-right">
                  {renderStars(feedback.rating)}
                  <p className="text-xs text-gray-500 mt-1">{feedback.date}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">"{feedback.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
