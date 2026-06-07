import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../services/todoService';
import { CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { Alert } from 'react-native';

const TODO_QUERY_KEY = ['index'] as const;

// Fetch Hook
export const useTodos = () => {
  return useQuery({
    queryKey: TODO_QUERY_KEY,
    queryFn: todoService.getAll,
  });
};

// Mutations Hook
export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newTodo: CreateTodoInput) => todoService.create(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to create todo. Please try again.');
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoInput }) =>
      todoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to update todo.');
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => todoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to delete todo.');
      console.error(error);
    },
  });

  return {
    createTodo: createMutation.mutateAsync,
    updateTodo: updateMutation.mutateAsync,
    deleteTodo: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};