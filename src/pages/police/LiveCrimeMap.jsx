import React from 'react';
import { MapPin, RefreshCw } from 'lucide-react';

const LiveCrimeMap = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Live Crime Map</h3>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all border border-white/20">
            Filters
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl h-96 flex items-center justify-center border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-500 rounded-full filter blur-3xl animate-pulse" />
        </div>
        <div className="text-center z-10">
          <MapPin className="w-16 h-16 text-white mx-auto mb-4" />
          <p className="text-white text-xl font-bold mb-2">Interactive Crime Map</p>
          <p className="text-gray-300">Real-time crime locations with heat mapping</p>
          <div className="flex space-x-4 mt-6 justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <span className="text-white text-sm">Urgent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full" />
              <span className="text-white text-sm">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
              <span className="text-white text-sm">Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCrimeMap;
