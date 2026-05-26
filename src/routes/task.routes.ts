import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { isVerified } from '../middleware/verify.middleware';

const router = Router();
const taskController = new TaskController();

// Todas as tarefas exigem login e e-mail verificado
router.use(authMiddleware, isVerified);

// Rotas dependentes de um projeto
router.post('/project/:projectId', taskController.create);
router.get('/project/:projectId', taskController.list);

// Rotas diretas da tarefa
router.put('/:taskId', taskController.update);
router.delete('/:taskId', taskController.delete);

export default router;