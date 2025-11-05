import apiClient from './client';

export interface Conversation {
  conversationId: string;
  createdBy: string;
  isGroup: boolean;
  reportId?: string;
  participants: string[];
  lastMessageAt?: string;
  createdAt: string;
}

export interface ChatMessage {
  messageId: string;
  conversationId: string;
  senderId: string;
  content: string;
  mediaUrl?: string;
  type: string;
  deliveredAt?: string;
  readAt?: string;
  replyToMessageId?: string;
  isDeleted?: boolean;
  createdAt: string;
}

export interface CreateConversationRequest {
  participants: string[];
  reportId?: string;
}

export interface SendMessageRequest {
  content: string;
  mediaUrl?: string;
  type?: string;
}

// Create conversation
export const createConversation = async (data: CreateConversationRequest) => {
  const response = await apiClient.post<Conversation>('/api/chat/conversations', data);
  return response.data;
};

// Get conversation by ID
export const getConversationById = async (conversationId: string) => {
  const response = await apiClient.get<Conversation>(`/api/chat/conversations/${conversationId}`);
  return response.data;
};

// Get user conversations
export const getUserConversations = async () => {
  const response = await apiClient.get<Conversation[]>('/api/chat/conversations');
  return response.data;
};

// Get conversation messages
export const getConversationMessages = async (conversationId: string) => {
  const response = await apiClient.get<ChatMessage[]>(
    `/api/chat/conversations/${conversationId}/messages`
  );
  return response.data;
};

// Send message
export const sendMessage = async (conversationId: string, data: SendMessageRequest) => {
  const response = await apiClient.post<ChatMessage>(
    `/api/chat/conversations/${conversationId}/messages`,
    data
  );
  return response.data;
};

// Mark message as read
export const markMessageAsRead = async (conversationId: string, messageId: string) => {
  await apiClient.put(
    `/api/chat/conversations/${conversationId}/messages/${messageId}/read`
  );
};
