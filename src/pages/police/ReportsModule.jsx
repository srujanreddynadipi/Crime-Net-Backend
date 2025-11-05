import React from 'react';
import { Download, Calendar, BarChart3, Award, CheckCircle, Lock, Star } from 'lucide-react';

const ReportsModule = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Generate Reports</h3>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export All</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Daily Crime Report', desc: 'Summary of all incidents today', icon: Calendar },
          { title: 'Monthly Analytics', desc: 'Comprehensive monthly statistics', icon: BarChart3 },
          { title: 'Performance Report', desc: 'Officer and team performance', icon: Award },
          { title: 'Case Resolution', desc: 'Resolved cases breakdown', icon: CheckCircle },
          { title: 'Evidence Inventory', desc: 'Complete evidence catalog', icon: Lock },
          { title: 'Community Feedback', desc: 'Citizen ratings and reviews', icon: Star },
        ].map((report, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <report.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">{report.title}</h4>
            <p className="text-gray-400 text-sm mb-4">{report.desc}</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsModule;
