import{j as x,t as T,c as p}from"./tw-merge.dd1f01ef.js";import{R as l}from"./index.6460afdd.js";const h=l.forwardRef((r,c)=>{const{children:a,...n}=r;return x.jsx("div",{ref:c,role:"tablist",className:"space-x-1",...n,children:a})});h.displayName="TabList";function y(r){const{value:c,...a}=r,n=l.useRef(null),i=e=>{const t=e.currentTarget;let s=!1;if(!n.current)return;const o=Array.from(n.current.children),b=o[0],f=o[o.length-1];let d;if(t===b)d=f;else{const g=o.indexOf(t);d=o[g-1]}let m;if(t===f)m=b;else{const g=o.indexOf(t);m=o[g+1]}switch(e.key){case"ArrowLeft":d?.focus(),s=!0;break;case"ArrowRight":m?.focus(),s=!0;break;case"Home":b?.focus(),s=!0;break;case"End":f?.focus(),s=!0;break}s&&(e.stopPropagation(),e.preventDefault())},u=l.Children.map(r.children,e=>{if(!l.isValidElement(e))return null;const t=e.props.value===c;return l.cloneElement(e,{selected:t,onChange:r.onChange,onKeyDown:i})});return x.jsx(h,{ref:n,...a,children:u})}function R(r){const{label:c,selected:a=!1,value:n,onChange:i,onClick:u,className:e,...t}=r;return x.jsx("button",{type:"button",role:"tab","aria-selected":a?"true":"false",className:T(p("bg-background","text-on-background","rounded-t","p-2","transition-colors","duration-300","hover:bg-hover",{"border-b border-primary font-bold":a},e)),onClick:s=>{!a&&i&&i(n),u&&u(s)},...t,children:c})}export{y as T,R as a};