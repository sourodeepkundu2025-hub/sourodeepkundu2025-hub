# Profile maintenance

Use `content/profile.json` as the shared public record for the landing page and career overview. Read `OPERATIONS.md` before a change. `content/publication-metadata.json` and `content/agent-result.json` are saved public-source snapshots, not new performance/credential claims. Edit sources, run `npm run render` and `npm run check`, and propose a PR.

`README.md`, `CAREER_RECORD.md`, `PUBLICATIONS.md`, `VISUAL_SOURCES.md` and three SVG assets are generated. Preserve their source relationships and exact experiment class. Optional metadata refresh scripts access public HTTPS only; ordinary rendering/CI remain offline. No dependency installation is required for Node.js 22+ checks. The browser-only refresh workflow may commit generated files only to a manually selected `codex/` branch; it must never push main/master or auto-merge.

Preserve the distinction between public reference implementations, original research, professional experience, ongoing practice and selections. Do not import raw private career packages, claim quantum advantage from circuit runs, invent project metrics or copy employer code.

The paused portfolio is a separate project; this repository manages the GitHub account profile.
