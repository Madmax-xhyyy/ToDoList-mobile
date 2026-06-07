import { Todo } from '../../generated/prisma/client';
import prisma from '../prisma';
import { BadRequestError } from '../utils/error';

export function useTodoRepository() {
  async function create(title: string, description?: string): Promise<Todo> {
    return prisma.todo.create({
      data: { 
        title, 
        description: description === "" ? null : description 
      },
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
    try {
      return await prisma.todo.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new BadRequestError(`Database validation failed: ${error.message}`);
    }
  }

  async function deleteById(id: string): Promise<Todo> {
    try {
      return await prisma.todo.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new BadRequestError(`Database deletion rejected: ${error.message}`);
    }
  }

  return {
    create,
    findAll,
    findById,
    update,
    deleteById,
  };
}