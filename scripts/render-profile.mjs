import {readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read=async file=>JSON.parse(await readFile(path.join(root,file),"utf8"));
const d=await read("content/profile.json"),bibliography=await read("content/publication-metadata.json"),experiment=await read("content/agent-result.json");
const repo=name=>`https://github.com/${d.username}/${name}`;
const demo=name=>`https://${d.username}.github.io/${name}/`;
const publication=doi=>d.publications.find(p=>p.doi===doi);
const year=doi=>bibliography.publications.find(p=>p.doi===doi).published[0];
const selected=d.showcase.selectedPublicationDois.map(publication);
const strong=experiment.summary["step-retry"],checkpoint=experiment.summary["checkpoint-budget"];
const percent=value=>(100*value).toFixed(1)+"%";
const workRows=d.existingProjects.map(p=>`| [${p.name}](${repo(p.repo)}) | ${p.detail} |`).join("\n");
const experienceRows=items=>items.map(e=>`| ${e.when} | **${e.where}** — ${e.role} | ${e.work} |`).join("\n");
const readme=`<!-- Generated from content/profile.json, checked metadata and scripts/render-profile.mjs. -->
# Hey, I'm Sourodeep 👋

![${d.showcase.tagline} AI systems, machine learning and dependable software.](assets/showcase-header.svg)

**${d.showcase.focus}**

${d.showcase.voice}

My background connects machine-learning research, constrained computation and healthcare software engineering. I am pursuing an **M.Tech. in CSE at VIT Vellore**, alongside my work as an **SDE Apprentice in AI, Healthcare & Android at Philips**. My published work spans learning models and circuit transformation; my current research direction is **reliable agents, trustworthy evaluation and efficient LLM systems**.

I enjoy moving between the mathematics and the implementation: understanding an objective, building the mechanism, finding a stronger baseline, and tracing what broke. This page connects that work to code you can inspect, experiments with stated limits, and the research record behind it.

[LinkedIn](${d.links.linkedin}) · [Google Scholar](${d.links.scholar}) · [ResearchGate](${d.links.researchgate}) · [Email](${d.links.email})

[Public labs](#public-engineering-labs) · [Published research](#selected-published-research) · [Research in progress](#research-in-progress) · [Experience](#selected-experience) · [Capabilities](#capabilities-with-an-evidence-trail)

## Public engineering labs

These are owned, runnable reference implementations. They demonstrate specific mechanisms; they do not stand in for private professional code or reproduce earlier research papers by association.

### 01 / Agent Reliability Lab

**Question:** what should a stateful workflow do when a tool fails—or commits an action but loses the acknowledgement?

The lab implements an exactly-once synthetic ledger, strict action/observation contracts, typed fault traces, idempotent replay, call budgets and paired task-level analysis. Failed requests are charged. The evaluator's state and fault schedule stay outside the controller interface.

[![Actual synthetic recovery results; step retry and checkpoint both achieve ${percent(strong.task_success)} success, with zero model calls.](assets/agent-results.svg)](${repo("agent-reliability-lab")}/blob/main/docs/AMENDMENT.md)

**Evidence:** the content-disjoint amendment has 40 tasks × five seeds × four controllers. Strong step retry and checkpoint recovery both reach **${percent(strong.task_success)} success**, with **${strong.tool_calls_mean} mean tool calls** and zero paired advantage. The weaker restart comparison and the subsequent correction are both retained. This is a useful baseline/control finding, **not a novel checkpoint method or an LLM result**.

[Source & run instructions](${repo("agent-reliability-lab")}) · [Frozen results](${repo("agent-reliability-lab")}/tree/${experiment.commit}/artifacts/amendment-content-disjoint-audit) · [CI](${repo("agent-reliability-lab")}/actions)

### 02 / Evidence Gate Lab

**Question:** can a retrieval system show what supports its output, respect a resource limit, and explicitly say when it cannot answer?

[![Implemented Evidence Gate pipeline: rank public passages, fit whole passages to a word budget, and check quotations. Authorized extractive reads or explicit abstention; no LLM.](assets/evidence-pipeline.svg)](${demo("evidence-gate-lab")})

The shared JavaScript core powers a browser instrument, CLI and regression tests. It validates source identities, excludes private-labelled fixtures, ranks by lexical coverage, selects complete passages and checks normalized quotations. Reduce the word budget, ask an unsupported question or request a write: the decision trace explains the result.

**Boundary:** invented documents and deterministic extraction, not semantic RAG, model reasoning or a production authorization boundary. Quote provenance does not establish truth or entailment.

[Try the interactive demo](${demo("evidence-gate-lab")}) · [Code & tests](${repo("evidence-gate-lab")}) · [Actual browser preview](assets/evidence-demo.png)

### 03 / Circuit Route Lab

**Question:** how does limited connectivity change a circuit—and what does ideal quantum teleportation actually require?

[![Actual Circuit Route Lab browser view, with mesh routing, logical/physical mapping and a separate ideal teleportation panel.](assets/circuit-demo.png)](${demo("circuit-route-lab")})

Play a routing sequence, step through SWAP events and inspect the updated logical-to-physical mapping. The separate three-qubit statevector panel exposes measurement branches and conditional corrections. It connects earlier architecture research to an inspectable educational implementation.

**Boundary:** greedy routing is not globally optimal; ideal simulated fidelity is not a hardware result. The routing and teleportation panels do not claim to implement a physical quantum interconnect.

[Try the interactive demo](${demo("circuit-route-lab")}) · [Code, tests & assumptions](${repo("circuit-route-lab")})

### More application work

| Repository | What you can inspect |
| --- | --- |
${workRows}

These existing application repositories remain separate from the new reference labs. Their source is linked without importing research results, employer implementations or unmeasured performance claims.

## Selected published research

My publication record includes learning-model studies as well as earlier work on quantum-circuit connectivity and synthesis. Selected DOI-linked work:

${selected.map(p=>`- **[${p.title}](https://doi.org/${p.doi})**<br>
  ${p.venue}. Registry publication year: ${year(p.doi)}. ${bibliography.publications.find(m=>m.doi===p.doi).authors[0]===d.name?"First-listed author.":"Co-author."}`).join("\n\n")}

[Complete eight-work bibliography and co-author lists](PUBLICATIONS.md) · [Google Scholar](${d.links.scholar})

Bibliographic titles and author identities were checked against Crossref. Proceedings/event years and publication years are kept distinct; this metadata check is not a reproduction or performance audit.

## Research in progress

Alongside the published work, these research threads are at manuscript or simulation stage—not additional published papers or public clinical systems.

| Thread | Question / method focus | Current evidence class |
| --- | --- | --- |
${d.research.map(r=>`| **${r.name}** | ${r.detail} | ${r.status} |`).join("\n")}

The public labs above are independent reference work, not the original implementations of these manuscripts. Manuscript and simulation status is retained so existing research is not mistaken for additional published results.

## Selected experience

| Period | Context | Work focus |
| --- | --- | --- |
${experienceRows([0,1,2,4,8].map(i=>d.showcase.experience[i]))}

<details>
<summary>Additional research contexts and education</summary>

| Period | Context | Work focus |
| --- | --- | --- |
${experienceRows([3,5,6,7].map(i=>d.showcase.experience[i]))}

${d.education.map(e=>"- "+e).join("\n")}

This is selected career context, not a claim that the public labs are institutional projects or endorsements. Offers and selections that did not become attended roles are not represented as completed experience.

</details>

[Extended research and career overview](CAREER_RECORD.md)

## Capabilities with an evidence trail

| Area | Mechanisms I work with | Inspectable route / scope |
| --- | --- | --- |
${d.showcase.capabilities.map(c=>`| **${c.name}** | ${c.mechanism} | [${c.evidence}](${c.link}). ${c.status}. |`).join("\n")}

<picture><source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=python,pytorch,tensorflow,cpp,java,android,docker,git,linux&amp;theme=dark&amp;perline=9"><img src="https://skillicons.dev/icons?i=python,pytorch,tensorflow,cpp,java,android,docker,git,linux&amp;theme=light&amp;perline=9" alt="Python, PyTorch, TensorFlow, C++, Java, Android, Docker, Git and Linux" height="48"></picture>

**Languages / systems:** Python, C++, Java, TypeScript, SQL, Android, APIs and Git-based CI/CD.<br>
**Models / research:** PyTorch, TensorFlow, scikit-learn, OpenCV, Qiskit, PennyLane and SeQUeNCe. Framework familiarity is not a substitute for a measured result.

## Compare notes or build together

I'm interested in research conversations and collaborations around **reliable AI systems, evaluation and efficient learning/inference**. A careful failure analysis, a stronger baseline or a well-designed experiment is a good place to start.

[Email](${d.links.email}) · [LinkedIn](${d.links.linkedin}) · [Scholar](${d.links.scholar})

<sub>Source-linked work, not a badge wall. [Visual provenance](VISUAL_SOURCES.md) · [Maintain from any machine](OPERATIONS.md) · Updated ${d.updated}.</sub>
`;
const career=`# Research and career overview

${d.name} · ${d.headline}

${d.education.map(e=>"- "+e).join("\n")}

## Professional context

${d.current}. Professional summaries describe transferable work; employer source and internal artifacts are not published in this profile repository.

## Selected experience

| Period | Context | Work focus |
| --- | --- | --- |
${experienceRows(d.showcase.experience)}

Dates and roles are curated from the supplied career record, not newly authenticated credential records. Preserve year-only dates where exact intervals are unresolved. Selection-only or withdrawn opportunities are not held-role entries. Public labs are not institutional endorsements or the original internship implementations.

## Research

${d.research.map(r=>`### ${r.name}\n\n${r.detail}\n\nStatus: ${r.status}.\n`).join("\n")}

## Publications

${d.publications.map(p=>`- **${p.title}**. ${p.venue}. [DOI](https://doi.org/${p.doi}).`).join("\n")}

[Complete bibliography, registry dates and co-authors](PUBLICATIONS.md). These eight publication identities are separate from manuscripts and preprints.

## Record maintenance

${d.sourceNote}

Generated from \`content/profile.json\`. Bibliographic identity was refreshed separately against Crossref; exact contribution allocations, scientific results and credential authenticity are not established by metadata. Private career packages, proofs, patents and employer implementations are not published here.
`;
const publications=`# Publications

Eight DOI-linked works from the curated career record. Each title and author list below matched the Crossref works record on ${d.updated}. A resolved DOI establishes bibliographic identity, not a new review of methods, results, authorship contributions or research novelty.

${d.publications.map((p,i)=>{const m=bibliography.publications.find(m=>m.doi===p.doi);return `## ${i+1}. ${p.title}\n\n${m.authors.map(a=>a===d.name?"**"+a+"**":a).join(", ")}.\n\n${p.venue}. Publisher: ${m.publisher}. Registry publication date: ${m.published.map((n,i)=>i===0?String(n):String(n).padStart(2,"0")).join("-")}. Type: ${m.type}.\n\n[Publisher / DOI](https://doi.org/${p.doi}) · [Crossref record](${m.source})\n`;}).join("\n")}
## Interpretation and maintenance

- Event/proceedings labels and registry publication dates can differ. The COMSYS 2024 proceedings record is published in 2026; the VDAT 2023 Springer chapter has a 2024 online record. The CRC chapter registry date is 30 November 2023; this identifies the registry date, not every edition date.
- QVoC, HQFL-QNet, DEQUINT and other manuscripts remain separate. A manuscript, preprint, disclosure or research selection is not added to this published list by implication.
- No publication title is used as evidence of quantum advantage, clinical deployment, realized financial returns or the performance of a new reference implementation.
- Optional metadata refresh: \`npm run audit:publications\`, then review the snapshot and regenerate. Normal CI is offline and checks the saved data. A title/author mismatch must be reconciled rather than silently accepted.
`;
for(const [name,body] of [["README.md",readme],["CAREER_RECORD.md",career],["PUBLICATIONS.md",publications]]){
 const target=path.join(root,name);
 if(process.argv.includes("--check")){if(await readFile(target,"utf8")!==body)throw new Error(name+" drifted from its generator");}
 else await writeFile(target,body);
}
console.log(process.argv.includes("--check")?"Profile, career and bibliography consistency passed.":"Rendered the complete research-first showcase, career record and bibliography.");
