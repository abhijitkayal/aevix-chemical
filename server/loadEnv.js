import dotenv from 'dotenv';
import path from 'path';

// Try to load .env from project root (one level up from server folder)
const rootEnv = path.resolve(process.cwd(), '../.env');
let result = dotenv.config({ path: rootEnv });

if (result.error) {
  // Fallback: try loading default .env (current directory)
  result = dotenv.config();
}

if (result.error) {
  console.warn('loadEnv: no .env file found or failed to load.');
} else {
  process.env.DOTENV_LOADED = 'true';
  console.log(`loadEnv: loaded .env from ${result.parsed ? (rootEnv) : 'default location'}`);
  console.log('loadEnv: EMAIL_USER set?', !!process.env.EMAIL_USER, 'EMAIL_PASS set?', !!process.env.EMAIL_PASS);
}