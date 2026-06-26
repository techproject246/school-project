import type { RunnerOption } from "node-pg-migrate";

const config: RunnerOption = {
  databaseUrl: process.env.DATABASE_URL!,
  dir: "sql/migrations",
  direction: "up",
  migrationsTable: "pgmigrations",
  createMigrationsSchema: true,
  createSchema: true,
  schema: "public",
  verbose: true,
  singleTransaction: true,
};

export default config;
