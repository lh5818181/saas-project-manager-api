import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { signupSchema } from '../schemas/auth.schemas';

const authService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      // Validar dados da requisição
      const validatedData = signupSchema.parse(req.body);

      // Chamar o serviço
      const user = await authService.registerUser(validatedData);

      return res.status(201).json(user);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const result = await authService.login({ email, password });

      // Opcional: Configurar o token em um Cookie HttpOnly como pede seu doc
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000 // 15 min
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}