import{j as e,c}from"./tw-merge.dd1f01ef.js";import{r as y}from"./index.6460afdd.js";import{c as o,I as u}from"./createLucideIcon.cbcd067e.js";const m=o("Check",[["polyline",{points:"20 6 9 17 4 12",key:"10jjfj"}]]),j=o("Clipboard",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}]]),h=o("X",[["line",{x1:"18",x2:"6",y1:"6",y2:"18",key:"15jfxm"}],["line",{x1:"6",x2:"18",y1:"6",y2:"18",key:"d1lma3"}]]);function g(n){const{code:i,className:l,successText:d,errorText:x,...p}=n,[a,s]=y.useState("idle"),t=a!=="idle",r=a==="error";return e.jsx(u,{variant:"rounded","aria-label":t?r?x:d:"Copy code",className:c([t?r?"border-warn":"border-green-500":"",l]),onClick:async()=>{try{await navigator.clipboard.writeText(i),s("success")}catch{s("error")}finally{setTimeout(()=>{s("idle")},1e3)}},...p,children:t?e.jsx("span",{className:c("[&_svg]:stroke-current",t?r?"text-warn":"text-green-500":""),children:r?e.jsx(h,{}):e.jsx(m,{})}):e.jsx("span",{className:"text-[var(--code-fg)]",children:e.jsx(j,{})})})}export{g as default};
