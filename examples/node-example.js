/**
 * Example Node.js file
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

async function loadConfig(filename) {
  try {
    const filePath = join(process.cwd(), filename);
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to load config:', error);
    throw error;
  }
}

export { loadConfig };
