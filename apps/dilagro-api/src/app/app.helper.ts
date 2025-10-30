import { resolve } from 'path';
import { existsSync } from 'fs';

/**
 * Automatically selects the right environment file based on NODE_ENV.
 * Example:
 * - NODE_ENV=development → apps/dilagro-api/environments/development.env
 * - NODE_ENV=production → apps/dilagro-api/environments/production.env
 */
export function getEnvPath(dest: string): string {
    const env: string | undefined = process.env['NODE' + '_ENV'];
    const fallback: string = resolve(`${dest}/.env`);
    const filename: string = env ? `${env}.env` : 'development.env';
    let filePath: string = resolve(`${dest}/${filename}`);
    if (!existsSync(filePath)) {
        filePath = fallback;
    }

    return filePath;
}