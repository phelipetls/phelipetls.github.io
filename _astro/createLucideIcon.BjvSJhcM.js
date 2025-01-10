import{t as x,c as w,j as i}from"./tw-merge.BweXSh_q.js";import{r as a}from"./index.BYb6XiQz.js";const v=a.forwardRef((e,r)=>{const t=a.useMemo(()=>x(w("bg-surface","hover:bg-hover","text-on-background","disabled:bg-disabled","disabled:text-on-disabled","disabled:hover:cursor-not-allowed","disabled:hover:bg-disabled","hover:text-primary","transition-colors","duration-300",{"min-w-[40px] h-[40px] flex justify-center items-center rounded-full px-2":e.variant==="rounded-full","rounded border border-divider p-1 shadow-sm shadow-shadow":e.variant==="rounded"},e.className)),[]);if(e.href!==void 0){if(e.disabled)return i.jsx("button",{ref:r,type:"button",className:t,disabled:e.disabled,children:e.children});const{variant:n,...s}=e;return i.jsx("a",{ref:r,...s,className:t})}const{variant:l,...o}=e;return i.jsx("button",{ref:r,type:"button",...o,className:t})});v.displayName="IconButton";/**
 * @license lucide-react v0.293.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.293.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),k=(e,r)=>{const t=a.forwardRef(({color:l="currentColor",size:o=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:u="",children:d,...c},b)=>a.createElement("svg",{ref:b,...f,width:o,height:o,stroke:l,strokeWidth:s?Number(n)*24/Number(o):n,className:["lucide",`lucide-${g(e)}`,u].join(" "),...c},[...r.map(([m,h])=>a.createElement(m,h)),...(Array.isArray(d)?d:[d])||[]]));return t.displayName=`${e}`,t};export{v as I,k as c};
