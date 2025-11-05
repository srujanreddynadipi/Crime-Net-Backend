import React, { useState } from 'react';
import { MapPin, Camera, Video, Mic, Send } from 'lucide-react';

const ReportCrime = () => {
  const [formData, setFormData] = useState({ type: '', description: '', location: '', anonymous: false });
  const crimeTypes = ['Theft', 'Assault', 'Vehicle Theft', 'Cyber Crime', 'Harassment', 'Missing Person', 'Other'];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Report a Crime</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Crime Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
          >
            <option value="">Select crime type</option>
            {crimeTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 h-32 resize-none"
            placeholder="Describe the incident in detail..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
              placeholder="Enter location or use current location"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-medium text-sm hover:text-blue-700">Use GPS</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Photos</label>
            <button className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Add Photos</p>
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Videos</label>
            <button className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all">
              <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Add Videos</p>
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Voice Notes</label>
            <button className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all">
              <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Record</p>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
            />
            <div>
              <p className="text-gray-800 font-medium">Report Anonymously</p>
              <p className="text-gray-600 text-sm">Your identity will be protected</p>
            </div>
          </label>
        </div>

        <div className="flex space-x-4">
          <button className="flex-1 bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 py-4 rounded-xl font-bold hover:shadow flex items-center justify-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Submit Report</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold">Save Draft</button>
        </div>
      </div>
    </div>
  );
};

export default ReportCrime;
