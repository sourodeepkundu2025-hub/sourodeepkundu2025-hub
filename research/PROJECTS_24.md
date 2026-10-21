# 24 sequential project milestones

20 October 2026–19 April 2027 · 2 hours/day · free Colab/Kaggle only. These are 24 code/experiment milestones consolidated into a few maintained systems, not 24 independent publication-grade inventions. Weeks 25–26 are buffer and review. Each week reserves 8 hours for implementation plus reading, experiment operation, explanation and writing.

## P01 · Week 1: Agent failure replay bench

Question: What fails, and does the evaluator expose it?

Baseline: No retry, restart retry, conventional step retry.

Deliverable: Versioned synthetic tasks, failure taxonomy, JSONL traces and tested evaluator.

Pass gate: Oracle hidden from policies; failed calls charged; strong baseline included.

## P02 · Week 2: Real small-model tool policy

Question: Can a free-GPU open model obey the same action contract?

Baseline: Deterministic policy and raw model output.

Deliverable: Colab/Kaggle notebook, frozen checkpoint/prompt, schema failures and run receipts.

Pass gate: One actual held-out model run; malformed proposals retained; no replay-as-LLM claim.

## P03 · Week 3: Fault and checkpoint ablations

Question: Does any gain survive ordinary retry and matched budgets?

Baseline: State-retaining step retry.

Deliverable: Paired fault matrix and ablation report.

Pass gate: Null results retained and all compared policies share total budgets.

## P04 · Week 4: Judge order and verbosity audit

Question: How often does the judge change its answer when presentation changes?

Baseline: Original/swapped order, length-controlled pairs.

Deliverable: Judge perturbation harness and agreement/calibration plots.

Pass gate: No answer labels derived from the tested judge; held-out annotated cases.

## P05 · Week 5: Selective prediction and abstention

Question: Can uncertainty reduce wrong actions without refusing everything?

Baseline: Always act, fixed abstention threshold.

Deliverable: Risk-coverage and cost-success curves.

Pass gate: Thresholds tuned only on development cases; task-cluster intervals.

## P06 · Week 6: Benchmark leakage and reward audit

Question: Can a policy score without doing the intended task?

Baseline: Simple exploit probes versus task-state oracle.

Deliverable: Evaluator adversarial tests and dataset card.

Pass gate: Synthetic/owned targets only; no benchmark exploit deployed externally.

## P07 · Week 7: Retrieval baseline workbench

Question: Where do lexical and dense retrieval differ?

Baseline: BM25/TF-IDF, frozen dense embeddings, matched top-k.

Deliverable: Licensed corpus/split manifest and retrieval metrics.

Pass gate: Retrieval relevance is distinct from answer entailment; no test tuning.

## P08 · Week 8: Context position stress test

Question: Does evidence position change answers at fixed context length?

Baseline: Short oracle passage, uniform placement, retrieval.

Deliverable: Position/length sweeps with identical questions.

Pass gate: Actual context supported by checkpoint; no million-token claim from marketing.

## P09 · Week 9: Versioned memory under updates

Question: Will the system distinguish current evidence from superseded facts?

Baseline: Recent-k, dense retrieval, explicit timestamp filter.

Deliverable: Update/delete/contradiction task generator and memory traces.

Pass gate: No oracle fields exposed; deletion claims limited to tested storage layers.

## P10 · Week 10: Compute-aware routing

Question: When should the system retrieve, call a larger model, or abstain?

Baseline: Always-small, always-large where feasible, simple threshold.

Deliverable: Budget sweep and router ablations.

Pass gate: Charge every branch/call, match tuning budget, report coverage.

## P11 · Week 11: Speculative decoding correctness

Question: Which draft lengths help after draft overhead is included?

Baseline: Same target autoregressive decoding.

Deliverable: Tiny numerical reference then compatible small-model pilot.

Pass gate: Greedy equality versus stochastic distribution claims separated.

## P12 · Week 12: KV-cache allocation and memory map

