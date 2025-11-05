import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Users, FileText, AlertTriangle } from 'lucide-react';
import { getStatistics, getReportsByCategory, getReportTrends } from '../../api/analytics';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SystemAnalyticsAPI = () => {
  const [statistics, setStatistics] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [stats, categories, trendsData] = await Promise.all([
        getStatistics(),
        getReportsByCategory(),
        getReportTrends()
      ]);
      
      setStatistics(stats);
      
      // Transform category data for charts
      const categoryArray = Object.entries(categories).map(([name, count]) => ({
        name,
        value: count
      }));
      setCategoryData(categoryArray);
      
      // Transform trends data
      setTrends(trendsData || []);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const statusData = statistics ? [
    { name: 'Submitted', value: statistics.reportsByStatus?.SUBMITTED || 0, color: '#3B82F6' },
    { name: 'Investigating', value: statistics.reportsByStatus?.UNDER_INVESTIGATION || 0, color: '#F59E0B' },
    { name: 'Resolved', value: statistics.reportsByStatus?.RESOLVED || 0, color: '#10B981' },
    { name: 'Closed', value: statistics.reportsByStatus?.CLOSED || 0, color: '#6B7280' },
  ] : [];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">System Analytics</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm font-semibold">+12%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Reports</p>
          <p className="text-2xl font-bold text-gray-900">{statistics?.totalReports || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-500 text-sm font-semibold">+8%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{statistics?.totalUsers || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-yellow-500 text-sm font-semibold">Active</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Anonymous Tips</p>
          <p className="text-2xl font-bold text-gray-900">{statistics?.totalTips || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm font-semibold">78%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Resolution Rate</p>
          <p className="text-2xl font-bold text-gray-900">
            {statistics?.totalReports > 0 
              ? ((statistics.reportsByStatus?.RESOLVED / statistics.totalReports) * 100).toFixed(1)
              : 0}%
          </p>
        </div>
      </div>

      {/* User Distribution */}
      {statistics?.usersByRole && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Distribution by Role
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Citizens</p>
              <p className="text-3xl font-bold text-green-600">{statistics.usersByRole.CITIZEN || 0}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Police Officers</p>
              <p className="text-3xl font-bold text-blue-600">{statistics.usersByRole.POLICE || 0}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Administrators</p>
              <p className="text-3xl font-bold text-purple-600">{statistics.usersByRole.ADMIN || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reports by Category */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Reports by Category
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No category data available
            </div>
          )}
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Report Status Distribution
          </h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No status data available
            </div>
          )}
        </div>
      </div>

      {/* Trends Chart */}
      {trends.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Reports Trend Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="Reports" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Daily Reports</p>
              <p className="text-2xl font-bold text-gray-900">
                {statistics?.totalReports ? Math.round(statistics.totalReports / 30) : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900">+12%</p>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-green-600">Excellent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalyticsAPI;
