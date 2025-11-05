import React, { useState, useEffect } from 'react';
import { getAllReports } from '../../api/reports';
import { getAllActiveAlerts } from '../../api/sos';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, FileText, AlertCircle, CheckCircle, Clock, MapPin, Activity } from 'lucide-react';

const AnalyticsDashboardAPI = () => {
  const [reports, setReports] = useState([]);
  const [sosAlerts, setSosAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setError('');
      setLoading(true);
      
      const [reportsData, alertsData] = await Promise.all([
        getAllReports(),
        getAllActiveAlerts()
      ]);
      
      setReports(reportsData || []);
      setSosAlerts(alertsData || []);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: reports.length,
    active: reports.filter(r => r.status === 'UNDER_INVESTIGATION').length,
    resolved: reports.filter(r => r.status === 'RESOLVED').length,
    pending: reports.filter(r => r.status === 'SUBMITTED').length,
    avgResponseTime: calculateAvgResponseTime(reports),
    resolutionRate: reports.length > 0 ? ((reports.filter(r => r.status === 'RESOLVED').length / reports.length) * 100).toFixed(1) : 0,
  };

  function calculateAvgResponseTime(reports) {
    const times = reports
      .filter(r => r.createdAt && r.updatedAt)
      .map(r => {
        const created = r.createdAt._seconds ? r.createdAt._seconds * 1000 : new Date(r.createdAt).getTime();
        const updated = r.updatedAt._seconds ? r.updatedAt._seconds * 1000 : new Date(r.updatedAt).getTime();
        return (updated - created) / (1000 * 60 * 60); // hours
      });
    
    if (times.length === 0) return 0;
    return (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1);
  }

  // Category distribution
  const categoryData = Object.entries(
    reports.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Status distribution
  const statusData = [
    { name: 'Submitted', value: stats.pending, color: '#3B82F6' },
    { name: 'Investigating', value: stats.active, color: '#F59E0B' },
    { name: 'Resolved', value: stats.resolved, color: '#10B981' },
    { name: 'Closed', value: reports.filter(r => r.status === 'CLOSED').length, color: '#6B7280' },
  ];

  // Priority distribution
  const priorityData = [
    { name: 'Critical', value: reports.filter(r => r.priority === 'CRITICAL').length, color: '#DC2626' },
    { name: 'High', value: reports.filter(r => r.priority === 'HIGH').length, color: '#F97316' },
    { name: 'Medium', value: reports.filter(r => r.priority === 'MEDIUM').length, color: '#FBBF24' },
    { name: 'Low', value: reports.filter(r => r.priority === 'LOW').length, color: '#3B82F6' },
  ];

  // Daily reports trend (last 7 days)
  const getDailyTrend = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayReports = reports.filter(r => {
        const reportDate = r.createdAt._seconds 
          ? new Date(r.createdAt._seconds * 1000).toISOString().split('T')[0]
          : new Date(r.createdAt).toISOString().split('T')[0];
        return reportDate === dateStr;
      });
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reports: dayReports.length,
        resolved: dayReports.filter(r => r.status === 'RESOLVED').length,
      });
    }
    return last7Days;
  };

  const trendData = getDailyTrend();

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <p className="text-sm text-slate-600">{title}</p>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
          </div>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
          )}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-semibold">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h2>
          <p className="text-slate-600 mt-1">Crime statistics and performance metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          title="Total Reports"
          value={stats.total}
          subtitle="All time cases"
          trend={12}
          color="#6366F1"
        />
        <StatCard
          icon={Activity}
          title="Active Cases"
          value={stats.active}
          subtitle="Under investigation"
          color="#F59E0B"
        />
        <StatCard
          icon={CheckCircle}
          title="Resolved Cases"
          value={stats.resolved}
          subtitle={`${stats.resolutionRate}% success rate`}
          trend={8}
          color="#10B981"
        />
        <StatCard
          icon={Clock}
          title="Avg Response Time"
          value={`${stats.avgResponseTime}h`}
          subtitle="Time to first action"
          trend={-5}
          color="#8B5CF6"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Reports Trend (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reports" stroke="#6366F1" strokeWidth={2} name="Total Reports" />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Case Status Distribution</h3>
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
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Reports by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Priority Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Metrics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-slate-800">{stats.pending}</p>
            <p className="text-sm text-slate-600 mt-1">Awaiting Assignment</p>
          </div>
          
          <div className="text-center p-4 bg-linear-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-slate-800">{stats.resolutionRate}%</p>
            <p className="text-sm text-slate-600 mt-1">Resolution Rate</p>
          </div>
          
          <div className="text-center p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-lg">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-slate-800">{sosAlerts.length}</p>
            <p className="text-sm text-slate-600 mt-1">Active SOS Alerts</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Insights</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Most Common Category</p>
            <p className="text-lg font-bold text-slate-800">
              {categoryData.length > 0 ? categoryData.sort((a, b) => b.value - a.value)[0].name : 'N/A'}
            </p>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Critical Cases</p>
            <p className="text-lg font-bold text-red-600">
              {reports.filter(r => r.priority === 'CRITICAL' && r.status !== 'RESOLVED').length}
            </p>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Today's Reports</p>
            <p className="text-lg font-bold text-slate-800">
              {reports.filter(r => {
                const today = new Date().toISOString().split('T')[0];
                const reportDate = r.createdAt._seconds 
                  ? new Date(r.createdAt._seconds * 1000).toISOString().split('T')[0]
                  : new Date(r.createdAt).toISOString().split('T')[0];
                return reportDate === today;
              }).length}
            </p>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Closed This Week</p>
            <p className="text-lg font-bold text-green-600">
              {reports.filter(r => {
                if (r.status !== 'CLOSED' && r.status !== 'RESOLVED') return false;
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                const updatedDate = r.updatedAt._seconds 
                  ? new Date(r.updatedAt._seconds * 1000)
                  : new Date(r.updatedAt);
                return updatedDate >= weekAgo;
              }).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardAPI;
