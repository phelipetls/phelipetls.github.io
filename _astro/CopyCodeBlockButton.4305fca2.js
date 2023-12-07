import{j as e,c}from"./tw-merge.dd1f01ef.js";import{r as u}from"./index.6460afdd.js";import{c as a,I as h}from"./IconButton.21971510.js";/**
 * @license lucide-react v0.293.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=a("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.293.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=a("Clipboard",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}]]);/**
 * @license lucide-react v0.293.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function b(n){const{code:d,className:i,successText:l,errorText:p,...x}=n,[o,s]=u.useState("idle"),t=o!=="idle",r=o==="error";return e.jsx(h,{variant:"rounded","aria-label":t?r?p:l:"Copy code",className:c([t?r?"border-warn":"border-green-500":"",i]),onClick:async()=>{try{await navigator.clipboard.writeText(d),s("success")}catch{s("error")}finally{setTimeout(()=>{s("idle")},1e3)}},...x,children:t?e.jsx("span",{className:c("[&_svg]:stroke-current",t?r?"text-warn":"text-green-500":""),children:r?e.jsx(k,{}):e.jsx(m,{})}):e.jsx("span",{className:"text-[var(--code-fg)]",children:e.jsx(y,{})})})}export{b as default};
