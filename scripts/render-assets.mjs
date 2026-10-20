import {readFile,writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const result=JSON.parse(await readFile(path.join(root,"content/agent-result.json"),"utf8"));
const svg=(title,description,width,height,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description"><title id="title">${title}</title><desc id="description">${description}</desc><style>text{font-family:Arial,Helvetica,sans-serif} .mono{font-family:monospace}</style>${body}</svg>\n`;
const header=svg("From models to working systems","Original editorial identity artwork. Three independent areas: machine learning, agent systems and dependable software. Not a system architecture or experimental result.",1100,300,`
<rect width="1100" height="300" rx="18" fill="#112b34"/>
<path d="M0 266H1100M0 267V300H1100V267" fill="#183b44" stroke="#36525a"/>
<text x="38" y="48" fill="#9fc7b8" font-size="18" letter-spacing="3">SOURODEEP KUNDU / RESEARCH + ENGINEERING</text>
<text x="38" y="112" fill="#f4f0e6" font-size="54" font-weight="700">From models</text><text x="38" y="175" fill="#f4f0e6" font-size="54" font-weight="700">to working systems.</text>
<text x="38" y="224" fill="#b9cbd0" font-size="21">AI systems. Careful experiments. Software that holds up.</text>
<g transform="translate(760 45)"><rect width="286" height="55" rx="8" fill="#1d444c" stroke="#517276"/><text x="22" y="35" fill="#f4f0e6" font-size="23">01 / Machine learning</text>
<rect y="70" width="286" height="55" rx="8" fill="#1d444c" stroke="#517276"/><text x="22" y="105" fill="#a8d8bf" font-size="23">02 / Agent systems</text>
<rect y="140" width="286" height="55" rx="8" fill="#1d444c" stroke="#517276"/><text x="22" y="175" fill="#edba91" font-size="23">03 / Dependable code</text></g>
<text x="38" y="289" fill="#b9cbd0" font-size="15" letter-spacing="2">PUBLISHED WORK + RUNNABLE LABS + INSPECTABLE EVIDENCE</text>`);
const colors={"no-retry":"#78908d","fixed-retry":"#ba825b","step-retry":"#347e72","checkpoint-budget":"#244957"};
const names={"no-retry":"No retry","fixed-retry":"Restart retry","step-retry":"Step retry","checkpoint-budget":"Checkpoint"};
const bars=Object.keys(names).map((key,i)=>{const y=92+i*60,s=result.summary[key];return `<text x="28" y="${y+23}" font-size="25" fill="#18343b">${names[key]}</text><rect x="226" y="${y}" width="470" height="30" rx="5" fill="#e2e5df"/><rect x="226" y="${y}" width="${470*s.task_success}" height="30" rx="5" fill="${colors[key]}"/><text x="714" y="${y+24}" font-size="25" fill="#18343b">${(100*s.task_success).toFixed(1)}%</text>`;}).join("");
const chart=svg("Strong baselines change the conclusion","Actual synthetic replay. Step retry and checkpoint both achieve 99.5 percent success; paired difference zero. No LLM or hardware run.",820,410,`
<rect width="820" height="410" rx="14" fill="#f4f0e6"/><text x="28" y="43" font-size="27" font-weight="700" fill="#18343b">Recovery under a shared tool-call budget</text>
<text x="28" y="70" font-size="19" fill="#526264">SYNTHETIC REPLAY / 40 TASKS × 5 SEEDS PER POLICY</text>${bars}
<path d="M28 337H790" stroke="#c2cbc2"/><text x="28" y="369" font-size="23" fill="#18343b">Step retry = checkpoint. Paired difference: 0.</text>
<text x="28" y="396" font-size="19" fill="#526264">Conditional task-family result · zero model calls · not a new method</text>`);
const pipeline=svg("Evidence Gate Lab: inspect the decision","Implemented deterministic pipeline: an authorized read request is ranked over public passages, complete passages fit a word budget, normalized quotes are checked, then extractive evidence is returned or the request abstains. No model call.",820,270,`
<rect width="820" height="270" rx="14" fill="#112b34"/><text x="28" y="43" font-size="27" font-weight="700" fill="#f4f0e6">An answer should leave an evidence trail.</text>
<g fill="#234750" stroke="#527775"><rect x="28" y="79" width="218" height="82" rx="8"/><rect x="301" y="79" width="218" height="82" rx="8"/><rect x="574" y="79" width="218" height="82" rx="8"/></g>
<g fill="#e8f0e8" font-size="27" text-anchor="middle"><text x="137" y="115">Rank public</text><text x="137" y="146">passages</text><text x="410" y="115">Fit the</text><text x="410" y="146">word budget</text><text x="683" y="115">Check</text><text x="683" y="146">quotations</text></g>
<g stroke="#a8d8bf" fill="none" stroke-width="3"><path d="M250 120H290m-12-8 12 8-12 8"/><path d="M523 120H563m-12-8 12 8-12 8"/></g>
<text x="28" y="205" fill="#a8d8bf" font-size="25">Authorized read → supported extract OR explicit abstention</text>
<text x="28" y="242" fill="#b9cbd0" font-size="20">Invented fixtures · deterministic decisions · no model or external tool call</text>`);
for(const [name,body] of [["showcase-header.svg",header],["agent-results.svg",chart],["evidence-pipeline.svg",pipeline]]){
 const target=path.join(root,"assets",name);
 if(process.argv.includes("--check")){if(await readFile(target,"utf8")!==body)throw new Error("Generated visual drift: "+name);}
 else await writeFile(target,body);
}
console.log(process.argv.includes("--check")?"Source-grounded visual consistency passed.":"Rendered original identity, measured synthetic chart and implemented pipeline.");
