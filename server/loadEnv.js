import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from server directory (same directory as this file)
const serverEnv = path.resolve(__dirname, '.env');
let result = dotenv.config({ path: serverEnv });

if (result.error) {
  // Fallback: try loading from project root (one level up)
  const rootEnv = path.resolve(__dirname, '../.env');
  result = dotenv.config({ path: rootEnv });
}

if (result.error) {
  console.warn('loadEnv: no .env file found or failed to load.');
} else {
  process.env.DOTENV_LOADED = 'true';
  console.log(`loadEnv: loaded .env successfully`);
  console.log('loadEnv: EMAIL_USER set?', !!process.env.EMAIL_USER, 'EMAIL_PASS set?', !!process.env.EMAIL_PASS);
  console.log('loadEnv: SMTP_HOST =', process.env.SMTP_HOST || 'not set');
}