import apiClient from './client';

export interface User {
  uid: string;
  username?: string;
  fullName: string;
  email: string;
  emailVerified?: boolean;
  phone: string;
  role: string;
  address: string;
  languagePreference?: string;
  status?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  phone?: string;
  address?: string;
  languagePreference?: string;
}

// Get user by ID
export const getUserById = async (uid: string) => {
  const response = await apiClient.get<User>(`/api/users/${uid}`);
  return response.data;
};

// Update user
export const updateUser = async (uid: string, data: UpdateUserRequest) => {
  const response = await apiClient.put<User>(`/api/users/${uid}`, data);
  return response.data;
};

// Delete user (admin only)
export const deleteUser = async (uid: string) => {
  await apiClient.delete(`/api/users/${uid}`);
};

// Get users by role (admin/police)
export const getUsersByRole = async (role: string) => {
  const response = await apiClient.get<User[]>(`/api/users/role/${role}`);
  return response.data;
};
