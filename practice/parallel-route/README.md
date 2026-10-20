# Parallel circuit-routing prototype

Personal C++17/OpenMP educational prototype created on 20 October 2026 with Codex assistance. This is an implementation exercise connected to Sourodeep's research interests, not a peer-reviewed novel method or the implementation of a previous paper/internship.

## Provenance

The conceptual baseline is Sourodeep's own [Circuit Route Lab](https://github.com/sourodeepkundu2025-hub/circuit-route-lab), inspected at commit `9a78f9d9bd8f079a801833db8233e03d58ce838d`, especially `src/lab.mjs` and `PROVENANCE.md`. That existing JavaScript project uses a greedy BFS route and records SWAP mappings. No third-party repository implementation was copied or rebranded.

## New implementation

- C++ graph traversal with predecessor-based BFS and explicit inverse logical/physical permutations.
- Two routing-direction candidates for each two-qubit gate, evaluated in isolated OpenMP iterations.
- A bounded look-ahead distance heuristic and deterministic tie breaking.
- Validated input shape/ranges in the parser, comments and line-number error messages.
- CSV SWAP/gate trace and a serial candidate-evaluation option.

The code was compiled successfully with WSL g++ 13.3.0 using C++17/OpenMP and warning flags; compiler diagnostics were empty. See BUILD_RECEIPT.json. Runtime correctness, speed, scaling and comparison against the JavaScript baseline remain unevaluated until separate verification is requested. Input checks above describe implemented code paths, not passed tests. No automated tests were added or run.

## Build and use

```sh
g++ -std=c++17 -O2 -fopenmp -Wall -Wextra -Wpedantic main.cpp -o parallel-route
./parallel-route --input gates.txt --grid 4 --lookahead 4 --threads 2
./parallel-route --input gates.txt --grid 4 --lookahead 0 --serial
```

`gates.txt` contains zero-based logical two-qubit endpoints, one pair per line. Blank lines and trailing `#` comments are allowed. `--help` documents accepted option ranges.

## Limits

Only square unblocked grids and abstract two-qubit gates are represented. There is no gate-set semantics simulator, calibrated hardware cost, quantum noise, CUDA GPU implementation, PTX output, SSA analysis or register allocator. The heuristic is not guaranteed to beat greedy routing. Two candidate tasks can incur more OpenMP overhead than useful parallel work; no speedup or scaling claim is made. Exception behavior under resource exhaustion inside an OpenMP region has not been hardened. Benchmarking, runtime validation and robust failure handling remain future work.

## Related learning

[OpenMP Code Execution Demo](https://www.youtube.com/watch?v=3gwV6iBF6E0) is a separate learning demonstration by Sourodeep Kundu covering parallel regions, loop scheduling, reductions and synchronization. It is not a benchmark of this prototype.
