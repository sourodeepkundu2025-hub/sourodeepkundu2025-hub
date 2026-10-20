// Opt-in public snapshot refresh; normal render/check never calls the network.
import {writeFile} from "node:fs/promises";
import {createHash} from "node:crypto";
const commit="d919938e44ffdde2f26ddeb13b0c40da297dff3d";
const file="artifacts/amendment-content-disjoint-audit/report.json";
const source=`https://raw.githubusercontent.com/sourodeepkundu2025-hub/agent-reliability-lab/${commit}/${file}`;
const response=await fetch(source,{signal:AbortSignal.timeout(25000)});
if(!response.ok)throw new Error("Public experiment snapshot unavailable; old snapshot preserved.");
const bytes=Buffer.from(await response.arrayBuffer()),report=JSON.parse(bytes.toString("utf8"));
if(report.mode!=="deterministic-synthetic-replay"||Object.values(report.summary).some(s=>s.model_calls!==0))throw new Error("Unexpected evidence class; review before refreshing.");
await writeFile(new URL("../content/agent-result.json",import.meta.url),JSON.stringify({
 source,commit,file,sha256:createHash("sha256").update(bytes).digest("hex"),
 evidence_class:"Actual saved synthetic replay; handwritten controllers, zero model calls.",
 config_sha256:report.config_sha256,summary:report.summary,paired_comparisons:report.paired_comparisons,
 task_generation:report.task_generation,cross_split_unique_content_overlap:report.cross_split_unique_content_overlap,
 checked_at:new Date().toISOString()},null,2)+"\n");
console.log("Refreshed the pinned public synthetic result; no model or private data.");
