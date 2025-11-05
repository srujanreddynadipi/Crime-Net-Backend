import apiClient from './client';

export interface Notification {
  notificationId: string;
  userId: string;
  message: string;
  type: string;
  priority?: string;
  targetUrl?: string;
  deliveryStatus?: string;
  userDeviceId?: string;
  isRead: boolean;
  expiresAt?: string;
  createdAt: string;
}

// Get user notifications
export const getUserNotifications = async () => {
  const response = await apiClient.get<Notification[]>('/api/notifications');
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  const response = await apiClient.put<Notification>(
    `/api/notifications/${notificationId}/read`
  );
  return response.data;
};
