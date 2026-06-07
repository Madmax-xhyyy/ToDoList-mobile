import { apiClient } from '../lib/client';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await apiClient.get<Todo[]>('/api/todos');
    return data;
  },

  getById: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.get<Todo>(`/api/todos/${id}`);
    return data;
  },

  create: async (todo: CreateTodoInput): Promise<Todo> => {
    const { data } = await apiClient.post<Todo>('/api/todos', todo);
    return data;
  },

  update: async (id: string, todo: UpdateTodoInput): Promise<Todo> => {
    const { data } = await apiClient.put<Todo>(`/api/todos/${id}`, todo);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/todos/${id}`);
  },
};