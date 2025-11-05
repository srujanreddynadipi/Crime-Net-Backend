import React from 'react';
import { BarChart3, Users, AlertTriangle, ShieldCheck } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Active Reports',
      value: '89',
      change: '+5%',
      icon: AlertTriangle,
      color: 'red',
    },
    {
      title: 'Officers',
      value: '45',
      change: '+2%',
      icon: ShieldCheck,
      color: 'green',
    },
    {
      title: 'System Health',
      value: '98%',
      change: '+1%',
      icon: BarChart3,
      color: 'purple',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
