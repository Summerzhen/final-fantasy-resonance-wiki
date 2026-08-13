"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Character, Vision } from "@/lib/ffr-data";
import { StatusBadge } from "./ffr-site";

export function CharacterExplorer({ data }: { data: Character[] }) {
  const [query,setQuery]=useState(""); const [group,setGroup]=useState("All");
  const groups=["All",...Array.from(new Set(data.map(x=>x.group)))];
  const filtered=useMemo(()=>data.filter(x=>(group==="All"||x.group===group)&&`${x.name} ${x.role} ${x.affiliation}`.toLowerCase().includes(query.toLowerCase())),[data,query,group]);
  return <div><FilterBar query={query} setQuery={setQuery} options={groups} value={group} setValue={setGroup}/><div className="result-count">Showing {filtered.length} of {data.length} known characters</div><div className="entity-grid">{filtered.map(x=><Link className="entity-card" href={`/characters/${x.slug}`} key={x.slug}><div className="entity-card-top"><span>{x.group}</span><StatusBadge status={x.status}/></div><h3>{x.name}</h3><p>{x.summary}</p><dl><div><dt>Role</dt><dd>{x.role}</dd></div><div><dt>Job</dt><dd>{x.job}</dd></div><div><dt>Affiliation</dt><dd>{x.affiliation}</dd></div></dl></Link>)}</div></div>
}

export function VisionExplorer({ data }: { data: Vision[] }) {
  const [query,setQuery]=useState(""); const [status,setStatus]=useState("All");
  const options=["All","Confirmed","Observed","Unknown"];
  const filtered=useMemo(()=>data.filter(x=>(status==="All"||x.status===status)&&`${x.name} ${x.game} ${x.role} ${x.element}`.toLowerCase().includes(query.toLowerCase())),[data,query,status]);
  return <div><FilterBar query={query} setQuery={setQuery} options={options} value={status} setValue={setStatus}/><div className="result-count">Showing {filtered.length} of {data.length} Vision slots</div><div className="vision-grid">{filtered.map((x,i)=><Link href={x.status==="Unknown"?"/visions":`/visions/${x.slug}`} className={`vision-card ${x.status==="Unknown"?"is-unknown":""}`} key={`${x.slug}-${i}`}><div className="roman">{x.numeral}</div><div><StatusBadge status={x.status}/><h3>{x.name}</h3><p>{x.game}</p><dl><div><dt>Role</dt><dd>{x.role}</dd></div><div><dt>Element</dt><dd>{x.element}</dd></div></dl><small>{x.ability}</small></div></Link>)}</div></div>
}

function FilterBar({query,setQuery,options,value,setValue}:{query:string;setQuery:(v:string)=>void;options:string[];value:string;setValue:(v:string)=>void}) { return <div className="filter-bar"><label><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, role or origin…"/></label><label><SlidersHorizontal size={17}/><select value={value} onChange={e=>setValue(e.target.value)}>{options.map(x=><option value={x} key={x}>{x}</option>)}</select></label></div> }
