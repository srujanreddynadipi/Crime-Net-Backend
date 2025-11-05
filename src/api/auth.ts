import apiClient from './client';

export interface RegisterRequest {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  role?: string;
}

export interface VerifyResponse {
  uid: string;
  email: string;
  role: string;
}

// Register user in backend (call after Firebase signup)
export const registerUser = async (data: RegisterRequest) => {
  const response = await apiClient.post('/api/auth/register', data);
  return response.data;
};

// Verify token and get user role
export const verifyToken = async () => {
  const response = await apiClient.post<VerifyResponse>('/api/auth/verify');
  return response.data;
};
