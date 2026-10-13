import {readFile,writeFile} from "node:fs/promises";
import path from "node:path";import {fileURLToPath} from "node:url";
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const d=JSON.parse(await readFile(path.join(root,"content/profile.json"),"utf8"));
const repo=name=>"https://github.com/"+d.username+"/"+name;
const readme=`<!-- Generated from content/profile.json by scripts/render-profile.mjs. -->
<picture><img src="assets/header.svg" alt="Sourodeep Kundu — software, intelligence and quantum research" width="100%"></picture>

<p align="center"><a href="${d.links.linkedin}">LinkedIn</a> · <a href="${d.links.scholar}">Google Scholar</a> · <a href="${d.links.researchgate}">ResearchGate</a> · <a href="${d.links.email}">Email</a> · <a href="CAREER_RECORD.md">Research & career overview</a></p>

### Hello, I'm Sourodeep.

${d.intro}

**${d.current}**<br>
${d.education.join("<br>\n")}

I like the point where an ambitious idea meets an engineering constraint: a circuit with limited connectivity, a model with a call budget, a retrieval system that needs to justify its answer, or a device workflow that must recover clearly.

### Explore the work

| Project | Engineering question | What you can inspect |
| --- | --- | --- |
${d.newProjects.map(p=>`| **[${p.name}](${repo(p.repo)})** | ${p.question} | ${p.detail} [Live demo](https://${d.username}.github.io/${p.repo}/) · [Run instructions](${repo(p.repo)}#run) · [Tests](${repo(p.repo)}/tree/main/test) |`).join("\n")}

These are new public reference implementations. The original research and larger platforms have their own release requirements; see the [project roadmap](ROADMAP.md).

### Where my work connects

| Area | Practice | Tools |
| --- | --- | --- |
${d.tracks.map(t=>`| **${t.title}** | ${t.detail} | ${t.tools} |`).join("\n")}

### Research threads

${d.research.map(r=>`- **${r.name}** — ${r.detail} *${r.status}.*`).join("\n")}

My research experience includes circuit synthesis at IIEST Shibpur, multicore quantum-interconnect simulation at IIT Guwahati, tensor networks at NIT Silchar, and generative QML at IISER Bhopal.

**Currently exploring:** ${d.ongoing}

### Papers and public records

Selected publications include [QLSTM4FM](https://doi.org/10.1109/IC-SIT63503.2024.10862667), [QEA-FAD](https://doi.org/10.1109/NETCRYPT65877.2025.11102801), and [nearest-neighbor circuit transformation](https://doi.org/10.1109/VDAT63601.2024.10705747). See the [publication register](CAREER_RECORD.md#publications) for the broader record.

Model studies, physical circuit experiments and simulation results have different scopes. Each released research repository will carry its own data, methods, baselines and limitations.

### More repositories

${d.existingProjects.map(p=>`- [${p.name}](${repo(p.repo)}) — ${p.detail}`).join("\n")}

### Let's build something worth inspecting.

I'm interested in research collaboration and engineering work across software systems, AI/LLMs, clinical ML and quantum information. [Contact me](${d.links.email}) or explore the repositories above.

<sub>Profile record updated ${d.updated}. New reference implementations include code provenance and reproducible checks.</sub>
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

This public summary is generated with the profile from \`content/profile.json\`. It complements the common CV without replacing it. A repository release, a publication and an internship selection are separate records.
`;
for(const [name,body]of [["README.md",readme],["CAREER_RECORD.md",career]]){
 const dest=path.join(root,name);
 if(process.argv.includes("--check")){if(await readFile(dest,"utf8")!==body)throw new Error(name+" has drifted from profile.json");}
 else await writeFile(dest,body);
}
console.log(process.argv.includes("--check")?"Profile and career record synchronized.":"Rendered profile and career record.");
