import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { isVerified } from '../middleware/verify.middleware';

const router = Router();
const projectController = new ProjectController();

// Aplica os middlewares em todas as rotas abaixo
router.use(authMiddleware, isVerified);

router.post('/', projectController.create);
router.get('/', projectController.list);

router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);

export default router;