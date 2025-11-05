import React, { useState } from 'react';
import { Camera, Video, Mic, MapPin, Send, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createReport } from '../../api/reports';

const ReportCrime = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    latitude: null,
    longitude: null,
    incidentAt: '',
    priority: 'MEDIUM',
    isAnonymous: false,
  });
  
  const crimeCategories = [
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
    'MISSING_PERSON',
    'OTHER'
  ];
  
  const priorityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.title || !formData.category || !formData.description || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      const reportData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        incidentAt: formData.incidentAt || null,
        isAnonymous: formData.isAnonymous,
      };
      
      const response = await createReport(reportData);
      
      setSuccess(`Report submitted successfully! Your case number is: ${response.caseNumber}`);
      
      // Reset form
      setFormData({
        title: '',
        category: '',
        description: '',
        location: '',
        latitude: null,
        longitude: null,
        incidentAt: '',
        priority: 'MEDIUM',
        isAnonymous: false,
      });
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (err) {
      console.error('Error submitting report:', err);
      setError(err.response?.data?.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
            latitude: latitude,
            longitude: longitude
          }));
        },
        (error) => {
          setError('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Alert Messages */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}
      
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Report a Crime</h3>
        <p className="text-gray-600 mb-6">Please provide detailed information to help us investigate</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Report Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Brief title of the incident"
              required
            />
          </div>
          
          {/* Category and Severity */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Crime Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                <option value="">Select category</option>
                {crimeCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                {priorityLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 h-32 resize-none"
              placeholder="Describe the incident in detail (What happened? When? Who was involved?)"
              required
            ></textarea>
          </div>
          
          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-12 pr-32 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Enter location or coordinates"
                required
              />
              <button
                type="button"
                onClick={useCurrentLocation}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 font-medium text-sm hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-lg"
              >
                Use GPS
              </button>
            </div>
          </div>
          
          {/* Date and Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date and Time of Incident
            </label>
            <input
              type="datetime-local"
              name="incidentAt"
              value={formData.incidentAt}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          
          {/* File Uploads (Placeholder) */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Evidence Photos</label>
              <button
                type="button"
                className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all"
              >
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Add Photos</p>
              </button>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Evidence Videos</label>
              <button
                type="button"
                className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all"
              >
                <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Add Videos</p>
              </button>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Voice Notes</label>
              <button
                type="button"
                className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all"
              >
                <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Record</p>
              </button>
            </div>
          </div>
          
          {/* Anonymous Option */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <p className="text-gray-800 font-medium">Report Anonymously</p>
                <p className="text-gray-600 text-sm">Your identity will be protected</p>
              </div>
            </label>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
            <button
              type="button"
              onClick={() => setFormData({
                title: '',
                category: '',
                description: '',
                location: '',
                latitude: null,
                longitude: null,
                incidentAt: '',
                priority: 'MEDIUM',
                isAnonymous: false,
              })}
              disabled={loading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCrime;
