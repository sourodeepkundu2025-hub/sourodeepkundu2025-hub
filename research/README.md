# Building an AI research practice

20 October 2026–19 April 2027 · two hours daily · free Colab/Kaggle GPUs.

My working question is: **How do language-model systems stay reliable and resource-aware when their tools, memory and evaluators are imperfect?**

This is a six-month research and engineering plan, not a promise of publication, admission or GitHub popularity. Quantum work remains part of my earlier record but is not the active focus of this programme.

## Three connected research directions

1. **Failure-aware agents and trustworthy evaluation.** Start with explicit state, strong retry baselines, failure attribution, judge perturbations and calibrated abstention. AgentRx, τ²-Bench and AgentDojo are important neighbours—not evidence that this project is differentiated. [Microsoft AgentRx](https://www.microsoft.com/en-us/research/blog/systematic-debugging-for-ai-agents-introducing-the-agentrx-framework/).
2. **Temporal memory and efficient inference.** Study current versus superseded evidence, retrieval quality and resource budgets. Then measure speculation, KV allocation and quantization on the exact allocated GPU. Blackwell-specific or multi-A800 results are reading targets, not free-T4 reproduction commitments. [Paper library](PAPER_LIBRARY.md).
3. **Grounded observations under stale visual evidence.** Evaluate a small frozen vision-language model on controlled scenes before attempting expensive video/world-model work. This is a later candidate direction, not robot hardware or a new foundation model. [NVIDIA Cosmos research](https://research.nvidia.com/labs/cosmos-lab/).

One mechanism advances at a time. The strongest two directions get deeper validation; the third can remain a careful negative-result or replication artifact if free compute/time do not support a defensible contribution.

## Scope and time budget

The planning envelope is about 364 hours: 192 building/testing, 78 paper reading, 24 teach-back, 26 research writing, 20 operating model experiments, 24 buffer. GPU wall time is not the same as human work time; free allocation is not guaranteed. These are planning limits, not measured usage or paid credits.

Each normal two-hour session: 25 minutes reading/derivation, 70 minutes implementation or experiment work, 15 minutes tests/results, 10 minutes spoken explanation and the lab log. A weekly review can replace a build session. Do not run multiple new projects at once.

[24 project milestones](PROJECTS_24.md) · [150-paper reading library](PAPER_LIBRARY.md) · [Candidate questions and falsification plans](RESEARCH_QUESTIONS.md) · [Foundations to frontier](FOUNDATIONS_TO_FRONTIER.md) · [Lab fit and applications](LAB_FIT.md) · [GPU workflow](GPU_WORKFLOW.md).

## First four weeks

- Week 1: synthetic failure harness, strong baselines, evaluator tests and null findings.
- Week 2: one actual small-model pilot in Colab/Kaggle with frozen model/prompt and complete failure logs.
- Week 3: matched-budget recovery and checkpoint ablations; discard an effect if ordinary retry explains it.
- Week 4: order/verbosity-controlled judge evaluation with labels independent of the tested judge.

The first scaffold already found a useful null: checkpoint recovery equals a conventional progress-preserving step-retry baseline on its synthetic task set. The weaker restart baseline made the effect look impressive. We retain both the exploratory result and its correction; this is not a research improvement or LLM benchmark win.

## What every project must leave behind

A question; exact nearest-method references; a public/appropriately licensed dataset and split; a strong baseline; a frozen experiment; all seeds and tuning costs; an ablation; raw traces; a result table with uncertainty; failure analysis; a runnable demo; and a five-minute explanation. A new repository, agent graph or prompt wrapper alone is not a contribution.

Use three evidence levels in every release: engineering tests; actual model experiments; and independently reproduced findings. Do not transfer success from one level to the next. Stars can help discovery, but evidence of research ability comes from clear questions, contributions, rigorous artifacts and people who know the work.

## Learning and interview practice

For each paper answer: what problem does it formalize; which assumption makes its method work; what is its closest baseline; which experiment could disprove it; what is your implementation changing? Give a 90-second version, a five-minute whiteboard explanation, then a 20-minute technical walkthrough.

The initial library is deliberately honest about coverage. Metadata discovery, abstract reading, selected-section inspection, full reading and reproduction are separate states. Full nearest-method reads must precede any paper-contribution claim. No research paper or university application is submitted automatically by this plan.
