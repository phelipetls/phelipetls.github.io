import{j as c,t as i,c as u}from"./tw-merge.ef383cd6.js";import{r as d}from"./index.8dbfd31f.js";function l(e){const{color:o,className:r}=e;return i(u("flex","items-center","justify-center","flex-row","gap-2","transition-colors","duration-300","hover:bg-hover","disabled:bg-disabled","disabled:text-on-disabled","disabled:hover:cursor-not-allowed","disabled:hover:bg-disabled","rounded-full px-4 py-2",{["bg-primary text-on-primary hover:bg-primary-hover"]:o==="primary",["bg-surface text-on-background"]:o==="secondary"},r))}function g(e){if(e.href!==void 0){const{color:s,className:n,...a}=e;return c.exports.jsx("a",{className:l({color:s,className:n}),...a})}const{color:o,className:r,...t}=e;return c.exports.jsx("button",{className:l({color:o,className:r}),...t})}function N(e){const{className:o,variant:r="rounded",...t}=e,s=i(u("bg-background text-on-background",{["rounded-full px-4 py-2"]:r==="rounded-full",["rounded border border-divider p-1 shadow shadow-shadow"]:r==="rounded"},o));return c.exports.jsx(g,{className:s,...t})}var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const h=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=(e,o)=>{const r=d.exports.forwardRef(({color:t="currentColor",size:s=24,strokeWidth:n=2,children:a,...m},b)=>d.exports.createElement("svg",{ref:b,...f,width:s,height:s,stroke:t,strokeWidth:n,className:`lucide lucide-${h(e)}`,...m},[...o.map(([p,x])=>d.exports.createElement(p,x)),...(Array.isArray(a)?a:[a])||[]]));return r.displayName=`${e}`,r};export{N as I,y as c};
