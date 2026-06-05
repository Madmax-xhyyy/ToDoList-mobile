import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Todo[]>>('/todos');
      return data.data;
    },
  });
};

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (newTodo: Pick<Todo, 'title' | 'description'>) => {
      const { data } = await apiClient.post<ApiResponse<Todo>>('/todos', newTodo);
      return data.data;
    },
    onSuccess: () => {
      // Force background refetching to keep UI perfectly synchronized
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Todo> & { id: string }) => {
      const { data } = await apiClient.put<ApiResponse<Todo>>(`/todos/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};