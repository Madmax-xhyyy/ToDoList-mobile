import { Todo } from '../../generated/prisma/client';
import prisma from '../prisma';

export function useTodoRepository() {
  async function create(title: string, description?: string): Promise<Todo> {
    return prisma.todo.create({
      data: { title, description },
    });
  }

  async function findAll(): Promise<Todo[]> {
    return prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async function findById(id: string): Promise<Todo | null> {
    return prisma.todo.findUnique({
      where: { id },
    });
  }

  async function update(id: string, data: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Todo> {
    return prisma.todo.update({
      where: { id },
      data,
    });
  }

  async function deleteById(id: string): Promise<Todo> {
    return prisma.todo.delete({
      where: { id },
    });
  }

  return {
    create,
    findAll,
    findById,
    update,
    deleteById,
  };
}