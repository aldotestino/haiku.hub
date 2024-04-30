import '@/lib/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/server/db/model.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
  out: './drizzle'
});