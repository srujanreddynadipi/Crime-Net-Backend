import apiClient from './client';

export interface SOSAlert {
  sosId: string;
  userId: string;
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
  mediaStreamUrl?: string;
  triggeredAt: string;
  status: string;
  handledAt?: string;
  handledByOfficerId?: string;
  severity?: string;
  notes?: string;
  deviceInfoJson?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TriggerSOSRequest {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
  severity?: string;
}

// Trigger SOS alert
export const triggerSOS = async (data: TriggerSOSRequest) => {
  const response = await apiClient.post<SOSAlert>('/api/sos/trigger', data);
  return response.data;
};

// Get my active alerts
export const getMyActiveAlerts = async () => {
  const response = await apiClient.get<SOSAlert[]>('/api/sos/my-alerts');
  return response.data;
};

// Cancel SOS alert
export const cancelSOS = async (sosId: string) => {
  const response = await apiClient.put<SOSAlert>(`/api/sos/${sosId}/cancel`);
  return response.data;
};

// Get all active SOS alerts (police/admin only)
export const getAllActiveAlerts = async () => {
  const response = await apiClient.get<SOSAlert[]>('/api/sos/active');
  return response.data;
};

// Update SOS status (police/admin)
export const updateSOSStatus = async (sosId: string, status: string) => {
  const response = await apiClient.put<SOSAlert>(`/api/sos/${sosId}/status`, { status });
  return response.data;
};
