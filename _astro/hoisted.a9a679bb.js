import"./ThemeSelect.astro_astro_type_script_index_0_lang.99b48e4a.js";const s=document.querySelector("nav[data-toc]"),o=s?.closest("[data-toc-wrapper]"),l=document.querySelector("[data-blog-post]"),a=s?.querySelector("li");function u(t){t.setAttribute("data-active","")}function d(t){t.removeAttribute("data-active")}function f(){s?.querySelectorAll("li").forEach(d)}function g(t){const e=t.getAttribute("id"),n=s?.querySelector(`li a[href="#${e}"]`);return n?n.closest("li"):null}const h=new IntersectionObserver(t=>{t.forEach(e=>{if(!o)return null;const n=e.target;if(e.isIntersecting){const r=g(n);if(!r)return null;f(),u(r);const c=o.getBoundingClientRect(),i=r.getBoundingClientRect();if(r===a){o.scrollTop=0;return}if(c.top>i.top){o.scrollTop-=c.top-i.top;return}i.bottom>c.bottom&&(o.scrollTop+=i.bottom-c.bottom)}})},{threshold:1}),m=l.querySelectorAll("h2, h3, h4, h4, h6");for(const t of m)h.observe(t);
