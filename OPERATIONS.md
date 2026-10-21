# Maintain this showcase from any machine

The root README is the GitHub account landing page. It is not the paused portfolio website and needs no Pages deployment. A reviewed merge updates the profile; the project demos have their own repositories and deployments.

## What to edit

| Source | Owns |
| --- | --- |
| `content/profile.json` | Introduction, current context, selected experience, capabilities, project links and canonical publication titles |
| `content/publication-metadata.json` | Saved Crossref title/author/publisher/date evidence; not results or credential verification |
| `content/agent-result.json` | Pinned public synthetic experiment values and raw-source fingerprint |
| `scripts/render-profile.mjs` | Page structure, career overview and bibliography generation |
| `scripts/render-assets.mjs` | Editable original SVG artwork and result/pipeline figures |
| `scripts/render-visual-sources.mjs` | Figure source ledger and asset byte identities |
| `research/` and `ROADMAP.md` | Supporting research library, notes and plans; deliberately not linked or promoted on the profile homepage |

README, CAREER_RECORD, PUBLICATIONS, VISUAL_SOURCES and three SVGs are generated. Do not change them alone and leave the source stale. PNG previews are exact copies of owned public demo captures; see [visual sources](VISUAL_SOURCES.md).

## Route A — any computer with Git and Node.js 22+

No npm dependency installation, personal path or API key is needed for normal rendering/testing.

```sh
git clone https://github.com/sourodeepkundu2025-hub/sourodeepkundu2025-hub.git
cd sourodeepkundu2025-hub
git switch -c sourodeep/profile-update
# Edit the source data or generator.
npm run render
npm run check
git diff --check
git add content scripts test README.md CAREER_RECORD.md PUBLICATIONS.md VISUAL_SOURCES.md assets
git commit -m "Update research showcase"
git push -u origin sourodeep/profile-update
```

Open a PR. Inspect the exact-head Profile consistency check and rendered README before merging. The repository forces LF text endings so generated files and source hashes remain portable; PNG files are binary.

## Route B — browser-only source editing

1. In GitHub, create a feature branch named `sourodeep/your-change` from current `main`.
2. Edit `content/profile.json` or the relevant source on that branch. Commit the edit to the feature branch, not main.
3. Open **Actions → Refresh generated profile on a feature branch → Run workflow**. Select that same `sourodeep/` branch. This manual workflow regenerates and tests the files, then commits only the allowlisted generated outputs back to that feature branch. It also accepts existing `codex/` branches for continued work, refuses other refs and tags, and never merges a PR.
4. Open a PR after generation. If a PR already exists, inspect the new head and run **Profile consistency → Run workflow** on that feature branch if new checks did not appear; approve workflow runs if GitHub requests it.
5. Review the page, data, visual provenance and green checks at the final head. Merge only after that review.

GitHub restricts recursive workflow triggering for commits made with its built-in token. A successful refresh is not proof that a separate check ran on the new commit; use the manual consistency run when necessary. [Official trigger behavior](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).

The refresh workflow uses the repository's short-lived Actions token, not your stored PAT. Only this manually started workflow has `contents: write`; ordinary push/PR checks remain read-only. No new secret, MCP, scheduled job or auto-merge is required. A branch rule that disallows bot pushes should be respected: use Route A rather than weakening protection.

## Optional public-source refreshes

```sh
npm run audit:publications
npm run audit:lab
npm run render
npm run check
```

These commands make explicit public HTTPS requests; normal CI does not. The publication refresh refuses title or author mismatches. Review new data instead of assuming metadata validates the science. The lab snapshot pins a known commit and only accepts the synthetic/zero-model-call evidence class. A real model experiment requires a new reviewed snapshot/protocol, not relabelling this one.

On managed networks, use the approved system trust store or CA configuration. For Node versions supporting it, `node --use-system-ca scripts/sync-publications.mjs` can use system-installed certificates. Never disable TLS verification to make a metadata refresh pass.

## Changing the actual projects

This repository showcases work; it does not contain the complete source of the three independent labs. Open the target lab repository for functional changes. Circuit Route and Evidence Gate deploy static demos through their own PR/check/Pages workflows. Agent Reliability has Python CI; its hosted GPU notebook still requires a reviewed commit and your authenticated Colab/Kaggle session. No model execution follows from editing the profile.

## Working with a coding agent

Share this repository or a PR URL plus the requested outcome. `AGENTS.md`, the data, generators, tests, source ledger and workflows make the profile self-contained. Supply approved new source separately for new facts or original research code; raw CV packages, private proofs, employer data/code and credentials are not in this repository.

The existing research material may remain in supporting repository files, but it must not be shown or linked on the root profile README. That includes the study schedule, reading queue and prospective-project discussion. Supporting files in this public repository remain discoverable and are not confidential. Preserve their reading-stage/planned-work labels; add work to the homepage when an inspectable artifact or result exists and its release is approved. Do not import other private workbench or career material under this permission.

Preserve manuscript/simulation/prototype status; do not turn a selection into an attended role or a framework name into a performance claim. Use a PR to roll back a change. Never reset broad directories or overwrite historical experiment evidence. Authenticate each machine with its credential manager; no PAT belongs in source or browser-editable content.
