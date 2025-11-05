import React from 'react';
import { Activity, CheckCircle, Award, Shield } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    { label: 'Active Cases', value: '2', icon: Activity, gradient: 'from-blue-200 to-blue-300', bg: 'bg-blue-50' },
    { label: 'Resolved Cases', value: '5', icon: CheckCircle, gradient: 'from-green-200 to-green-300', bg: 'bg-green-50' },
    { label: 'Community Points', value: '245', icon: Award, gradient: 'from-purple-200 to-purple-300', bg: 'bg-purple-50' },
    { label: 'Safety Score', value: '8.5/10', icon: Shield, gradient: 'from-orange-200 to-orange-300', bg: 'bg-orange-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${stat.bg} rounded-2xl p-6 border border-gray-200/60 hover:shadow-md transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-gray-700" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
