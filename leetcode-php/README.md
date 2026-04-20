# leetcode-php

PHP 8.5+ solutions for the [leetcode monorepo](../README.md). Each problem lives in its own folder under `src/PXXXX<Slug>/` with a `Solution.php` and a colocated `SolutionTest.php` (PSR-4 namespace `JH3ady\LeetCode\PXXXX<Slug>`).

## Run

```bash
composer install
composer test
composer lint    # phpstan + php-cs-fixer --dry-run
composer format  # php-cs-fixer fix
```

## Add a new problem

From the repo root:

```bash
pnpm new -- --id 42 --slug "trapping-rain-water" --title "Trapping Rain Water" --difficulty hard --langs php
```
