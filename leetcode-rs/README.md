# leetcode-rs

Rust solutions for the [leetcode monorepo](../README.md). Each problem lives in its own module under `src/`, with tests colocated in a `#[cfg(test)] mod tests` block.

## Run

```bash
cargo test
cargo clippy --all-targets -- -D warnings
cargo fmt --check
```

## Add a new problem

From the repo root:

```bash
pnpm new -- --id 42 --slug "trapping-rain-water" --title "Trapping Rain Water" --difficulty hard --langs rs
```

This creates `src/p0042_trapping_rain_water.rs` with a failing test and wires it into `src/lib.rs`.
