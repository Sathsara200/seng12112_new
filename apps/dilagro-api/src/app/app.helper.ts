import { resolve } from 'path';
import { existsSync } from 'fs';

/**
 * Automatically selects the right environment file based on NODE_ENV.
 * Example:
 * - NODE_ENV=development → apps/dilagro-api/environments/development.env
 * - NODE_ENV=production → apps/dilagro-api/environments/production.env
 */
export function getEnvPath(): string {
  const env = process.env.NODE_ENV || 'development';
  const filename = `${env}.env`;

  // Always resolve relative to project root
  const envPath = resolve(process.cwd(), 'apps/dilagro-api/environments', filename);

  if (!existsSync(envPath)) {
    throw new Error(`Environment file not found: ${envPath}`);
  }

  return envPath;
}
