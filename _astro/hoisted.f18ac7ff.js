import{k as d,D as u,b as p}from"./floating-ui.dom.browser.min.b9202534.js";import"./ThemeSelect.astro_astro_type_script_index_0_lang.a8b55151.js";document.querySelector("[data-close-toc]")?.addEventListener("click",()=>{const t=document.querySelector("[data-blog-post-container]");if(!t)return;const e=t.dataset.toc==="open"?"closed":"open";t.dataset.toc=e});for(const t of document.querySelectorAll("[data-codeblock] pre.twoslash data-lsp"))t.addEventListener("mouseover",async n=>{if(!n.target)return;const e=document.createElement("div"),o=n.target;e.setAttribute("role","tooltip");const r="twoslash-lsp-tooltip";e.setAttribute("id",r),o.setAttribute("aria-describedby",r);const{x:c,y:l}=await d(o,e,{placement:"bottom-start",middleware:[u(8),p()]});Object.assign(e.style,{left:`${c}px`,top:`${l}px`});const i=o.getAttribute("lsp");e.textContent=i,e.classList.add("font-mono","absolute","bg-gray-700","text-white","text-left","p-2","text-sm","whitespace-pre-wrap"),document.body.append(e),o.addEventListener("mouseout",()=>{e.remove(),o.removeAttribute("aria-describedby")},{once:!0})});const a=document.querySelector("nav[data-toc-wrapper] ol"),s=a?.closest("[data-toc-wrapper]"),m=document.querySelector("[data-blog-post]"),b=a?.querySelector("li");function g(t){t.setAttribute("data-active","")}function f(t){t.removeAttribute("data-active")}function h(){a?.querySelectorAll("li").forEach(f)}function v(t){const n=t.getAttribute("id"),e=a?.querySelector(`li a[href="#${n}"]`);return e?e.closest("li"):null}const y=new IntersectionObserver(t=>{t.forEach(n=>{if(!s)return null;const e=n.target;if(n.isIntersecting){const o=v(e);if(!o)return null;h(),g(o);const r=s.getBoundingClientRect(),c=o.getBoundingClientRect();if(o===b){s.scrollTop=0;return}if(r.top>c.top){s.scrollTop-=r.top-c.top;return}c.bottom>r.bottom&&(s.scrollTop+=c.bottom-r.bottom)}})},{threshold:1}),A=m.querySelectorAll("h2, h3, h4, h4, h6");for(const t of A)y.observe(t);
