import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

const taskService = new TaskService();

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const { title, description, priority } = req.body;

      if (!title) return res.status(400).json({ error: "O título da tarefa é obrigatório." });

      const task = await taskService.createTask(projectId as string, { title, description, priority });
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const tasks = await taskService.listTasksByProject(projectId as string);
      return res.json(tasks);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await taskService.updateTask(taskId as string, req.body);
      return res.json(task);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      await taskService.deleteTask(taskId as string);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}