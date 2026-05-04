import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { signupSchema, loginSchema } from '../schemas/auth.schemas';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = signupSchema.parse(req.body);
      const user = await authService.registerUser(data);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Erro no registro' });
    }
  }

  async verifyEmail(req: Request, res: Response) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Token é obrigatório." });
    }

    const result = await authService.verifyEmail(token as string);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data);
      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message || 'Erro no login' });
    }
  }

    // Por ser uma API stateless, o logout é apenas uma questão de o cliente remover o token localmente.
  async logout(req: Request, res: Response) {
  try {
    // Como usamos JWT, o logout "real" acontece no client-side.
    // Aqui apenas retornamos sucesso para o front saber que pode limpar os dados.
    return res.json({ message: "Logout realizado com sucesso. Remova o token do cliente." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao processar logout" });
  }
}
}

