#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  padId,
  parseArgs,
  readProblems,
  repoRoot,
  slugToPascal,
  slugToSnake,
  today,
  validDifficulties,
  validLanguages,
  writeProblems,
} from './_lib.mjs';

function usage() {
  console.error(`Usage: pnpm new -- --id <n> --slug <slug> --title "<title>" [options]

Required:
  --id          LeetCode problem id (positive integer)
  --slug        kebab-case slug (e.g. "two-sum")
  --title       Human-readable title
  --difficulty  easy | medium | hard (default: easy)

Optional:
  --url         Problem URL (default: https://leetcode.com/problems/<slug>/)
  --tags        Comma-separated tags (e.g. "array,hash-map")
  --langs       Comma-separated subset of rs,ts,php (default: all)
`);
}

function validate(args) {
  if (args.help === true) {
    usage();
    process.exit(0);
  }
  const id = Number.parseInt(String(args.id ?? ''), 10);
  if (!Number.isInteger(id) || id <= 0) throw new Error('--id must be a positive integer');
  const slug = String(args.slug ?? '').trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('--slug must be kebab-case (e.g. "two-sum")');
  }
  const title = String(args.title ?? '').trim();
  if (!title) throw new Error('--title is required');
  const difficulty = String(args.difficulty ?? 'easy').toLowerCase();
  if (!validDifficulties.includes(difficulty)) {
    throw new Error(`--difficulty must be one of ${validDifficulties.join(', ')}`);
  }
  const langs = String(args.langs ?? validLanguages.join(','))
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean);
  for (const l of langs) {
    if (!validLanguages.includes(l)) {
      throw new Error(`--langs contains invalid language: ${l}`);
    }
  }
  const tags = args.tags
    ? String(args.tags)
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const url = args.url ? String(args.url) : `https://leetcode.com/problems/${slug}/`;
  return { id, slug, title, difficulty, langs, tags, url };
}

async function writeIfAbsent(path, content) {
  try {
    await readFile(path);
    console.log(`  skipped (exists): ${path}`);
  } catch {
    await writeFile(path, content, 'utf8');
    console.log(`  created: ${path}`);
  }
}

async function scaffoldRust({ id, slug, title, url, difficulty }) {
  const padded = padId(id);
  const snake = slugToSnake(slug);
  const moduleName = `p${padded}_${snake}`;
  const file = resolve(repoRoot, 'leetcode-rs/src', `${moduleName}.rs`);
  const libFile = resolve(repoRoot, 'leetcode-rs/src/lib.rs');

  const content = `//! [${id}. ${title}](${url}) \u2014 \`${difficulty}\`
//!
//! Describe the problem constraints here.

/// TODO: implement ${title}.
pub fn solve() -> Option<()> {
    None
}

#[cfg(test)]
mod tests {
    use super::solve;

    #[test]
    fn tdd_placeholder_fails_until_implemented() {
        assert_eq!(solve(), Some(()), "replace with real expectations");
    }
}
`;

  await writeIfAbsent(file, content);

  const lib = await readFile(libFile, 'utf8');
  if (lib.includes(`pub mod ${moduleName};`)) return;
  const marker = /^\/\/ @problems:end\s*$/m;
  if (!marker.test(lib)) {
    throw new Error('Could not find "// @problems:end" marker in leetcode-rs/src/lib.rs');
  }
  const updated = lib.replace(marker, `pub mod ${moduleName};\n// @problems:end`);
  await writeFile(libFile, updated, 'utf8');
  console.log(`  updated: ${libFile}`);
}

async function scaffoldTs({ id, slug, title, url, difficulty }) {
  const padded = padId(id);
  const dir = resolve(repoRoot, 'leetcode-ts/src', `p${padded}-${slug}`);
  await mkdir(dir, { recursive: true });

  const fn = `solve${slugToPascal(slug)}`;
  const index = `/**
 * [${id}. ${title}](${url}) \u2014 ${difficulty}
 *
 * Describe the problem constraints here.
 */
export function ${fn}(): unknown {
  // TODO: implement
  throw new Error('not implemented');
}
`;

  const test = `import { describe, expect, it } from 'vitest';
import { ${fn} } from './index.ts';

describe('p${padded} \u2014 ${slug}', () => {
  it('TDD placeholder fails until implemented', () => {
    expect(${fn}()).toBe('replace with real expectations');
  });
});
`;

  await writeIfAbsent(resolve(dir, 'index.ts'), index);
  await writeIfAbsent(resolve(dir, 'index.test.ts'), test);
}

async function scaffoldPhp({ id, slug, title, url, difficulty }) {
  const padded = padId(id);
  const className = `P${padded}${slugToPascal(slug)}`;
  const srcFile = resolve(repoRoot, 'leetcode-php/src', `${className}.php`);
  const testFile = resolve(repoRoot, 'leetcode-php/tests', `${className}Test.php`);

  const src = `<?php

declare(strict_types=1);

namespace JH3ady\\LeetCode;

/**
 * [${id}. ${title}](${url}) \u2014 ${difficulty}.
 */
final class ${className}
{
    public function solve(): mixed
    {
        throw new \\RuntimeException('not implemented');
    }
}
`;

  const test = `<?php

declare(strict_types=1);

namespace JH3ady\\LeetCode\\Tests;

use JH3ady\\LeetCode\\${className};
use PHPUnit\\Framework\\Attributes\\CoversClass;
use PHPUnit\\Framework\\Attributes\\Test;
use PHPUnit\\Framework\\TestCase;

#[CoversClass(${className}::class)]
final class ${className}Test extends TestCase
{
    #[Test]
    public function tddPlaceholderFailsUntilImplemented(): void
    {
        $solver = new ${className}();
        self::assertSame('replace with real expectations', $solver->solve());
    }
}
`;

  await writeIfAbsent(srcFile, src);
  await writeIfAbsent(testFile, test);
}

async function registerProblem(opts) {
  const data = await readProblems();
  const existing = data.problems.find((p) => p.id === opts.id);
  if (existing) {
    const langs = new Set([...existing.languages, ...opts.langs]);
    existing.languages = validLanguages.filter((l) => langs.has(l));
    existing.tags = Array.from(new Set([...(existing.tags ?? []), ...opts.tags]));
    console.log(`problems.json: updated entry for #${opts.id}`);
  } else {
    data.problems.push({
      id: opts.id,
      slug: opts.slug,
      title: opts.title,
      difficulty: opts.difficulty,
      url: opts.url,
      tags: opts.tags,
      solvedAt: today(),
      languages: validLanguages.filter((l) => opts.langs.includes(l)),
    });
    console.log(`problems.json: added entry for #${opts.id}`);
  }
  await writeProblems(data);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const opts = validate(args);

  console.log(`\nScaffolding problem #${opts.id} — ${opts.title}\n`);

  if (opts.langs.includes('rs')) {
    console.log('Rust:');
    await scaffoldRust(opts);
  }
  if (opts.langs.includes('ts')) {
    console.log('TypeScript:');
    await scaffoldTs(opts);
  }
  if (opts.langs.includes('php')) {
    console.log('PHP:');
    await scaffoldPhp(opts);
  }

  await registerProblem(opts);

  console.log('\nNext: run the test suites, watch them fail (red), then implement.');
  console.log('  pnpm test:rs  |  pnpm test:ts  |  pnpm test:php\n');
}

main().catch((err) => {
  console.error(`\nerror: ${err.message}\n`);
  usage();
  process.exit(1);
});
