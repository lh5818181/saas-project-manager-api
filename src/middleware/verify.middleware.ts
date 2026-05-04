import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';

export const isVerified = async (req: any, res: Response, next: NextFunction) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  if (!user?.emailVerified) {
    return res.status(403).json({ error: "Por favor, verifique seu e-mail antes de continuar." });
  }

  next();
};