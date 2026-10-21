import {readFile} from "node:fs/promises";
import assert from "node:assert/strict";
const read=async p=>JSON.parse(await readFile(new URL("../research/"+p,import.meta.url),"utf8"));
const library=await read("library.json"),program=await read("program.json");
assert.equal(library.papers.length,150);
assert.equal(new Set(library.papers.map(p=>p.url.replace(/v\d+$/,""))).size,150);
assert.equal(program.projects.length,24);
assert.equal(new Set(program.projects.map(p=>p.id)).size,24);
assert.equal(Object.values(program.budget).reduce((a,b)=>a+b,0),program.planning_hours);
assert.equal(program.projects.reduce((n,p)=>n+p.build_hours,0),program.budget.build_and_test);
assert.equal(library.coverage.full_text_read,library.papers.filter(p=>p.full_text_read).length);
assert.equal(library.coverage.reproduced,library.papers.filter(p=>p.reproduced).length);
for(const p of library.papers){assert.ok(["candidate","abstract_read","selected_sections_read","full_text_read"].includes(p.coverage));assert.ok(p.date<="2026-10-20");assert.match(p.url,/^https:\/\//);}
for(const p of program.projects){assert.ok(p.question&&p.baseline&&p.deliverable&&p.gate);}
console.log("Research library, scope, project gates and time budget passed.");
