# Contributing

Thanks for your interest in contributing. This repository hosts daily LeetCode solutions written in Rust, TypeScript and PHP, each driven by tests first (TDD).

## Code of Conduct

By participating, you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Ways to contribute

- Add a new solved problem (Rust, TypeScript or PHP).
- Add an alternative solution for an existing problem in another language.
- Improve an existing solution (better complexity, idiomatic refactor, extra edge-case tests).
- Fix typos, improve docs, open an issue for anything unclear.

## Prerequisites

- Node.js `>= 24` LTS (use `nvm use` or `asdf install`)
- pnpm `>= 10`
- Rust stable (`rustup toolchain install stable`)
- PHP `>= 8.5` + Composer

Quick check:

```bash
node -v && pnpm -v && rustc --version && php -v && composer --version
```

## Install

```bash
pnpm install
composer install -d leetcode-php
```

Rust dependencies are fetched automatically by `cargo test`.

## TDD workflow

Every solution follows the Red/Green/Refactor cycle:

1. Scaffold a new problem across the three languages:

   ```bash
   pnpm new -- --id 42 --slug "trapping-rain-water" --title "Trapping Rain Water" --difficulty hard --tags array,stack,two-pointers
   ```

2. Tests are generated with a failing assertion. Run them and confirm the **red** state:

   ```bash
   pnpm test:rs
   pnpm test:ts
   pnpm test:php
   ```

3. Implement the minimal solution to turn the tests **green**.

4. Refactor with lint/format:

   ```bash
   pnpm lint
   pnpm format
   ```

5. Commit once tests pass in every language you touched.

## Commit convention

Commits follow gitmoji + conventional commits:

```
:sparkles: feat(ts): solve 0042 trapping rain water
:white_check_mark: test(rs): add edge case for empty heights on p0042
:green_heart: ci: cache cargo across jobs
```

Common prefixes: `feat`, `fix`, `test`, `docs`, `refactor`, `perf`, `chore`, `ci`, `build`.

## Pull Request checklist

- [ ] `pnpm test` passes locally
- [ ] `pnpm lint` passes locally
- [ ] New problems appear in `problems.json` and `README.md` is regenerated (`pnpm readme`)
- [ ] If you touched a solution, the test covers at least one edge case
- [ ] Commit messages follow the convention above

## Adding a new problem manually

If you prefer to skip the scaffolder, add an entry to `problems.json`:

```json
{
  "id": 42,
  "slug": "trapping-rain-water",
  "title": "Trapping Rain Water",
  "difficulty": "hard",
  "url": "https://leetcode.com/problems/trapping-rain-water/",
  "tags": ["array", "stack", "two-pointers"],
  "solvedAt": "2026-04-21",
  "languages": ["rs", "ts", "php"]
}
```

Then run `pnpm readme` to refresh the root README.

## License

By contributing you agree that your contributions will be licensed under the MIT License.
