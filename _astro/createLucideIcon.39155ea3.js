import{r as a}from"./index.c0d9332e.js";import{t as h,c as x,j as i}from"./jsx-runtime.a3ab6fc0.js";const w=a.forwardRef((e,r)=>{const t=a.useMemo(()=>h(x("bg-surface","hover:bg-hover","text-on-background","disabled:bg-disabled","disabled:text-on-disabled","disabled:hover:cursor-not-allowed","disabled:hover:bg-disabled","hover:text-primary","transition-colors","duration-300",{"min-w-[40px] h-[40px] flex justify-center items-center rounded-full px-2":e.variant==="rounded-full","rounded border border-divider p-1 shadow-sm shadow-shadow":e.variant==="rounded"},e.className)),[]);if(e.href!==void 0){if(e.disabled)return i.jsx("button",{ref:r,type:"button",className:t,disabled:e.disabled,children:e.children});const{variant:n,...s}=e;return i.jsx("a",{ref:r,...s,className:t})}const{variant:l,...o}=e;return i.jsx("button",{ref:r,type:"button",...o,className:t})});w.displayName="IconButton";var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const f=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),j=(e,r)=>{const t=a.forwardRef(({color:l="currentColor",size:o=24,strokeWidth:n=2,absoluteStrokeWidth:s,children:d,...u},c)=>a.createElement("svg",{ref:c,...v,width:o,height:o,stroke:l,strokeWidth:s?Number(n)*24/Number(o):n,className:`lucide lucide-${f(e)}`,...u},[...r.map(([b,m])=>a.createElement(b,m)),...(Array.isArray(d)?d:[d])||[]]));return t.displayName=`${e}`,t};export{w as I,j as c};