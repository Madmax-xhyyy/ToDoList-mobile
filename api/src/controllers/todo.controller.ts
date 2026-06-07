import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { useTodoService } from "../services/todo.service";
import { AppError, BadRequestError } from "../utils/error";

const uuidSchema = Joi.string().uuid({ version: 'uuidv4' });

const schemaTodoCreate = Joi.object({
  title: Joi.string().trim().max(255).required(),
  description: Joi.string().trim().allow("", null).optional(),
});

const schemaTodoUpdate = Joi.object({
  title: Joi.string().trim().max(255).optional(),
  description: Joi.string().trim().allow("", null).optional(),
  isCompleted: Joi.boolean().optional(),
});

export function useTodoController() {
  const todoService = useTodoService();

  async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error, value } = schemaTodoCreate.validate(req.body);
    if (error) {
      next(new BadRequestError(error.message));
      return;
    }

    try {
      const newTodo = await todoService.createTodo(value.title, value.description);
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  }

  async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const todos = await todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (error: any) {
      if (error instanceof AppError) {
        next(error);
        return;
      }
      next(new BadRequestError(`Failed to fetch tasks: ${error.message}`));
    }
  }

  async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = (req.params.id as string) ?? "";

    const { error } = uuidSchema.validate(id);
    if (error) {
      next(new BadRequestError(`Invalid task UUID parameter: ${id}`));
      return;
    }

    try {
      const todo = await todoService.getTodoById(id);
      res.status(200).json(todo);
    } catch (error: any) {
      next(error);
    }
  }

  async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = (req.params.id as string) ?? "";

    const idValidation = uuidSchema.validate(id);
    if (idValidation.error) {
      next(new BadRequestError(`Invalid task UUID identifier: ${id}`));
      return;
    }

    const { error, value } = schemaTodoUpdate.validate(req.body);
    if (error) {
      next(new BadRequestError(error.message));
      return;
    }

    try {
      const updatedTodo = await todoService.updateTodo(id, value);
      res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = (req.params.id as string) ?? "";

    const { error } = uuidSchema.validate(id);
    if (error) {
      next(new BadRequestError(`Invalid task UUID parameter: ${id}`));
      return;
    }

    try {
      await todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  return {
    create,
    getAll,
    getById,
    update,
    deleteById,
  };
}