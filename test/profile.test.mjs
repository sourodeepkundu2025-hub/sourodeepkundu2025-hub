import test from "node:test";
import assert from "node:assert/strict";
import {readFile,access,readdir} from "node:fs/promises";
const root=new URL("../",import.meta.url);
const read=async name=>readFile(new URL(name,root),"utf8");
const data=JSON.parse(await read("content/profile.json"));
const metadata=JSON.parse(await read("content/publication-metadata.json"));
const result=JSON.parse(await read("content/agent-result.json"));
const readme=await read("README.md");

test("eight exact publication identities and selected subset preserve authorship",()=>{
 assert.equal(data.publications.length,8);
 assert.equal(new Set(data.publications.map(p=>p.doi)).size,8);
 assert.equal(metadata.publications.length,8);
 for(const p of data.publications){const m=metadata.publications.find(m=>m.doi===p.doi);assert.equal(m.title,p.title);assert.ok(m.authors.includes(data.name));assert.match(m.source,/^https:\/\/api\.crossref\.org\/works\//);}
 for(const doi of data.showcase.selectedPublicationDois)assert.ok(data.publications.some(p=>p.doi===doi));
});
test("public showcases expose present evidence without private future plans",async()=>{
 for(const heading of ["Public engineering labs","Selected published research","Research in progress","Selected experience","Capabilities with an evidence trail"])assert.ok(readme.includes("## "+heading));
 for(const file of ["README.md","CAREER_RECORD.md","content/profile.json","scripts/render-profile.mjs"]){
  assert.doesNotMatch(await read(file),/What I'm building toward|reading (?:and experiment programme|library|plan)|milestones|research\/(?:README|RESEARCH_QUESTIONS|PAPER_LIBRARY)|Current study:/i);
 }
 for(const removed of ["ROADMAP.md","scripts/check-research.mjs"])await assert.rejects(access(new URL(removed,root)),{code:"ENOENT"});
 const planningFiles=await readdir(new URL("research/",root)).catch(error=>{if(error.code==="ENOENT")return [];throw error;});
 assert.equal(planningFiles.length,0,"Private planning directory must not have public files");
 assert.match(readme,/not a novel checkpoint method or an LLM result/);
});
test("experiment chart snapshot preserves the strong-baseline null and class",()=>{
 const a=result.summary["step-retry"],b=result.summary["checkpoint-budget"];
 assert.equal(a.task_success,b.task_success);
 assert.equal(a.tool_calls_mean,b.tool_calls_mean);
 assert.ok(Object.values(result.summary).every(s=>s.model_calls===0));
 assert.equal(result.paired_comparisons.find(c=>c.baseline==="step-retry").success_delta,0);
 assert.equal(result.cross_split_unique_content_overlap,0);
 assert.match(result.source,new RegExp(result.commit));
 assert.match(result.sha256,/^[a-f0-9]{64}$/);
});
test("all self-hosted assets exist, have meaningful alt text and safe SVG",async()=>{
 for(const match of readme.matchAll(/!\[([^\]]*)\]\((assets\/[^)]+)\)/g)){assert.ok(match[1].length>12);await access(new URL(match[2],root));}
 for(const name of ["showcase-header.svg","agent-results.svg","evidence-pipeline.svg"]){const svg=await read("assets/"+name);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.doesNotMatch(svg,/<script|<foreignObject|onload=|https?:\/\/(?!www\.w3\.org)/i);}
});
test("every relative content link resolves without leaving this repository",async()=>{
 for(const file of ["README.md","CAREER_RECORD.md","PUBLICATIONS.md","VISUAL_SOURCES.md"]){const text=await read(file);for(const m of text.matchAll(/\]\(([^)]+)\)/g)){const target=m[1];if(/^(https?:|mailto:|#)/.test(target))continue;const url=new URL(target,root);assert.ok(url.href.startsWith(root.href));await access(url);}}
});
test("local jump links match real Markdown headings",()=>{
 const slugs=[...readme.matchAll(/^#{1,6} (.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,"").trim().replace(/\s/g,"-"));
 for(const m of readme.matchAll(/\]\(#([^)]+)\)/g))assert.ok(slugs.includes(m[1]),"Missing heading "+m[1]);
});
test("selected timeline excludes unattended offers and preserves date precision",()=>{
 const experiences=data.showcase.experience;
 assert.ok(experiences.some(e=>e.where==="C-DAC Chennai"&&e.when==="Sep 2025–May 2026"));
 assert.ok(experiences.some(e=>e.where==="IISER Bhopal"&&e.when==="2024"));
 for(const excluded of ["IIT Kharagpur","IIIT Delhi","Deloitte","ACM iSOFT"])assert.ok(!experiences.some(e=>e.where.includes(excluded)));
 assert.match(experiences.find(e=>e.where.includes("Philips")).role,/Apprentice/);
});
test("manual generation workflow stays on codex branches and ordinary CI stays read-only",async()=>{
 const refresh=await read(".github/workflows/refresh.yml"),ci=await read(".github/workflows/profile.yml");
 assert.match(refresh,/workflow_dispatch:/);
 assert.doesNotMatch(refresh,/pull_request_target:|schedule:|secrets\./);
 assert.match(refresh,/codex\/\*\)/);
 assert.match(refresh,/SOURCE_REF_TYPE: \$\{\{ github\.ref_type \}\}/);
 assert.match(refresh,/if \[ "\$SOURCE_REF_TYPE" != "branch" \]/);
 assert.match(refresh,/git push origin "HEAD:\$SOURCE_BRANCH"/);
 assert.match(refresh,/git add -- README\.md CAREER_RECORD\.md PUBLICATIONS\.md VISUAL_SOURCES\.md/);
 assert.match(ci,/contents: read/);
 assert.doesNotMatch(ci,/contents: write/);
});
test("public copy contains no private machine paths or credential-shaped strings",async()=>{
 for(const file of ["README.md","CAREER_RECORD.md","PUBLICATIONS.md","VISUAL_SOURCES.md","content/profile.json"]){const text=await read(file);assert.doesNotMatch(text,/C:[\\/]Users[\\/]|github_pat_[a-zA-Z0-9_]{20,}|ghp_[a-zA-Z0-9]{20,}|-----BEGIN .*PRIVATE KEY-----/);}
});
