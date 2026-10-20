import {readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const d=JSON.parse(await readFile(path.join(root,"content/profile.json"),"utf8"));
const repo=name=>"https://github.com/"+d.username+"/"+name;
const readme=`<!-- Generated from content/profile.json and scripts/render-profile.mjs. -->
# Hey, I'm Sourodeep 👋

Usually somewhere between a paper, a profiler and a stubborn failing test.

I build software and study AI systems. I'm especially interested in what happens **after the demo works**: a tool times out, memory fills up, evidence goes stale, or an evaluator rewards the wrong thing.

[LinkedIn](${d.links.linkedin}) · [Google Scholar](${d.links.scholar}) · [Email](${d.links.email}) · [Research & career record](CAREER_RECORD.md)

---

### What I'm building toward

A six-month, two-hours-a-day research practice in **reliable agents, LLM evaluation and efficient inference**. Reading carefully, implementing the mechanism, and keeping the experiments that *don't* work as well as those that do.

- **Building now:** an agent-reliability harness with controlled tool faults, explicit budgets and strong retry baselines.
- **Next:** a small-model Colab/Kaggle pilot, then judge-bias and temporal-memory experiments.
- **Writing as I go:** [24 project milestones](research/PROJECTS_24.md), a [150-paper reading library](research/PAPER_LIBRARY.md), and [technical notes](research/FOUNDATIONS_TO_FRONTIER.md).

The library is a reading plan, not a claim of 150 completed reviews. [See the programme and current evidence](research/README.md).

### Things you can actually inspect

| Work | The question behind it | Open it |
| --- | --- | --- |
| **Agent Reliability Lab** | Does checkpoint recovery beat an ordinary, state-preserving retry? The first synthetic comparison says **no**. | [Code & experiment record](${repo("agent-reliability-lab")}) |
| **Evidence Gate Lab** | Can a system show its sources, respect a word budget and abstain? | [Code](${repo("evidence-gate-lab")}) · [Try it](https://${d.username}.github.io/evidence-gate-lab/) |
| **Digital Art Commission** | How do records, APIs and business rules fit together? | [Repository](${repo("digital-art-commission")}) |

The new reliability project is research scaffolding on synthetic tasks—not a measured LLM improvement. The larger research ideas need real model runs, stronger comparisons and independent review.

### What I work with

<picture><source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=python,pytorch,tensorflow,cpp,java,docker,git,linux&amp;theme=dark&amp;perline=8"><img src="https://skillicons.dev/icons?i=python,pytorch,tensorflow,cpp,java,docker,git,linux&amp;theme=light&amp;perline=8" alt="Python, PyTorch, TensorFlow, C++, Java, Docker, Git and Linux" height="48"></picture>

**AI & ML:** PyTorch, model evaluation, retrieval, adaptation and experiment design.<br>
**Systems:** Python, Java/Android, TypeScript, APIs, CI/CD and observable recovery.<br>
**Current study:** agent failure analysis, judge reliability, post-training, KV caches and resource-aware inference. Free Colab/Kaggle for model experiments; no oversized training-run claims.

### A little context

${d.education[0]}. My professional context is ${d.current}. Public work here uses owned or appropriately licensed material, not employer code or private datasets.

Earlier work spans software engineering, clinical ML and quantum research. It stays in the [career record](CAREER_RECORD.md); **AI/LLM systems are the active focus here**. There is also an [interactive circuit lab](https://${d.username}.github.io/circuit-route-lab/) for the earlier work.

### If you're working on a similar question

I'd like to compare notes on agent reliability, evaluation and efficient small-model systems. A useful failure case or a strong baseline is always welcome. [Say hello](${d.links.email}).

<sub>Learning in public · experiments over headlines · updated ${d.updated}</sub>
`;
const career=`# Research and career overview

${d.name} · ${d.headline}

${d.education.map(e=>"- "+e).join("\n")}

## Professional context

${d.current}. Professional summaries describe transferable work; employer source and internal artifacts are not published in this profile repository.

## Research

${d.research.map(r=>`### ${r.name}\n\n${r.detail}\n\nStatus: ${r.status}.\n`).join("\n")}

## Publications

${d.publications.map(p=>`- **${p.title}**. ${p.venue}. [DOI](https://doi.org/${p.doi}).`).join("\n")}

## Ongoing work

${d.ongoing}

## Record maintenance

${d.sourceNote}

This public summary is generated from \`content/profile.json\`. The research programme is a separate forward-looking plan, not new credentials, results or affiliations.
`;
for(const [name,body] of [["README.md",readme],["CAREER_RECORD.md",career]]){
 const target=path.join(root,name);
 if(process.argv.includes("--check")){if(await readFile(target,"utf8")!==body)throw new Error(name+" drifted from its generator");}
 else await writeFile(target,body);
}
console.log(process.argv.includes("--check")?"Profile generation check passed.":"Rendered profile and career record.");
