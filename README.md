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

## 📌 Funcionalidades Implementadas
- [x] Configuração de ambiente e Docker.
- [x] Cadastro de usuários (Signup) com senha criptografada.
- [x] Autenticação de usuários (Login) com emissão de JWT.
- [ ] Middleware de proteção de rotas (Próximo passo).