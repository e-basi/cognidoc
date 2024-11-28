import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql', // Specify the database type
  schema: './src/lib/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL || '', // Provide the full DATABASE_URL directly
  },
});
