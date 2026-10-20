// Explicit opt-in metadata refresh. Normal rendering and CI are offline.
import {readFile,writeFile} from "node:fs/promises";
const data=JSON.parse(await readFile(new URL("../content/profile.json",import.meta.url),"utf8"));
const publications=[];
for(const item of data.publications){
 const source="https://api.crossref.org/works/"+encodeURIComponent(item.doi);
 const response=await fetch(source,{headers:{"User-Agent":"Sourodeep-profile-metadata-audit/1.0"},signal:AbortSignal.timeout(25000)});
 if(!response.ok)throw new Error(`Metadata unavailable for ${item.doi}: ${response.status}; existing snapshot preserved.`);
 const record=(await response.json()).message;
 const authors=(record.author??[]).map(a=>[a.given,a.family].filter(Boolean).join(" "));
 if(!authors.some(a=>a.toLowerCase()==="sourodeep kundu"))throw new Error("Author identity requires manual review: "+item.doi);
 if(record.title?.[0]!==item.title)throw new Error("Title changed; reconcile before replacing data: "+item.doi);
 publications.push({doi:item.doi,title:record.title[0],authors,publisher:record.publisher,
   type:record.type,published:record.published?.["date-parts"]?.[0]??null,
   source,checked_at:new Date().toISOString(),verification:"Bibliographic identity only; not a methods, results or contribution-allocation audit."});
}
await writeFile(new URL("../content/publication-metadata.json",import.meta.url),JSON.stringify({source:"Crossref public works API",publications},null,2)+"\n");
console.log(`Refreshed ${publications.length} publication identities; no credentials or paper downloads.`);
