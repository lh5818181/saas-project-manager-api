import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { prisma } from './config/database';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

// Rota de Health Check (útil para testar o banco agora)
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', database: 'Disconnected' });
  }
});

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});