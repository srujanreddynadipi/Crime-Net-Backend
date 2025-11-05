import React from 'react';
import { FileText, Activity, CheckCircle, Clock } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    { label: 'Total Cases', value: '127', change: '+12%', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Cases', value: '43', change: '+5%', icon: Activity, color: 'from-purple-500 to-purple-600' },
    { label: 'Resolved Today', value: '18', change: '+23%', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Response Time', value: '8m', change: '-15%', icon: Clock, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
