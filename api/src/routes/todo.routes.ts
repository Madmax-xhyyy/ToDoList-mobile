import { Router } from 'express';
import { useTodoController } from '../controllers/todo.controller';

const router = Router();
const todoController = useTodoController();

router.post('/', todoController.create);
router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.deleteById);

export default router;