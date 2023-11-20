import{j as E}from"./tw-merge.dd1f01ef.js";import{c as re,I as oe}from"./IconButton.9e457559.js";import{r as e,R as l}from"./index.6460afdd.js";const ce=re("MoveHorizontal",[["polyline",{points:"18 8 22 12 18 16",key:"1hqrds"}],["polyline",{points:"6 8 2 12 6 16",key:"f0ernq"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12",key:"1dnqot"}]]),O=e.forwardRef((t,n)=>{const s={position:"absolute",top:0,left:0,width:"100%",height:"100%",willChange:"clip",userSelect:"none",KhtmlUserSelect:"none",MozUserSelect:"none",WebkitUserSelect:"none"};return l.createElement("div",Object.assign({},t,{style:s,"data-rcs":"clip-item",ref:n}))});O.displayName="ContainerClip";const $=e.forwardRef(({children:t,portrait:n},s)=>{const a={position:"absolute",top:0,width:"100%",height:"100%",pointerEvents:"none"},i={position:"absolute",width:n?"100%":void 0,height:n?void 0:"100%",transform:n?"translateY(-50%)":"translateX(-50%)",pointerEvents:"all"};return l.createElement("div",{style:a,"data-rcs":"handle-container",ref:s},l.createElement("div",{style:i},t))});$.displayName="ThisHandleContainer";const X=({flip:t})=>{const n={width:0,height:0,borderTop:"8px solid transparent",borderRight:"10px solid",borderBottom:"8px solid transparent",transform:t?"rotate(180deg)":void 0};return l.createElement("div",{style:n})},le=({portrait:t,buttonStyle:n,linesStyle:s,style:a,...i})=>{const c={display:"flex",flexDirection:t?"row":"column",placeItems:"center",height:"100%",cursor:t?"ns-resize":"ew-resize",pointerEvents:"none",color:"#fff",...a},u={flexGrow:1,height:t?2:"100%",width:t?"100%":2,backgroundColor:"currentColor",pointerEvents:"auto",boxShadow:"0 0 7px rgba(0,0,0,.35)",...s},d={display:"grid",gridAutoFlow:"column",gap:8,placeContent:"center",flexShrink:0,width:56,height:56,borderRadius:"50%",borderStyle:"solid",borderWidth:2,pointerEvents:"auto",backdropFilter:"blur(7px)",WebkitBackdropFilter:"blur(7px)",boxShadow:"0 0 7px rgba(0,0,0,.35)",transform:t?"rotate(90deg)":void 0,...n};return l.createElement("div",Object.assign({className:"__rcs-handle-root"},i,{style:c}),l.createElement("div",{className:"__rcs-handle-line",style:u}),l.createElement("div",{className:"__rcs-handle-button",style:d},l.createElement(X,null),l.createElement(X,{flip:!0})),l.createElement("div",{className:"__rcs-handle-line",style:u}))},ae=t=>{const n=e.useRef(t);return e.useEffect(()=>{n.current=t}),n.current},Y=(t,n,s,a)=>{const i=e.useRef();e.useEffect(()=>{i.current=n},[n]),e.useEffect(()=>{if(!(s&&s.addEventListener))return;const c=u=>i.current&&i.current(u);return s.addEventListener(t,c,a),()=>{s.removeEventListener(t,c,a)}},[t,s,a])},ie=typeof window<"u"&&window.document&&window.document.createElement?e.useLayoutEffect:e.useEffect,ue=(t,n)=>{const s=e.useRef(),a=e.useCallback(()=>{t.current&&s.current&&s.current.observe(t.current)},[t]);ie(()=>(s.current=new ResizeObserver(([i])=>n(i.contentRect)),a(),()=>{s.current&&s.current.disconnect()}),[n,a])},y={passive:!0},D={capture:!0,passive:!1},de=({handle:t,itemOne:n,itemTwo:s,onlyHandleDraggable:a=!1,onPositionChange:i,portrait:c=!1,position:u=50,boundsPadding:d=0,changePositionOnHover:I=!1,style:q,...F})=>{const f=e.useRef(null),P=e.useRef(null),j=e.useRef(null),m=e.useRef(u),B=ae(u),[g,U]=e.useState(!1),R=e.useRef(!1),[A,V]=e.useState(),[H,K]=e.useState(!1);e.useEffect(()=>{V(a?j.current:f.current)},[a]);const h=e.useCallback(function({x:o,y:x,isOffset:S,portrait:p,boundsPadding:W}){const{top:Z,left:ee,width:C,height:k}=f.current.getBoundingClientRect();if(C===0||k===0)return;const te=Math.min(Math.max(p?S?x-Z-window.pageYOffset:x:S?o-ee-window.pageXOffset:o,0),p?k:C),M=p?k/(f.current.offsetHeight||1):C/(f.current.offsetWidth||1),b=te/M,N=C/M,z=k/M,_=b/(p?z:N)*100,ne=p?b===0||b===z:b===0||b===N,se=_===m.current&&(m.current===0||m.current===100);if(H&&se&&ne)return;K(!0),m.current=_;const L=Math.min(Math.max(b,0+W),(p?z:N)-W);P.current.style.clip=p?`rect(auto,auto,${L}px,auto)`:`rect(auto,${L}px,auto,auto)`,j.current.style.transform=p?`translate3d(0,${L}px,0)`:`translate3d(${L}px,0,0)`,i&&i(m.current)},[H,i]);e.useEffect(()=>{const{width:r,height:o}=f.current.getBoundingClientRect(),x=u===B?m.current:u;h({portrait:c,boundsPadding:d,x:r/100*x,y:o/100*x})},[c,u,B,d,h]);const T=e.useCallback(r=>{r.preventDefault(),h({portrait:c,boundsPadding:d,isOffset:!0,x:r instanceof MouseEvent?r.pageX:r.touches[0].pageX,y:r instanceof MouseEvent?r.pageY:r.touches[0].pageY}),U(!0)},[c,d,h]),v=e.useCallback(function(o){h({portrait:c,boundsPadding:d,isOffset:!0,x:o instanceof MouseEvent?o.pageX:o.touches[0].pageX,y:o instanceof MouseEvent?o.pageY:o.touches[0].pageY})},[c,d,h]),w=e.useCallback(()=>{U(!1)},[]),G=e.useCallback(({width:r,height:o})=>{const{width:x,height:S}=f.current.getBoundingClientRect();h({portrait:c,boundsPadding:d,x:r/100*m.current*x/r,y:o/100*m.current*S/o})},[c,d,h]);e.useEffect(()=>(g&&!R.current&&(window.addEventListener("mousemove",v,y),window.addEventListener("mouseup",w,y),window.addEventListener("touchmove",v,y),window.addEventListener("touchend",w,y),R.current=!0),()=>{R.current&&(window.removeEventListener("mousemove",v),window.removeEventListener("mouseup",w),window.removeEventListener("touchmove",v),window.removeEventListener("touchend",w),R.current=!1)}),[v,w,g]),ue(f,G),e.useEffect(()=>{const r=f.current,o=()=>{g||w()};return I&&(r.addEventListener("mousemove",v,y),r.addEventListener("mouseleave",o,y)),()=>{r.removeEventListener("mousemove",v),r.removeEventListener("mouseleave",o)}},[I,v,w,g]),Y("mousedown",T,A,D),Y("touchstart",T,A,D);const J=t||l.createElement(le,{portrait:c}),Q={position:"relative",overflow:"hidden",cursor:g?c?"ns-resize":"ew-resize":void 0,userSelect:"none",KhtmlUserSelect:"none",msUserSelect:"none",MozUserSelect:"none",WebkitUserSelect:"none",...q};return l.createElement("div",Object.assign({},F,{ref:f,style:Q,"data-rcs":"root"}),s,l.createElement(O,{ref:P},n),l.createElement($,{portrait:c,ref:j},J))};function ve(t){return E.jsx(de,{className:"max-sm:full-bleed",handle:E.jsxs("div",{className:"flex h-full flex-col items-center justify-center",children:[E.jsx("div",{className:"flex-1 border-l-2 border-divider"}),E.jsxs("div",{className:"relative h-10 w-10 rounded-full border-2 border-divider",children:[E.jsx("div",{className:"pointer-events-none absolute inset-0 h-full w-full rounded-full backdrop-blur-sm"}),E.jsx(oe,{variant:"rounded-full",className:"dark h-full w-full cursor-move rounded-full border-0 backdrop-blur-none",children:E.jsx(ce,{className:"dark"})})]}),E.jsx("div",{className:"flex-1 border-l-2 border-divider"})]}),...t})}export{ve as ReactCompareSlider};
