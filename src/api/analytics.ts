import apiClient from './client';

export interface Statistics {
  totalReports: number;
  reportsByStatus: { [key: string]: number };
  totalUsers: number;
  usersByRole: { [key: string]: number };
  totalTips: number;
  activeSOS: number;
}

export interface CategoryData {
  category: string;
  count: number;
}

// Get statistics
export const getStatistics = async () => {
  const response = await apiClient.get<Statistics>('/api/analytics/statistics');
  return response.data;
};

// Get reports by category
export const getReportsByCategory = async () => {
  const response = await apiClient.get<CategoryData[]>('/api/analytics/reports/by-category');
  return response.data;
};

// Get report trends
export const getReportTrends = async () => {
  const response = await apiClient.get('/api/analytics/trends');
  return response.data;
};

// Get crime stats with time range
export const getCrimeStats = async (days: string = '30') => {
  const response = await apiClient.get(`/api/analytics/crime-stats?days=${days}`);
  return response.data;
};

// Get crimes by category
export const getCrimesByCategory = async (days: string = '30') => {
  const response = await apiClient.get<CategoryData[]>(`/api/analytics/crimes-by-category?days=${days}`);
  return response.data;
};

// Get crimes by status
export const getCrimesByStatus = async (days: string = '30') => {
  const response = await apiClient.get(`/api/analytics/crimes-by-status?days=${days}`);
  return response.data;
};

// Get crime trends
export const getCrimeTrends = async (days: string = '30') => {
  const response = await apiClient.get(`/api/analytics/crime-trends?days=${days}`);
  return response.data;
};

// Get user personal stats
export const getUserStats = async () => {
  const response = await apiClient.get('/api/analytics/user-stats');
  return response.data;
};
