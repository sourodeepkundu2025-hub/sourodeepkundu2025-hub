# From familiar foundations to current research questions

This is a bridge from the mathematics I have studied to experiments I can explain and defend. It is not a claim that reading a topic proves implementation expertise.

## 1. Language modelling is still a probability problem

Autoregressive modelling factorizes a sequence as

$$p_\theta(x_{1:T})=\prod_{t=1}^{T}p_\theta(x_t\mid x_{<t}),\qquad \mathcal L=-\sum_t\log p_\theta(x_t\mid x_{<t}).$$

The 2003 neural language model connected learned word representations to next-word prediction. Its authors are Bengio, **Ducharme**, Vincent and Jauvin. Word2Vec later emphasized efficient representation-learning objectives; its embeddings are not a complete autoregressive assistant. Sequence-to-sequence and alignment-based attention preceded the Transformer. [Original neural language model](https://jmlr.org/papers/v3/bengio03a.html), [Word2Vec](https://arxiv.org/abs/1301.3781), [sequence-to-sequence](https://arxiv.org/abs/1409.3215), [alignment attention](https://arxiv.org/abs/1409.0473).

Research bridge: next-token likelihood, downstream task accuracy, tool success and factual correctness are different objectives. A good experiment identifies which one it measures.

## 2. Attention, architecture and the actual memory bottleneck

$$\operatorname{Attention}(Q,K,V)=\operatorname{softmax}(QK^\top/\sqrt{d_k})V.$$

Causal masking prevents access to future positions. Multi-head projections expose different learned subspaces; their interpretation must be tested, not assigned by a diagram. The original Transformer used post-layer normalization around residual sublayers; many later architectures change normalization, activations, positions and attention layouts. Do not treat one 2017 block as the definition of all modern models. [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

Dense prefill attention has quadratic sequence interactions. During autoregressive decoding, cached keys/values avoid recomputing history but grow with history. A simple KV-memory approximation is

$$M_{KV}\approx2LBT H_{KV}d_h b,$$

where layers, batch, cached tokens, KV heads, head width and bytes per element are explicit. GQA changes KV-head count; allocator overhead, quantization metadata and workspaces still matter. FLOP complexity is not measured latency. FlashAttention changes IO behavior while preserving exact attention under its numerical assumptions; the newest hardware-specific kernel is not automatically usable on a free T4. See SYS-01 onward in the [library](PAPER_LIBRARY.md).

Research bridge: measure numerical error, actual backend, synchronization, memory, compilation/warmup and workloads before claiming speed.

## 3. GPT and BERT do not have the same training objective

GPT-style causal decoding and BERT-style masked-language modelling use different information patterns and downstream interfaces. A masked encoder does not become an autoregressive agent just by having attention. Modern tool use adds a policy/runtime layer around model outputs, not a replacement for probabilistic modelling. [GPT training paper](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf), [BERT](https://arxiv.org/abs/1810.04805).

For an interview: derive the objective, draw the mask, then explain why the runtime must validate a proposed tool call even if the model is well trained.

## 4. Scaling is a resource trade-off, not a parameter-count race

GPT-3's 175B parameters and approximately 300B training tokens imply about 1.7 tokens per parameter. That arithmetic is not a universal compute-optimal ratio. Chinchilla studied a different compute-allocation regime and motivated training smaller models on more tokens at a fixed training budget. The often-used dense-training estimate $C\approx6ND$ is a planning approximation, not a serving-cost measurement. [GPT-3](https://arxiv.org/abs/2005.14165), [Chinchilla](https://arxiv.org/abs/2203.15556).

For this programme, do not pretrain a foundation model. Use small checkpoints, matched data/tuning budgets, and adaptation or inference experiments. Open weights also do not mean open training data/recipe. Some 2023 Mistral releases had open weights; “all output weights closed” is not a valid blanket description. [Mistral 7B report](https://arxiv.org/abs/2310.06825).

## 5. Post-training, preference learning and verifiable RL

SFT learns from demonstrated outputs. Preference optimization learns from comparisons. RL with a verifier optimizes a reward rule whose loopholes become part of the problem. A generic constrained objective is

$$\max_\pi\;\mathbb E[r(x,y)]-\beta D_{KL}(\pi\Vert\pi_{ref}).$$

This is not the exact formula of every PPO, DPO or GRPO implementation. Derive each paper's actual objective and normalization before reproducing it. DPO removes a particular explicit reward-model/RL loop under its formulation; it does not eliminate reference-policy/data assumptions. RLVR gains do not by themselves establish faithful reasoning, genuine new capabilities or resistance to reward hacking. [InstructGPT](https://arxiv.org/abs/2203.02155), [DPO](https://arxiv.org/abs/2305.18290), AE012–AE020 in the library.

Free-GPU bridge: a tiny verifiable task, strong SFT baseline, frozen verifier tests, learning curves and a deliberately adversarial reward check. Not a recreation of an industrial-scale reasoning model.

## 6. Test-time computation needs a budget and a stopping rule

More samples, search, critics, tools and longer reasoning traces consume resources. Measure total model calls/tokens and tool costs, not just the chosen path. A useful decision formulation is to maximize expected task value subject to a resource budget; confidence calibration and abstention determine whether that decision is meaningful.

Research bridge: compare always-small, fixed-budget sampling, a simple threshold and a learned/adaptive controller with identical tuning access. If a simpler controller matches it, retain that result. AE015–AE016 provide starting references.

## 7. Agents are stateful software systems

An agent runtime observes state, proposes an action, validates it, calls a tool and updates memory/checkpoints. Tools can time out, apply an action before the reply is lost, return stale data or contain hostile instructions. Exactly-once effects, idempotency and acknowledgements matter as much as prompts.

Research bridge: compare recovery against ordinary progress-preserving step retry, not only against a baseline that gratuitously restarts completed work. Evaluator-private goals, fault schedules and labels cannot be policy inputs. The first project already demonstrates a null effect under this stronger comparison.

## 8. Evaluation, judging and uncertainty are separate problems

A task-state oracle, human annotations, exact-match rules and an LLM judge establish different kinds of evidence. Judge order/verbosity sensitivity is a confound, not an improvement. Use labels independent of the evaluated judge, inspect disagreements and count invalid outputs. Do not turn a search ranking or a human-preference leaderboard into scientific truth.

Report task success, unsafe proposals, refusals/abstentions and costs together. Risk-coverage curves expose systems that appear safe only because they refuse everything. Bootstrap at the independent task/conversation unit, not at every correlated seed or turn. A zero-width interval on identical synthetic policies is not evidence of universal equality. See AE010–AE011 and the first project's limitations.

## 9. Memory and retrieval need a model of time

The question is not only which passage is similar. Which version is current? Was it deleted? Can contradictory evidence coexist? Separate retrieval relevance, quotation provenance and answer entailment. Extra retrieval calls, longer context and more powerful reader models must be charged to matched baselines. A “verified citation” is not a fact-checking guarantee.

## 10. Multimodal and embodied claims need grounding

Image shuffling, text-only controls and frame timestamps help reveal reliance on language priors or stale observations. A frozen small VLM can be an honest starting point. A video generator is not automatically a usable world model, and an offline trajectory study is not robot deployment. Large Cosmos or robotics-training runs do not fit the current free-compute envelope.

## A reusable explanation loop

For every topic: derive one equation; implement one invariant; run one baseline; break one assumption; explain one failure. Keep a 90-second spoken answer and a five-minute whiteboard version. Expertise becomes visible when another person can inspect the reasoning, not when the profile lists every acronym.
