# Maintain this GitHub profile from any machine

This public repository has the same name as the GitHub account. Its root README is the account profile, not a separate portfolio website.

## Edit the source of truth

Requirements: Git, Node.js 22+ and your own authorized GitHub login. No dependency installation or API key is needed for profile generation.

```sh
git clone https://github.com/sourodeepkundu2025-hub/sourodeepkundu2025-hub.git
cd sourodeepkundu2025-hub
git switch -c codex/profile-update
```

Edit `content/profile.json`, not the generated README or career record. The renderer also holds the shared page structure. After editing:

```sh
npm run render
npm run check
git diff --check
git add content/profile.json scripts/render-profile.mjs README.md CAREER_RECORD.md
git commit -m "Update profile and career record"
git push -u origin codex/profile-update
```

Open a Pull Request and review the Profile consistency CI check and the rendered README. Merge the PR only when the check passes and the wording is correct. The GitHub profile updates automatically after merge; this repository does not need a Pages deployment.

You can also edit directly through GitHub's web editor and propose a branch/PR. If changing JSON in the web editor, regenerate the derived files in a checkout or coding-agent session before merging; CI detects stale derived files.

## Project demos

The Circuit Route Lab and Evidence Gate Lab are separate repositories. Their PRs run correctness tests. After an approved merge to `main`, their GitHub Actions workflows build a selected static site and publish it to GitHub Pages. Review the deployed behavior as well as green CI.

## Working with a coding agent

Share this repository or a PR URL and the requested change. `AGENTS.md`, the data file, generator and workflows provide the portable working context. Source CV/handoff packages and employer implementations are not in this public repository; supply approved additional source separately when a new factual or project-code update requires it.

Never commit access tokens, private proofs, employer code or patient/customer data. Authenticate each machine through its credential manager. Multiple accounts may be selected per command/session without putting credentials into the source tree.
