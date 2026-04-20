#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { readmeFile, readProblems } from './_lib.mjs';

const START = '<!-- problems:start -->';
const END = '<!-- problems:end -->';

function check(has) {
  return has ? '✅' : '—';
}

function row(p) {
  const tags = (p.tags ?? []).map((t) => `\`${t}\``).join(', ');
  return `| ${p.id} | [${p.title}](${p.url}) | ${p.difficulty} | ${check(
    p.languages.includes('rs'),
  )} | ${check(p.languages.includes('ts'))} | ${check(
    p.languages.includes('php'),
  )} | ${p.solvedAt} | ${tags} |`;
}

function render(problems) {
  const header =
    '| # | Title | Difficulty | Rust | TypeScript | PHP | Solved on | Tags |\n' +
    '|---|-------|------------|:----:|:----------:|:---:|-----------|------|';
  const body = problems.map(row).join('\n');
  return `${header}\n${body}`;
}

async function main() {
  const { problems } = await readProblems();
  problems.sort((a, b) => a.id - b.id);
  const table = render(problems);
  const readme = await readFile(readmeFile, 'utf8');
  const before = readme.split(START)[0];
  const afterParts = readme.split(END);
  const after = afterParts[afterParts.length - 1];
  const updated = `${before}${START}\n${table}\n${END}${after}`;
  await writeFile(readmeFile, updated, 'utf8');
  console.log(`README updated — ${problems.length} problem(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
