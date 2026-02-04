import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Migrações precisam de conexão DIRETA (porta 5432), não do pooler (6543).
// Use DIRECT_DATABASE_URL no .env com a connection string "Direct connection" do Supabase.
const databaseUrl = process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Defina DIRECT_DATABASE_URL (recomendado para migrate) ou DATABASE_URL no .env. " +
      "Com Supabase, use a conexão direta (porta 5432) para migrações.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
