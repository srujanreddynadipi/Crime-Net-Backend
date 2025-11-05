import React, { useState } from 'react';
import { Send, MapPin, Eye, EyeOff, Info, CheckCircle } from 'lucide-react';
import { submitTip } from '../../api/tips';

const AnonymousTips = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    latitude: null,
    longitude: null,
  });

  const tipCategories = [
    'THEFT',
    'ASSAULT',
    'ROBBERY',
    'BURGLARY',
    'VANDALISM',
    'FRAUD',
    'CYBERCRIME',
    'HARASSMENT',
    'DRUG_RELATED',
    'TRAFFIC_VIOLATION',
    'SUSPICIOUS_ACTIVITY',
    'OTHER'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess(false);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
        }));
        setLoading(false);
      },
      (err) => {
        setError('Unable to get your location. Please enter manually.');
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Please provide a title for your tip');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please provide a description');
      return;
    }
    if (!formData.location.trim()) {
      setError('Please provide a location');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const tipData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        category: formData.category || 'OTHER',
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      const response = await submitTip(tipData);
      
      setSuccess(true);
      setTrackingCode(response.trackingCode);
      
      // Don't reset form immediately so user can see the tracking code
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit tip. Please try again.');
      console.error('Error submitting tip:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTip = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      category: '',
      latitude: null,
      longitude: null,
    });
    setSuccess(false);
    setTrackingCode('');
    setError('');
  };

  const copyTrackingCode = () => {
    navigator.clipboard.writeText(trackingCode);
    alert('Tracking code copied to clipboard!');
  };

  if (success && trackingCode) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tip Submitted Successfully!</h2>
            <p className="text-gray-600">Your anonymous tip has been received by law enforcement.</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>Save Your Tracking Code</span>
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Use this code to check the status of your tip. Keep it safe - you won't be able to retrieve it later.
            </p>
            <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
              <div className="flex items-center justify-between">
                <code className="text-2xl font-mono font-bold text-blue-700">
                  {trackingCode}
                </code>
                <button
                  onClick={copyTrackingCode}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleNewTip}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Submit Another Tip
            </button>
            <button
              onClick={() => window.location.href = '/track-tip'}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Track This Tip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Submit Anonymous Tip</h2>
          <p className="text-gray-600">
            Help make your community safer by reporting suspicious activity. Your identity will remain completely anonymous.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <EyeOff className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Your Privacy is Protected</h3>
              <p className="text-gray-700 text-sm">
                No login required. We don't collect any personal information. You'll receive a tracking code to check the status of your tip.
              </p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Tip Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of the tip"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
              required
            >
              <option value="">Select a category</option>
              {tipCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Provide as much detail as possible about what you observed..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 resize-none"
              required
            />
            <p className="text-gray-500 text-sm mt-1">
              Include details like date, time, description of people or vehicles, etc.
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where did this occur?"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
                required
              />
              <button
                type="button"
                onClick={useCurrentLocation}
                className="bg-gradient-to-r from-green-200 to-teal-300 text-gray-900 px-6 py-3 rounded-xl font-bold hover:shadow flex items-center space-x-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Use GPS</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Anonymous Tip</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-2 flex items-center space-x-2">
            <Info className="w-5 h-5 text-blue-600" />
            <span>What Happens Next?</span>
          </h4>
          <ul className="text-gray-600 text-sm space-y-1 ml-7">
            <li>• Your tip will be reviewed by law enforcement</li>
            <li>• You'll receive a tracking code to monitor the status</li>
            <li>• No action is required from you unless you choose to follow up</li>
            <li>• Your identity remains completely anonymous</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnonymousTips;
