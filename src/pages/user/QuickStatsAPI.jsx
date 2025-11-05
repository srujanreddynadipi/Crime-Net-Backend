import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, Award, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getReportsByUser } from '../../api/reports';

const QuickStatsAPI = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    activeCount: 0,
    resolvedCount: 0,
    totalCount: 0,
    pendingCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserStats();
    }
  }, [currentUser]);

  const loadUserStats = async () => {
    try {
      setLoading(true);
      const reports = await getReportsByUser(currentUser.uid);
      
      // Calculate statistics from reports
      const activeCount = reports.filter(r => 
        r.status === 'IN_PROGRESS' || r.status === 'PENDING'
      ).length;
      
      const resolvedCount = reports.filter(r => 
        r.status === 'RESOLVED'
      ).length;
      
      const pendingCount = reports.filter(r => 
        r.status === 'PENDING'
      ).length;

      setStats({
        activeCount,
        resolvedCount,
        totalCount: reports.length,
        pendingCount
      });
    } catch (err) {
      console.error('Failed to load user statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate community points (simple algorithm: resolved * 50 + active * 20)
  const communityPoints = (stats.resolvedCount * 50) + (stats.activeCount * 20);
  
  // Calculate safety score based on resolved vs total reports
  const safetyScore = stats.totalCount > 0 
    ? ((stats.resolvedCount / stats.totalCount) * 10).toFixed(1)
    : '10.0';

  const statsData = [
    { 
      label: 'Active Cases', 
      value: loading ? '...' : stats.activeCount.toString(), 
      icon: Activity, 
      gradient: 'from-blue-200 to-blue-300', 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'Resolved Cases', 
      value: loading ? '...' : stats.resolvedCount.toString(), 
      icon: CheckCircle, 
      gradient: 'from-green-200 to-green-300', 
      bg: 'bg-green-50' 
    },
    { 
      label: 'Community Points', 
      value: loading ? '...' : communityPoints.toString(), 
      icon: Award, 
      gradient: 'from-purple-200 to-purple-300', 
      bg: 'bg-purple-50' 
    },
    { 
      label: 'Safety Score', 
      value: loading ? '...' : `${safetyScore}/10`, 
      icon: Shield, 
      gradient: 'from-orange-200 to-orange-300', 
      bg: 'bg-orange-50' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, idx) => (
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

export default QuickStatsAPI;