Question: Where does fragmentation or eviction dominate?

Baseline: Contiguous and blocked allocation.

Deliverable: Allocator tests, synthetic workload and conditional GPU receipt.

Pass gate: Simulated byte accounting not called measured latency or VRAM.

## P13 · Week 13: Attention kernel measurement

Question: Is the path compute-bound or memory-bound on the allocated GPU?

Baseline: Reference attention and supported PyTorch SDPA backend.

Deliverable: Numerical tests and synchronized benchmark traces.

Pass gate: Record backend/GPU; Blackwell-only methods remain reading-only on T4/P100.

## P14 · Week 14: Quantization quality-resource frontier

Question: What is lost when a checkpoint uses less memory?

Baseline: Same model unquantized where it fits.

Deliverable: Quality, peak-memory and latency comparison.

Pass gate: Same tokenizer/tasks; unavailable baseline is explicit, not fabricated.

## P15 · Week 15: Small-model adaptation

Question: Does a small LoRA adapter beat a good prompt or retrieval baseline?

Baseline: Prompt-only, retrieval, small SFT.

Deliverable: Short resumable training run and adapter card.

Pass gate: Dataset/model licenses recorded; no full model pretraining claim.

## P16 · Week 16: Verifiable RL learning dynamics

Question: What changes under reward optimization on a narrow verifiable task?

Baseline: SFT and simple REINFORCE on a tiny task.

Deliverable: Reward/accuracy/length curves and exact verifier tests.

Pass gate: No claim of reproducing full DeepSeek-R1; no judge-based reward leakage.

## P17 · Week 17: Preference learning stress test

Question: Does preference optimization improve anything beyond length/style?

Baseline: SFT, length-controlled evaluation, tiny DPO.

Deliverable: Preference data audit and held-out comparison.

Pass gate: Independent evaluation and reference-policy costs included.

## P18 · Week 18: Representation and causal probe

Question: Is the observed feature causal or just correlated with behavior?

Baseline: Random/control probes and intervention-free prediction.

Deliverable: Small-model activation/probe experiment.

Pass gate: Probe accuracy alone is not a causal explanation or faithful reasoning.

## P19 · Week 19: Small VLM grounding

Question: Does the model use the image rather than language priors?

Baseline: Text-only, image-shuffled, frozen small VLM.

Deliverable: Grounded scene tests and visual perturbation report.

Pass gate: Controlled rendering, unseen scene seeds, same text/frame budget.

## P20 · Week 20: Stale video observation benchmark

Question: When does an old observation become unsafe to use?

Baseline: Last-frame, uniform frames, fixed recency refresh.

Deliverable: Temporal scene generator and timestamp-aware evaluation.

Pass gate: Simulator state is evaluator-only; no world-model training claim.

## P21 · Week 21: Offline embodied decision analysis

Question: Which failures follow from stale observations versus action policy?

Baseline: Frozen trajectories and simple state estimator.

Deliverable: Licensed offline trajectory subset or owned simulator study.

Pass gate: No live robot, simulator execution, or real-world safety claim unless actually run.

## P22 · Week 22: Hugging Face research artifact

Question: Can another person reproduce and inspect the work?

Baseline: Clean environment replay.

Deliverable: Space source, dataset/adapter cards where justified, bounded demo.

Pass gate: User-owned account/auth required to upload; no secrets or fabricated model release.

## P23 · Week 23: Frozen flagship replication

Question: Does the chosen result survive held-out tasks and another seed/session?

Baseline: Strongest matched conventional method.

Deliverable: Preregistered final matrix, raw runs, paired intervals and negative results.

Pass gate: Choose one primary contribution; no post-hoc hypothesis switch.

## P24 · Week 24: Paper and research talk

Question: Can the claim be stated, defended and rerun?

Baseline: Reviewer-style claim/evidence audit.

Deliverable: Paper draft, artifact release, five-minute talk and research statement.

Pass gate: Venue-specific checklist and mentor review before any submission.
