import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Loader
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getCrimeStats, 
  getCrimesByCategory, 
  getCrimesByStatus, 
  getCrimeTrends, 
  getUserStats 
} from '../../api/analytics';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [userStatsData, setUserStatsData] = useState(null);
  const [timeRange, setTimeRange] = useState('30'); // days

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Load all analytics data in parallel
      const [statsRes, categoryRes, statusRes, trendsRes, userRes] = await Promise.all([
        getCrimeStats(timeRange),
        getCrimesByCategory(timeRange),
        getCrimesByStatus(timeRange),
        getCrimeTrends(timeRange),
        getUserStats()
      ]);

      setStats(statsRes);
      setCategoryData(categoryRes);
      setStatusData(statusRes);
      setTrendsData(trendsRes);
      setUserStatsData(userRes);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
  const STATUS_COLORS = {
    PENDING: '#F59E0B',
    IN_PROGRESS: '#3B82F6',
    INVESTIGATING: '#8B5CF6',
    RESOLVED: '#10B981',
    CLOSED: '#6B7280'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Crime Analytics</h1>
                <p className="text-gray-600">Data insights and trends</p>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              {['7', '30', '90', '365'].map((days) => (
                <button
                  key={days}
                  onClick={() => setTimeRange(days)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    timeRange === days
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white'
                  }`}
                >
                  {days === '365' ? '1 Year' : `${days} Days`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 font-medium">Total Reports</p>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.totalReports || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Last {timeRange} days</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 font-medium">Pending</p>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.pendingReports || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting action</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 font-medium">In Progress</p>
              <AlertCircle className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.inProgressReports || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Being investigated</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 font-medium">Resolved</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.resolvedReports || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Successfully closed</p>
          </div>
        </div>

        {/* User Personal Stats */}
        {userStatsData && (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 mb-6 text-white">
            <h2 className="text-xl font-bold mb-4">Your Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-blue-100 text-sm mb-1">My Reports</p>
                <p className="text-3xl font-bold">{userStatsData.totalReports || 0}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Active Cases</p>
                <p className="text-3xl font-bold">{userStatsData.activeCases || 0}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Resolved</p>
                <p className="text-3xl font-bold">{userStatsData.resolvedCases || 0}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Tips Submitted</p>
                <p className="text-3xl font-bold">{userStatsData.tipsSubmitted || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Crime Trends Line Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Crime Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Crime by Status Pie Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reports by Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crime by Category Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Reports by Category</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" stroke="#6B7280" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Pending</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">In Progress</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Resolved</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Resolution Rate</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((item, index) => {
                  const total = item.count || 0;
                  const resolved = item.resolved || 0;
                  const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{item.category}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-800">{total}</td>
                      <td className="py-3 px-4 text-right text-yellow-600">{item.pending || 0}</td>
                      <td className="py-3 px-4 text-right text-blue-600">{item.inProgress || 0}</td>
                      <td className="py-3 px-4 text-right text-green-600">{resolved}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-semibold ${
                          resolutionRate >= 70 ? 'text-green-600' :
                          resolutionRate >= 40 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {resolutionRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
