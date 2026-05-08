import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';

const projectService = new ProjectService();

export class ProjectController {
  async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const ownerId = (req as any).user.id; // Pegando do token

      if (!name) return res.status(400).json({ error: "Nome é obrigatório" });

      const project = await projectService.createProject(name, description, ownerId);
      return res.status(201).json(project);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const projects = await projectService.listUserProjects(userId);
      return res.json(projects);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const project = await projectService.updateProject(id as string, userId, req.body);
    return res.json(project);
  } catch (error: any) {
    return res.status(403).json({ error: "Não autorizado ou projeto inexistente" });
  }
}

async delete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    await projectService.deleteProject(id as string, userId);
    return res.status(204).send(); // 204 = Sucesso, mas sem conteúdo de resposta
  } catch (error: any) {
    return res.status(403).json({ error: "Não autorizado ou projeto inexistente" });
  }
}
}