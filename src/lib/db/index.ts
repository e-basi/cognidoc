import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Enable Neon’s connection cache for better performance
neonConfig.fetchConnectionCache = true;

// Validate the existence of DATABASE_URL
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined. Check your .env file.');
}

// Create a Neon connection and initialize Drizzle ORM
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql});
