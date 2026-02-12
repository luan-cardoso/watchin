import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { parse } from "pg-connection-string";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não está definida no ambiente.");
}

const parsed = parse(connectionString);
const poolConfig = {
  ...parsed,
  database: parsed.database ?? undefined,
  host: parsed.host ?? undefined,
  port: parsed.port ? parseInt(parsed.port, 10) : undefined,
  ssl: { rejectUnauthorized: false },
};

const adapter = new PrismaPg(poolConfig);

export const prisma = new PrismaClient({ adapter });
