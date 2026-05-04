# SaaS Project Manager - API 🚀

API robusta para gerenciamento de projetos e tarefas (Kanban), construída com Node.js, TypeScript e Prisma.

## 🛠️ Tecnologias
- **Node.js** & **Express**
- **TypeScript**
- **Prisma ORM** (PostgreSQL via Docker)
- **Zod** (Validação)
- **JWT** (Autenticação)
- **BcryptJS** (Segurança)

## 🏗️ Como rodar o projeto
1. Clone o repositório.
2. Configure o seu `.env` (baseado no `.env.example`).
3. Suba o banco de dados: `docker-compose up -d`.
4. Rode as migrações: `npx prisma migrate dev`.
5. Inicie o servidor: `npm run dev`.

## 🚀 Funcionalidades Implementadas (Fase 1)

- **Autenticação Segura:**
  - [x] Registro de usuários com senhas criptografadas (Bcrypt).
  - [x] Login com geração de Access Token (JWT) e Refresh Token.
  - [x] Verificação de e-mail via link único (Simulado via console).
  - [x] Logout funcional para sinalização ao cliente.
- **Segurança e Validação:**
  - [x] Validação de dados de entrada com Zod.
  - [x] Middleware de Autenticação para proteção de rotas.
  - [x] Middleware de Verificação para exigir e-mail validado.
- **Banco de Dados:**
  - [x] Modelagem completa via Prisma (User, Project, Task, Member, etc).

## 🛠️ Próximos Passos
- [ ] CRUD de Projetos (Criação, Listagem, Edição e Exclusão).
- [ ] Gerenciamento de Membros e Permissões.
- [ ] Quadro Kanban (Tarefas e Status).