var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ns-hugo:/home/runner/work/blog/blog/assets/js/shims/react.js
var require_react = __commonJS({
  "ns-hugo:/home/runner/work/blog/blog/assets/js/shims/react.js"(exports, module) {
    module.exports = window.React;
  }
});

// <stdin>
var import_react = __toESM(require_react());
function App() {
  const [isShown, setIsShown] = (0, import_react.useState)(false);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-center justify-center gap-2"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setIsShown(!isShown)
  }, isShown ? "Hide me" : "Show me"), isShown && /* @__PURE__ */ React.createElement("div", null, "\u{1F60A}"));
}
var root = window.ReactDOM.createRoot(document.getElementById("676d9ae2ff8c916ced28df71c8e69992"));
root.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(App, null)));
