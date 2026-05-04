import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { isVerified } from '../middleware/verify.middleware';


interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authController.verifyEmail);
router.post('/logout', authMiddleware, authController.logout);


router.get('/me', authMiddleware, isVerified, (req: Request, res: Response) => {
  // Fazemos o TypeScript entender que, neste ponto, o req é um AuthRequest
  const authReq = req as AuthRequest;

  return res.json({ 
    message: "Acesso autorizado!", 
    userId: authReq.user.id 
  });
});

export default router;