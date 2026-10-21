# Free Colab/Kaggle experiment workflow

The user confirmed these two providers are the available GPU resources. Allocation, accelerator type and session limits are not guaranteed. [Colab's official FAQ](https://research.google.com/colaboratory/faq.html), [Kaggle notebooks](https://www.kaggle.com/docs/notebooks).

## Patterns reused from the existing setup

The existing local PolyMind notebooks were inspected for structure, not executed or copied wholesale. Useful patterns are one-time model staging versus repeat startup, reuse of cached model files, explicit runtime checks, authenticated health checks and safe status output. The existing worktree was dirty and remained untouched. Private endpoints, runtime config and credentials are not published.

For this research programme the default is simpler: **run experiments inside the hosted notebook and export bounded result files**. A public ngrok tunnel or new MCP is not required to collect model evidence. Do not use a free runtime as a permanent server, bypass quotas or start a tunnel merely to keep a session alive.

## Notebook execution gate

1. Open the repository notebook in your account, select a GPU if available, and inspect every cell.
2. Record Python/package versions, GPU model/VRAM, model revision, tokenizer, dtype and attention backend. Never infer the accelerator from the requested runtime setting.
3. Install only the listed pinned packages inside that hosted runtime. The local laptop is not modified by opening the notebook.
4. Use a small ungated checkpoint initially; a model is chosen for feasibility, not because it is the latest/best model. Freeze its commit and license. A larger run needs a new resource decision.
5. Start with a handful of cases. Save every prompt/output and invalid response, task/split hash, wall-clock timing and resource metadata. No private career or employer data enters prompts.
6. Save progress after each completed task. This initial pilot intentionally starts a separate run after interruption, preserving earlier receipts rather than resuming across potentially different GPUs. Future resume support must validate source/model/config/dataset/runtime identity. A session restart is not a new independent seed by itself.
7. Export JSONL traces, configuration and a result receipt. Colab Drive/Kaggle output persistence should be chosen explicitly; secret values never appear in those files.

## If a remote interactive endpoint is later necessary

Read the current provider terms first. Bind the actual inference service to loopback, require a randomly generated bearer credential before exposing a tunnel, obtain ngrok secrets from the provider's secret store or a hidden prompt, and test missing-key/invalid-key rejection before sharing any URL. Never log keys, save them in a notebook, expose an unauthenticated model server or assume ngrok's URL is an authorization boundary. Stop the tunnel when the bounded interactive task ends.

Kaggle/Colab MCPs are not created in this checkpoint: the existing notebook route covers the immediate experiment without another credential-bearing integration. Live execution still requires the user's authenticated notebook session. A parsed notebook, mocked adapter or CPU replay is not a completed GPU/model experiment.
