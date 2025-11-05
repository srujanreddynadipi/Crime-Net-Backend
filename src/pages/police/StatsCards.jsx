import React, { useState, useEffect } from 'react';
import { FileText, Activity, CheckCircle, Clock } from 'lucide-react';
import { getAllReports } from '../../api/reports';
import { getAllActiveAlerts } from '../../api/sos';

const StatsCards = () => {
  const [stats, setStats] = useState([
    { label: 'Total Cases', value: '0', change: '+0%', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Cases', value: '0', change: '+0%', icon: Activity, color: 'from-purple-500 to-purple-600' },
    { label: 'Resolved Today', value: '0', change: '+0%', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Response Time', value: '0m', change: '0%', icon: Clock, color: 'from-orange-500 to-orange-600' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [reports, sosAlerts] = await Promise.all([
        getAllReports(),
        getAllActiveAlerts()
      ]);

      // Calculate stats
      const total = reports.length;
      const active = reports.filter(r => r.status === 'UNDER_INVESTIGATION').length;
      
      // Resolved today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const resolvedToday = reports.filter(r => {
        if (r.status !== 'RESOLVED' && r.status !== 'CLOSED') return false;
        const updatedDate = r.updatedAt?._seconds 
          ? new Date(r.updatedAt._seconds * 1000)
          : new Date(r.updatedAt);
        updatedDate.setHours(0, 0, 0, 0);
        return updatedDate.getTime() === today.getTime();
      }).length;

      // Calculate average response time (in minutes)
      const responseTimes = reports
        .filter(r => r.createdAt && r.updatedAt)
        .map(r => {
          const created = r.createdAt._seconds ? r.createdAt._seconds * 1000 : new Date(r.createdAt).getTime();
          const updated = r.updatedAt._seconds ? r.updatedAt._seconds * 1000 : new Date(r.updatedAt).getTime();
          return (updated - created) / (1000 * 60); // minutes
        });
      
      const avgResponseTime = responseTimes.length > 0
        ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
        : 0;

      setStats([
        { 
          label: 'Total Cases', 
          value: total.toString(), 
          change: '+12%', 
          icon: FileText, 
          color: 'from-blue-500 to-blue-600' 
        },
        { 
          label: 'Active Cases', 
          value: active.toString(), 
          change: '+5%', 
          icon: Activity, 
          color: 'from-purple-500 to-purple-600' 
        },
        { 
          label: 'Resolved Today', 
          value: resolvedToday.toString(), 
          change: '+23%', 
          icon: CheckCircle, 
          color: 'from-green-500 to-green-600' 
        },
        { 
          label: 'Response Time', 
          value: `${avgResponseTime}m`, 
          change: '-15%', 
          icon: Clock, 
          color: 'from-orange-500 to-orange-600' 
        },
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl animate-pulse">
            <div className="h-12 w-12 bg-gray-700 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
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
