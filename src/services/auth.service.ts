import * as jwtService from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs';
import { prisma } from '../config/database';
import { signupSchema } from '../schemas/auth.schemas';
import { z } from 'zod';

type SignupData = z.infer<typeof signupSchema>;

export class AuthService {
  async registerUser(data: SignupData) {
    // 1. Verificar se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (userExists) {
      throw new Error("Este email já está em uso.");
    }

    // 2. Criptografar a senha
    const passwordHash = await bcrypt.hash(data.password, 10);

    // 3. Criar o usuário no banco
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: passwordHash,
      },
      select: { // Não retornamos a senha no JSON
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

// Geração do Token de Verificação (JWT de 24 horas)
    const verificationToken = jwtService.sign(
      { userId: user.id, type: 'VERIFICATION' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

  // No futuro, aqui chamaremos: await mailProvider.send(user.email, verificationToken)
    console.log(`\n📧 [EMAIL SIMULATOR] Para: ${user.email}`);
    console.log(`🔗 Link: http://localhost:3333/api/auth/verify?token=${verificationToken}\n`);

    return user;
  }

  async verifyEmail(token: string) {
    try {
      const decoded = jwtService.verify(token, process.env.JWT_SECRET!) as { userId: string, type: string };

      if (decoded.type !== 'VERIFICATION') {
        throw new Error("Token inválido.");
      }

      await prisma.user.update({
        where: { id: decoded.userId },
        data: { emailVerified: new Date() }
      });

      return { message: "E-mail verificado com sucesso!" };
    } catch (error) {
      throw new Error("Token expirado ou inválido.");
    }
  }


  async login(data: { email: string; password: string }) {
    // 1. Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    // 2. Comparar a senha enviada com o hash do banco
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas.");
    }

    // 3. Gerar Access Token (15 minutos)
    const accessToken = jwtService.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    // 4. Gerar Refresh Token (7 dias)
    const refreshToken = jwtService.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      accessToken,
      refreshToken
    };
  }
}
