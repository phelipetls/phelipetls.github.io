import{R as c,r as s}from"./index.57fae3ab.js";import{t as i,c as u,j as d}from"./jsx-runtime.7a8c40fc.js";const b=c.forwardRef((e,t)=>{const r=s.useMemo(()=>{const{color:o,className:a}=e;return i(u("flex","items-center","justify-center","flex-row","gap-2","transition-colors","duration-300","hover:bg-hover","disabled:bg-disabled","disabled:text-on-disabled","disabled:hover:cursor-not-allowed","disabled:hover:bg-disabled","rounded-full px-4 py-2",{["bg-primary text-on-primary hover:bg-primary-hover"]:o==="primary",["bg-surface text-on-background"]:o==="secondary"},a))},[e.className,e.color]);return e.href!==void 0?e.disabled?d.jsx("button",{ref:t,disabled:e.disabled,className:r,children:e.children}):d.jsx("a",{ref:t,...e,className:r}):d.jsx("button",{ref:t,...e,className:r})});b.displayName="Button";const x=c.forwardRef((e,t)=>{const{className:r,variant:o="rounded",...a}=e;return d.jsx(b,{ref:t,type:"button",className:i(u("bg-background text-on-background",{"rounded-full p-2":o==="rounded-full","rounded border border-divider p-1 shadow shadow-shadow":o==="rounded"},r)),...a})});x.displayName="IconButton";var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const v=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),j=(e,t)=>{const r=s.forwardRef(({color:o="currentColor",size:a=24,strokeWidth:l=2,children:n,...m},g)=>s.createElement("svg",{ref:g,...w,width:a,height:a,stroke:o,strokeWidth:l,className:`lucide lucide-${v(e)}`,...m},[...t.map(([f,h])=>s.createElement(f,h)),...(Array.isArray(n)?n:[n])||[]]));return r.displayName=`${e}`,r};export{x as I,j as c};
