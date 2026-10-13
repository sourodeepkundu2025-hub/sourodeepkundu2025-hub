# Public project roadmap

The public profile is the entrance to the work, not a replacement for its evidence. Two runnable reference labs start the showcase. The larger projects will be released from their original user-supplied code, with appropriate collaborator/source boundaries.

| Track | Release direction | Acceptance evidence |
| --- | --- | --- |
| Agentic AI / retrieval | Reproducible agent workbench with adapters, trace viewer, hybrid retrieval and controlled tool access | Synthetic fixtures, ranking/citation/abstention tests, explicit model/backend boundary |
| Quantum circuit optimization | Look-ahead and search-based routing compared to documented baselines | Fixed circuits/topologies, equivalence checks, SWAP/depth resource tables |
| DEQUINT | Multicore interconnect simulation with documented protocols | Topology/link assumptions, entanglement resource accounting, reproducible latency/fidelity studies |
| QVoC | Selective hybrid inference with cost-aware invocation | Patient-disjoint splits, cross-fitting, classical/neural controls, invocation budgets and uncertainty |
| HQFL-QNet | Heterogeneous-client federated research harness | Matched classical controls, seed/config manifests, client/privacy assumptions |
| QML-AURA / AURA-Q | Resource scheduling and processor selection | Feasibility/abstention cases, solver parity, fairness/resource trade-offs |
| Clinical / multimodal ML | Reproducible research on public or properly licensed datasets | Patient/scaffold separation as appropriate, ablations, calibration, uncertainty and limitations |
| Android / dependable software | Independently authored device-state and recovery examples | Synthetic devices, lifecycle/concurrency tests, observable UI recovery |
| Document intelligence | Source-preserving extraction and revision example | Synthetic document corpus, lineage, review copies, structural checks |
| LLM efficiency | Distillation/quantization experiment workbench | Model license, quality/latency/memory comparison, named hardware and benchmark |
| Cryptanalysis / cloud systems | Reproducible academic experiments | Benign synthetic cipher inputs; GA/PSO or workload baselines; convergence/resource reports |
| Photonics / rendering | Simulation examples derived from publishable original code | Explicit numerical assumptions and comparisons; distinguish proposals from completed models |

## Quality bar

Each released project should answer: what question does it address, what did I contribute, what can a visitor run, how do its tests work, what results are reproducible, and what remains uncertain?

No research novelty or performance advantage is claimed by creating a new repository. New hypotheses need experiments and comparison to prior work.

## Maintenance

Edit `content/profile.json`, run `npm run render`, then `npm run check`. Use a branch and Pull Request for published updates. Keep raw private career packages, employer code and credentials outside this public repository.
