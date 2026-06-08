import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../services/todoService';
import { CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { Alert } from 'react-native';

const TODO_QUERY_KEY = ['todos'] as const;

export const useTodos = () => {
  return useQuery({
    queryKey: TODO_QUERY_KEY,
    queryFn: todoService.getAll,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTodo: CreateTodoInput) => todoService.create(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to create todo.');
      console.error(error);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to delete todo.');
      console.error(error);
    },
  });
};