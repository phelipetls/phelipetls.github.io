import{r as e}from"./index.57fae3ab.js";import{r as p}from"./index.ffa87b56.js";import"./_commonjsHelpers.042e6b4d.js";var l,f,u=p;f=u.createRoot,l=u.hydrateRoot;const a=({value:t,name:r})=>t?e.createElement("astro-slot",{name:r,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:t}}):null;a.shouldComponentUpdate=()=>!1;function E(t){for(const r in t)if(r.startsWith("__reactContainer"))return r}const R=t=>(r,n,{default:o,...m},{client:d})=>{if(!t.hasAttribute("ssr"))return;for(const[c,y]of Object.entries(m))n[c]=e.createElement(a,{value:y,name:c});const s=e.createElement(r,n,o!=null?e.createElement(a,{value:o}):o),i=E(t);return i&&delete t[i],d==="only"?e.startTransition(()=>{f(t).render(s)}):e.startTransition(()=>{l(t,s)})};export{R as default};
