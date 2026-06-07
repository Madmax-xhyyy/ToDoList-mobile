import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { useTodoService } from "../services/todo.service";
import { BadRequestError } from "../utils/error";

interface TodoParams {
  id: string;
}

const uuidSchema = Joi.string().uuid({ version: 'uuidv4' }).required();

const schemaTodoCreate = Joi.object({
  title: Joi.string().trim().max(255).required(),
  description: Joi.string().trim().allow("", null).default("").optional(),
});

const schemaTodoUpdate = Joi.object({
  title: Joi.string().trim().max(255).optional(),
  description: Joi.string().trim().allow("", null).optional(),
  isCompleted: Joi.boolean().optional(),
}).min(1); 

export function useTodoController() {
  const todoService = useTodoService();

  const validateIdParam = (id: string): string => {
    const { error, value } = uuidSchema.validate(id);
    if (error) {
      throw new BadRequestError(`Invalid task format identifier string: "${id}"`);
    }
    return value;
  };

  async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = schemaTodoCreate.validate(req.body);
      if (error) throw new BadRequestError(error.message);

      const newTodo = await todoService.createTodo(value.title, value.description);
      
      res.status(201).json({
        success: true,
        data: newTodo
      });
    } catch (error) {
      next(error);
    }
  }

  async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const todos = await todoService.getAllTodos();
      
      res.status(200).json({
        success: true,
        results: todos.length,
        data: todos
      });
    } catch (error) {
      next(error);
    }
  }

  async function getById(req: Request<TodoParams>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = validateIdParam(req.params.id); 
      const todo = await todoService.getTodoById(id);
      
      res.status(200).json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }

  async function update(req: Request<TodoParams>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = validateIdParam(req.params.id);
      
      const { error, value } = schemaTodoUpdate.validate(req.body);
      if (error) throw new BadRequestError(error.message);

      const updatedTodo = await todoService.updateTodo(id, value);
      
      res.status(200).json({
        success: true,
        message: "Task details updated successfully.",
        data: updatedTodo
      });
    } catch (error) {
      next(error);
    }
  }

  async function deleteById(req: Request<TodoParams>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = validateIdParam(req.params.id);
      await todoService.deleteTodo(id);
      
      res.status(200).json({
        success: true,
        message: `Task with identity sequence [${id}] was deleted successfully.`
      });
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