# leetcode-php

PHP 8.3+ solutions for the [leetcode monorepo](../README.md). Each problem is a single `final` class in `src/` (PSR-4 namespace `JH3ady\LeetCode`) with a PHPUnit test in `tests/`.

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
