import React from 'react';
import { Upload, Filter, Image, FileVideo, Mic, FileText, Camera, Lock, Download } from 'lucide-react';

const EvidenceVault = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Evidence Management System</h3>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Evidence</span>
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/20">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { type: 'Images', count: 234, icon: Image, color: 'from-blue-500 to-blue-600' },
          { type: 'Videos', count: 67, icon: FileVideo, color: 'from-purple-500 to-purple-600' },
          { type: 'Audio', count: 45, icon: Mic, color: 'from-green-500 to-green-600' },
          { type: 'Documents', count: 189, icon: FileText, color: 'from-orange-500 to-orange-600' },
        ].map((category, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4`}>
              <category.icon className="w-7 h-7 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">{category.type}</p>
            <p className="text-3xl font-bold text-white">{category.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Recent Evidence Uploads</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:border-blue-500 transition-all cursor-pointer">
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-32 flex items-center justify-center mb-3">
                <Camera className="w-12 h-12 text-white opacity-50" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-sm">Evidence_{item}.jpg</span>
                <Lock className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-gray-400 text-xs mb-2">Case: CR00{item}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-medium transition-all">
                  View
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvidenceVault;
