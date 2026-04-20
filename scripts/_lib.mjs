import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(__dirname, '..');
export const problemsFile = resolve(repoRoot, 'problems.json');
export const readmeFile = resolve(repoRoot, 'README.md');

export const validLanguages = /** @type {const} */ (['rs', 'ts', 'php']);
export const validDifficulties = /** @type {const} */ (['easy', 'medium', 'hard']);

export async function readProblems() {
  const raw = await readFile(problemsFile, 'utf8');
  const data = JSON.parse(raw);
  if (!data || !Array.isArray(data.problems)) {
    throw new Error('problems.json is malformed: missing "problems" array');
  }
  return data;
}

export async function writeProblems(data) {
  data.problems.sort((a, b) => a.id - b.id);
  await writeFile(problemsFile, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

export function padId(id) {
  return String(id).padStart(4, '0');
}

export function slugToSnake(slug) {
  return slug.replace(/-/g, '_');
}

export function slugToPascal(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function today() {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
