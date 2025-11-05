import apiClient from './client';

export interface Feedback {
  feedbackId: string;
  userId: string;
  officerId: string;
  reportId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface SubmitFeedbackRequest {
  userId: string;
  officerId: string;
  reportId?: string;
  rating: number;
  comment?: string;
}

export interface OfficerRating {
  averageRating: number;
}

// Submit feedback
export const submitFeedback = async (data: SubmitFeedbackRequest) => {
  const response = await apiClient.post<Feedback>('/api/feedback', data);
  return response.data;
};

// Get feedback by officer
export const getFeedbacksByOfficer = async (officerId: string) => {
  const response = await apiClient.get<Feedback[]>(`/api/feedback/officer/${officerId}`);
  return response.data;
};

// Get officer average rating
export const getOfficerRating = async (officerId: string) => {
  const response = await apiClient.get<OfficerRating>(`/api/feedback/officer/${officerId}/rating`);
  return response.data;
};

// Get feedback by user
export const getFeedbacksByUser = async (userId: string) => {
  const response = await apiClient.get<Feedback[]>(`/api/feedback/user/${userId}`);
  return response.data;
};

// Get current user's feedback
export const getUserFeedback = async () => {
  const response = await apiClient.get<any[]>('/api/feedback/my-feedback');
  return response.data;
};

// Get feedback by report
export const getFeedbacksByReport = async (reportId: string) => {
  const response = await apiClient.get<Feedback[]>(`/api/feedback/report/${reportId}`);
  return response.data;
};

// Get all feedback (admin)
export const getAllFeedback = async () => {
  const response = await apiClient.get<Feedback[]>('/api/feedback');
  return response.data;
};
