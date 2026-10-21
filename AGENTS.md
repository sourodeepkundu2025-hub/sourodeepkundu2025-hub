# Profile maintenance

Use `content/profile.json` as the shared public record for the landing page and career overview. Read `OPERATIONS.md` before a change. `content/publication-metadata.json` and `content/agent-result.json` are saved public-source snapshots, not new performance/credential claims. Edit sources, run `npm run render` and `npm run check`, and propose a PR.

`README.md`, `CAREER_RECORD.md`, `PUBLICATIONS.md`, `VISUAL_SOURCES.md` and three SVG assets are generated. Preserve their source relationships and exact experiment class. Optional metadata refresh scripts access public HTTPS only; ordinary rendering/CI remain offline. No dependency installation is required for Node.js 22+ checks. Use `sourodeep/<descriptive-task-name>` for new personal feature branches. The browser-only refresh workflow accepts those branches and existing `codex/` branches; it must never push main/master or auto-merge.

Preserve the distinction between public reference implementations, original research, professional experience, ongoing practice and selections. Do not import raw private career packages, claim quantum advantage from circuit runs, invent project metrics or copy employer code.

The user permits the existing research library, notes and plans in supporting repository files (`research/` and `ROADMAP.md`), but does not want them shown on the GitHub homepage. Keep them out of the root `README.md` and its generated sections, links, images and disclosures. These supporting files are publicly accessible, not confidential; preserve their staged-reading and planned-work labels. Do not promote them onto the homepage or silently upgrade plans into results. Raw private career packages, employer material and credentials remain excluded.

The paused portfolio is a separate project; this repository manages the GitHub account profile.
