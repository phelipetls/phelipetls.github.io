var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

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
