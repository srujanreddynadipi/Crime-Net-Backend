import React, { useEffect, useState } from 'react';
import { Users, ShieldCheck, FileText, CheckCircle, Clock, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { getStatistics } from '../../../api/analytics';

const StatsOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatsConfig = () => {
    if (!stats) return [];
    
    return [
      { 
        label: 'Total Users', 
        value: (stats.totalUsers || 0).toLocaleString(), 
        change: '+12.5%', 
        icon: Users, 
        gradient: 'from-blue-400 to-blue-600', 
        bg: 'bg-blue-50', 
        trend: 'up' 
      },
      { 
        label: 'Police Officers', 
        value: (stats.policeCount || 0).toLocaleString(), 
        change: '+3.2%', 
        icon: ShieldCheck, 
        gradient: 'from-purple-400 to-purple-600', 
        bg: 'bg-purple-50', 
        trend: 'up' 
      },
      { 
        label: 'Active Cases', 
        value: (stats.pendingReports || 0).toLocaleString(), 
        change: '-5.8%', 
        icon: FileText, 
        gradient: 'from-orange-400 to-orange-600', 
        bg: 'bg-orange-50', 
        trend: 'down' 
      },
      { 
        label: 'Resolved Today', 
        value: (stats.resolvedReports || 0).toLocaleString(), 
        change: '+18.3%', 
        icon: CheckCircle, 
        gradient: 'from-green-400 to-green-600', 
        bg: 'bg-green-50', 
        trend: 'up' 
      },
      { 
        label: 'Total Reports', 
        value: (stats.totalReports || 0).toLocaleString(), 
        change: '+8.1%', 
        icon: FileText, 
        gradient: 'from-pink-400 to-pink-600', 
        bg: 'bg-pink-50', 
        trend: 'up' 
      },
      { 
        label: 'System Health', 
        value: '99.9%', 
        change: '+0.2%', 
        icon: Star, 
        gradient: 'from-yellow-400 to-yellow-600', 
        bg: 'bg-yellow-50', 
        trend: 'up' 
      },
    ];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded-xl mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const statsConfig = getStatsConfig();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {statsConfig.map((stat, idx) => (
        <div key={idx} className={`${stat.bg} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-600" />
              )}
              <span className="text-green-600 text-sm font-bold">{stat.change}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
