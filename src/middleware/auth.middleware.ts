import { Request, Response, NextFunction } from 'express';
import * as jwtService from 'jsonwebtoken';

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwtService.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    // Fazemos o cast aqui para injetar o usuário
    (req as AuthRequest).user = { id: decoded.userId };
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};