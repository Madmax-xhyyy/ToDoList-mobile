import { apiClient } from '../lib/client';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  results?: number;
  data: T; 
}

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await apiClient.get<ApiResponse<Todo[]>>('/api/todos');
    return data.data; 
  },

  getById: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.get<ApiResponse<Todo>>(`/api/todos/${id}`);
    return data.data;
  },

  create: async (todo: CreateTodoInput): Promise<Todo> => {
    const { data } = await apiClient.post<ApiResponse<Todo>>('/api/todos', todo);
    return data.data;
  },

  update: async (id: string, todo: UpdateTodoInput): Promise<Todo> => {
    const { data } = await apiClient.put<ApiResponse<Todo>>(`/api/todos/${id}`, todo);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/api/todos/${id}`);
  },
};