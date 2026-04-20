# leetcode-ts

TypeScript solutions for the [leetcode monorepo](../README.md). Each problem lives in its own folder `src/pXXXX-<slug>/` with the solution and a colocated `*.test.ts` file (Vitest).

## Run

```bash
pnpm install
pnpm --filter leetcode-ts test
pnpm --filter leetcode-ts lint
pnpm --filter leetcode-ts typecheck
```

## Add a new problem

From the repo root:

```bash
pnpm new -- --id 42 --slug "trapping-rain-water" --title "Trapping Rain Water" --difficulty hard --langs ts
```
