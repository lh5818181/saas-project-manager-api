import { prisma } from '../config/database';

export class TaskService {
  // Criar uma nova tarefa vinculada a um projeto
  async createTask(projectId: string, data: { title: string; description?: string; priority?: string }) {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority || 'medium',
        status: 'todo', // Toda tarefa nasce no 'todo' por padrão no Kanban
        projectId: projectId
      }
    });
  }

  // Listar todas as tarefas de um projeto específico
  async listTasksByProject(projectId: string) {
    return await prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' } // Organiza por ordem de criação
    });
  }

  // Atualizar dados ou mover o status no Kanban (ex: 'todo' para 'doing')
  async updateTask(taskId: string, data: { title?: string; description?: string; status?: string; priority?: string }) {
    return await prisma.task.update({
      where: { id: taskId },
      data
    });
  }

  // Deletar uma tarefa
  async deleteTask(taskId: string) {
    return await prisma.task.delete({
      where: { id: taskId }
    });
  }
}