# Watchin' 🎬

Aplicativo para salvar e organizar seus filmes favoritos.

## 🚀 Stack

- **Next.js 16.0.5** - Framework React com App Router
- **TailwindCSS** - Estilização
- **OAuth + Passport.js** - Autenticação
- **Zod** - Validação
- **PostgreSQL** - Database
- **Prisma** - ORM
- **TypeScript** - Tipagem estática
- **FontAwesome** - Ícones

## 🏗️ Arquitetura

Este projeto utiliza uma **Feature-Based Architecture** (Arquitetura Baseada em Features), onde cada funcionalidade é organizada em sua própria pasta com todos os recursos relacionados.

### Estrutura do Projeto

```
src/
├── features/              # Features do aplicativo
│   ├── auth/             # Autenticação (Login, Signin, Profile)
│   ├── movies/           # Filmes (Cards, Busca)
│   ├── favorites/        # Favoritos/Listas
│   └── navigation/       # Navegação principal
├── shared/               # Código compartilhado
│   └── types/           # Tipos TypeScript globais
└── app/                 # Next.js App Router (páginas)
```

Para mais detalhes sobre a arquitetura, consulte [src/features/README.md](src/features/README.md).

## 🎯 Features

- ✅ Landing page com apresentação
- ✅ Sistema de autenticação (Login/Cadastro)
- ✅ Perfil de usuário
- ✅ Busca de filmes
- ✅ Cards de filmes com informações
- ✅ Listas de favoritos
- ✅ Navegação responsiva
- 🚧 Conexão com TMDB API
- 🚧 Sistema de amigos
- 🚧 Listas compartilhadas

## 🛠️ Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- PostgreSQL (opcional, para features futuras)

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`.

### Banco de dados e migrações (Supabase)

# Ver o banco de dados visualmente
npx prisma studio

# Resetar o banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Criar nova migração após alterar o schema
npx prisma migrate dev --name nome_da_migracao

# Formatar o schema.prisma
npx prisma format

### Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia o servidor de produção
npm run prettier     # Formata o código
npm run prettier:check # Verifica formatação
```

## 📝 Guia de Desenvolvimento

### Adicionando uma Nova Feature

1. Crie uma pasta em `src/features/nome-da-feature/`
2. Adicione as subpastas necessárias (`components/`, `hooks/`, `utils/`)
3. Crie um `index.ts` para exportar a API pública da feature
4. Importe usando `@/features/nome-da-feature`

### Importações

Use o path alias `@/` configurado:

```typescript
// ✅ Bom
import { Profile } from "@/features/auth";
import { MovieCard } from "@/features/movies";

// ❌ Evite
import Profile from "../../features/auth/components/Profile";
```

## 🎨 Padrões de Código

- **Componentes**: PascalCase (`MovieCard.tsx`)
- **Utilitários**: camelCase (`formatters.ts`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`)
- **Tipos**: PascalCase com sufixo (`MovieCardProps`)

## 📦 Estrutura de Dados

### Movie (Filme)

```typescript
interface MovieCardProps {
  title: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido por [Luan Cardoso](https://github.com/luan-cardoso).

---

**Desenvolvido e construído com ❤️ por [Luan Cardoso](https://github.com/luan-cardoso)**
