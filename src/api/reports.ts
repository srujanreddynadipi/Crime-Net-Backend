import apiClient from './client';

export interface CrimeReport {
  reportId: string;
  userId: string;
  assignedOfficerId?: string;
  stationId?: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  severity?: string; // Added severity field (LOW, MEDIUM, HIGH, CRITICAL)
  location: string;
  latitude?: number;
  longitude?: number;
  incidentAt?: string;
  caseNumber: string;
  isAnonymous: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportRequest {
  title: string;
  description: string;
  category: string;
  priority: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  incidentAt?: string | null;
  isAnonymous?: boolean;
}

export interface ReportTimeline {
  timelineId: string;
  statusFrom: string;
  statusTo: string;
  note?: string;
  actorUserId: string;
  createdAt: string;
}

// Create report
export const createReport = async (data: CreateReportRequest) => {
  const response = await apiClient.post<CrimeReport>('/api/reports', data);
  return response.data;
};

// Get all reports (admin/police)
export const getAllReports = async () => {
  const response = await apiClient.get<CrimeReport[]>('/api/reports');
  return response.data;
};

// Get report by ID
export const getReportById = async (id: string) => {
  const response = await apiClient.get<CrimeReport>(`/api/reports/${id}`);
  return response.data;
};

// Get reports by user
export const getReportsByUser = async (userId: string) => {
  const response = await apiClient.get<CrimeReport[]>(`/api/reports/user/${userId}`);
  return response.data;
};

// Get reports by status
export const getReportsByStatus = async (status: string) => {
  const response = await apiClient.get<CrimeReport[]>(`/api/reports/status/${status}`);
  return response.data;
};

// Assign officer to report
export const assignOfficer = async (reportId: string, officerId: string) => {
  const response = await apiClient.put<CrimeReport>(
    `/api/reports/${reportId}/assign`,
    { officerId }
  );
  return response.data;
};

// Update report status
export const updateReportStatus = async (reportId: string, status: string, note?: string) => {
  const response = await apiClient.put<CrimeReport>(
    `/api/reports/${reportId}/status`,
    { status, note }
  );
  return response.data;
};

// Get report timeline
export const getReportTimeline = async (reportId: string) => {
  const response = await apiClient.get<ReportTimeline[]>(`/api/reports/${reportId}/timeline`);
  return response.data;
};
