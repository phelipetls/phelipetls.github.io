import{c as u,s as m,o as p}from"./floating-ui.dom.esm.5aa821b1.js";import"./ThemeSelect.astro_astro_type_script_index_0_lang.99b48e4a.js";for(const t of document.querySelectorAll("[data-codeblock] pre.twoslash")){const r=t.querySelectorAll("data-lsp");for(const c of r)c.addEventListener("mouseover",async n=>{if(!n.target)return;const e=document.createElement("div"),o=n.target,{x:a,y:i}=await u(o,e,{placement:"bottom-start",middleware:[m({padding:8}),p(8)]});Object.assign(e.style,{left:`${a}px`,top:`${i}px`});const d=o.getAttribute("lsp");e.textContent=d,e.classList.add("absolute","bg-gray-700","text-white","text-left","p-2","text-sm","whitespace-pre-wrap"),document.body.append(e),o.addEventListener("mouseout",()=>{e.remove()})})}const l=document.querySelector("nav[data-toc]"),s=l?.closest("[data-toc-wrapper]"),f=document.querySelector("[data-blog-post]"),g=l?.querySelector("li");function h(t){t.setAttribute("data-active","")}function b(t){t.removeAttribute("data-active")}function v(){l?.querySelectorAll("li").forEach(b)}function y(t){const r=t.getAttribute("id"),c=l?.querySelector(`li a[href="#${r}"]`);return c?c.closest("li"):null}const A=new IntersectionObserver(t=>{t.forEach(r=>{if(!s)return null;const c=r.target;if(r.isIntersecting){const n=y(c);if(!n)return null;v(),h(n);const e=s.getBoundingClientRect(),o=n.getBoundingClientRect();if(n===g){s.scrollTop=0;return}if(e.top>o.top){s.scrollTop-=e.top-o.top;return}o.bottom>e.bottom&&(s.scrollTop+=o.bottom-e.bottom)}})},{threshold:1}),E=f.querySelectorAll("h2, h3, h4, h4, h6");for(const t of E)A.observe(t);
