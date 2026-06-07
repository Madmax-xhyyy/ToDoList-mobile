import { Todo } from '../../generated/prisma/client';
import { useTodoRepository } from '../repositories/todo.repository';
import { BadRequestError, NotFoundError } from '../utils/error';

export function useTodoService() {
  const todoRepository = useTodoRepository();

  async function createTodo(title: string, description?: string): Promise<Todo> {
    if (!title || title.trim() === '') {
      throw new BadRequestError('Title cannot be left empty.');
    }
    return todoRepository.create(title.trim(), description?.trim());
  }

  async function getAllTodos(): Promise<Todo[]> {
    return todoRepository.findAll();
  }

  async function getTodoById(id: string): Promise<Todo> {
    const todo = await todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundError('Requested Task does not exist.');
    }
    return todo;
  }

  async function updateTodo(id: string, updates: { title?: string; description?: string; isCompleted?: boolean }): Promise<Todo> {
    await getTodoById(id); // Validates existence, throws NotFoundError if missing

    const dataToUpdate: Partial<Todo> = {};
    if (updates.title !== undefined) dataToUpdate.title = updates.title.trim();
    if (updates.description !== undefined) dataToUpdate.description = updates.description.trim();
    if (updates.isCompleted !== undefined) dataToUpdate.isCompleted = updates.isCompleted;

    return todoRepository.update(id, dataToUpdate);
  }

  async function deleteTodo(id: string): Promise<void> {
    await getTodoById(id); // Validates existence
    await todoRepository.deleteById(id);
  }

  return {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
  };
}