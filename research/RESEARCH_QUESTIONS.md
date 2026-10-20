# Three research questions worth trying to falsify

These are **candidate hypotheses**, not established gaps or new methods. The first landscape pass read abstracts and selected sections, not complete nearest-method papers. Before calling anything novel, fully read the nearest work, inspect its exact protocols/limitations and search for counterexamples. Model choices are feasibility proposals, conditional on actual free GPU allocation.

## A. Recovery when the tool outcome is ambiguous

**Question.** After a tool request times out, when should an agent retry, inspect state, roll back or abstain? The hard case is that the operation may already have committed. A successful retry is not useful if it duplicates an effect.

**What the first experiment already ruled out.** Basic checkpoint retention is not differentiated from conventional progress-preserving step retry. The two controllers match in our synthetic harness. Do not rename the same mechanism and call it a contribution.

**Candidate mechanism.** Maintain an explicitly observable belief over `not applied / applied / unknown`, backed by typed tool responses and version/transaction identities. Use a bounded state-inspection decision before an action whose effect is uncertain. Compare this with ordinary transactional/idempotent recovery; well-known distributed-systems mechanisms are nearest baselines, not novel LLM inventions.

**Nearest reading.** [τ²-Bench](https://arxiv.org/abs/2506.07982), [AgentDojo](https://arxiv.org/abs/2406.13352), [Why Do Multi-Agent LLM Systems Fail?](https://arxiv.org/abs/2503.13657) and [Microsoft AgentRx](https://www.microsoft.com/en-us/research/blog/systematic-debugging-for-ai-agents-introducing-the-agentrx-framework/). They motivate interaction, safety and failure diagnosis; no assertion that they omit this candidate is justified yet. Transaction/idempotency literature is an additional required search, currently incomplete.

**Experiment.** First finish an actual small-model contract pilot, then integrate a frozen model policy into the closed-world tool environment. Separate development and test contents. Vary pre-commit loss, post-commit acknowledgement loss, stale reads and invalid model actions. Compare no-retry, strong step retry, transaction-aware deterministic recovery and the proposed controller at the same model/tool budgets. Charge failed calls and every inspection. Fault placement by semantic event and by call index should be separate analyses, since the latter affects different operations on different trajectories.

**Metrics.** Correct acknowledged completion, duplicated effects, invalid proposals reaching the tool, unresolved outcomes, model tokens/calls, tool calls and measured latency. Report success-cost and risk-coverage curves with task-cluster uncertainty, not a single composite score that can hide unsafe actions.

**Ablations.** Remove state inspection; remove uncertainty state; remove output validation only inside the guarded synthetic environment; replace model decisions with a simple rule.

**Kill criterion.** If the conventional transaction-aware rule matches the controller, or extra observations explain the gain, retain a negative result. A model must earn its role over the deterministic baseline. Current status: engineering scaffold and null control only; no actual model recovery result.

## B. Memory that knows when evidence stopped being valid

**Question.** Can a small-model assistant answer from current information after updates, deletions and contradictions without simply refusing every question?

**Candidate mechanism.** Keep evidence identity, version and validity intervals separate from semantic similarity. The router chooses retrieve, refresh or abstain under a measured token/call budget. Start with explicit metadata filtering; an elaborate memory graph must beat that simple approach before it is justified.

**Nearest reading.** [LongMemEval](https://arxiv.org/abs/2410.10813), [From RAG to Memory / HippoRAG 2](https://arxiv.org/abs/2502.14802), [Mem0](https://arxiv.org/abs/2504.19413) and [EpiCache](https://arxiv.org/abs/2509.17396). Distinguish external evidence storage from internal KV state: these are related resource questions, not interchangeable mechanisms. Full-method comparison and a time-aware retrieval literature search remain required.

**Experiment.** Use an owned synthetic event stream first, then a suitably licensed corpus with versioned updates if feasible. Hold out entities and update schedules. Freeze the same reader checkpoint for recent-k, BM25, dense retrieval, timestamp filtering and validity-aware routing. Match retrieval depth, model context and tuning budgets. Evaluate after multiple update/delete cycles rather than only after inserting facts.

**Metrics.** Current-answer accuracy, stale-answer rate, evidence attribution, retrieval recall, abstention coverage, token/tool costs and latency. Test current and historical-time questions separately. A citation match is not sufficient evidence of answer entailment. Deleting an external record does not prove deletion from model weights or every cache.

**Ablations and kill criterion.** Remove timestamps; remove validity handling; keep only a metadata filter; equalize context length. If simple filtering matches the full system, keep the simpler result. If a system wins by abstaining on all difficult questions, reject the claim. This candidate needs a pilot; it is not a discovered novel gap.

## C. Knowing when a visual observation is too old

**Question.** At a fixed frame/token budget, when should a small frozen VLM request a new observation rather than answer from a stale frame?

**Candidate mechanism.** A calibrated refresh policy uses observation age and uncertainty to request another frame or abstain. Start with an owned scene generator and evaluator-only state; do not train a world model or claim robot safety.

**Nearest reading.** [V-JEPA 2](https://arxiv.org/abs/2506.09985), [SmolVLA](https://arxiv.org/abs/2506.01844), [OpenVLA](https://arxiv.org/abs/2406.09246) and [Cosmos](https://arxiv.org/abs/2501.03575). These establish broader visual/physical modelling contexts, not a proof that this refresh policy is new. Active perception and temporal-grounding evaluation are additional mandatory nearest-work searches.

**Experiment.** Render scenes with changes in object positions/attributes. Ask state questions after different delays and change rates. Split by scene template and random seed, keeping ground-truth state inaccessible to the model. Compare last-frame, uniform sampling, fixed-recency refresh, text-only and shuffled-image controls. Use the same available observation stream, frozen backbone, prompt, output cap and total frame/token budget; selected frames may differ because selection is the policy intervention. Tune refresh and abstention thresholds only on development scenes.

**Metrics.** State-answer correctness, stale-grounding errors, useful-answer coverage, frames/tokens consumed and actual latency/VRAM. Include unchanged scenes so asking for fresh frames all the time has a measurable cost. Inspect scene-generator shortcuts, text hints and temporal leakage.

**Kill criterion.** Uniform/recency sampling matches the proposed rule, language-only controls perform the same, or the free GPU cannot support the frozen VLM. In that case retain an evaluation artifact rather than inventing a training result. This is the third priority: it may remain a replication/negative-result study while A or B receives deeper validation.

## The decision gate shared by all three

By the end of the early pilots, select one primary mechanism for a paper-shaped contribution. A credible result needs a precise difference from the strongest related method, licensed data, frozen evaluation, comparable tuning/compute, failure analysis and an independently rerunnable artifact. A new name, diagram, multi-agent team or repository count is not novelty. Venue selection and mentor review come after evidence, not before it.
