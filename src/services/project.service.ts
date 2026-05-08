import { prisma } from '../config/database';

export class ProjectService {

  async createProject(name: string, description: string | undefined, ownerId: string) {
    return await prisma.project.create({
      data: {
        name,
        description,
        ownerId,
        // Ao criar, o dono também se torna automaticamente um membro "admin"
        members: {
          create: {
            userId: ownerId,
            role: 'admin'
          }
        }
      }
    });
  }

  async listUserProjects(userId: string) {
    return await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateProject(id: string, userId: string, data: { name?: string; description?: string }) {
  return await prisma.project.update({
    where: { 
      id,
      ownerId: userId // Segurança: Só o dono atualiza
    },
    data
  });
}

async deleteProject(id: string, userId: string) {
  return await prisma.project.delete({
    where: { 
      id,
      ownerId: userId // Segurança: Só o dono deleta
    }
  });
}
}

