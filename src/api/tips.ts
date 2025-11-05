import apiClient from './client';

export interface AnonymousTip {
  tipId: string;
  title: string;
  description: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  trackingCode: string;
  pinCode?: string;
  status: string;
  mediaUrl?: string;
  lastUpdatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTipRequest {
  title: string;
  description: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
}

// Submit anonymous tip (public - no auth required)
export const submitTip = async (data: CreateTipRequest) => {
  const response = await apiClient.post<AnonymousTip>('/api/tips', data);
  return response.data;
};

// Track tip by code (public - no auth required)
export const trackTip = async (trackingCode: string) => {
  const response = await apiClient.get<AnonymousTip>(`/api/tips/track/${trackingCode}`);
  return response.data;
};

// Get all tips (police/admin only)
export const getAllTips = async () => {
  const response = await apiClient.get<AnonymousTip[]>('/api/tips');
  return response.data;
};
