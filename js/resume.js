(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/pdfobject/pdfobject.js
  var require_pdfobject = __commonJS({
    "node_modules/pdfobject/pdfobject.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (typeof module === "object" && module.exports) {
          module.exports = factory();
        } else {
          root.PDFObject = factory();
        }
      })(exports, function() {
        "use strict";
        if (typeof window === "undefined" || window.navigator === void 0 || window.navigator.userAgent === void 0 || window.navigator.mimeTypes === void 0) {
          return false;
        }
        let pdfobjectversion = "2.2.7";
        let nav = window.navigator;
        let ua = window.navigator.userAgent;
        let isIE = "ActiveXObject" in window;
        let isModernBrowser = window.Promise !== void 0;
        let supportsPdfMimeType = nav.mimeTypes["application/pdf"] !== void 0;
        let isSafariIOSDesktopMode = nav.platform !== void 0 && nav.platform === "MacIntel" && nav.maxTouchPoints !== void 0 && nav.maxTouchPoints > 1;
        let isMobileDevice = isSafariIOSDesktopMode || /Mobi|Tablet|Android|iPad|iPhone/.test(ua);
        let isSafariDesktop = !isMobileDevice && nav.vendor !== void 0 && /Apple/.test(nav.vendor) && /Safari/.test(ua);
        let isFirefoxWithPDFJS = !isMobileDevice && /irefox/.test(ua) && ua.split("rv:").length > 1 ? parseInt(ua.split("rv:")[1].split(".")[0], 10) > 18 : false;
        let createAXO = function(type) {
          var ax;
          try {
            ax = new ActiveXObject(type);
          } catch (e) {
            ax = null;
          }
          return ax;
        };
        let supportsPdfActiveX = function() {
          return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl"));
        };
        let supportsPDFs = !isMobileDevice && (isModernBrowser || isFirefoxWithPDFJS || supportsPdfMimeType || isIE && supportsPdfActiveX());
        let buildURLFragmentString = function(pdfParams) {
          let string = "";
          let prop;
          if (pdfParams) {
            for (prop in pdfParams) {
              if (pdfParams.hasOwnProperty(prop)) {
                string += encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]) + "&";
              }
            }
            if (string) {
              string = "#" + string;
              string = string.slice(0, string.length - 1);
            }
          }
          return string;
        };
        let embedError = function(msg, suppressConsole) {
          if (!suppressConsole) {
            console.log("[PDFObject] " + msg);
          }
          return false;
        };
        let emptyNodeContents = function(node) {
          while (node.firstChild) {
            node.removeChild(node.firstChild);
          }
        };
        let getTargetElement = function(targetSelector) {
          let targetNode = document.body;
          if (typeof targetSelector === "string") {
            targetNode = document.querySelector(targetSelector);
          } else if (window.jQuery !== void 0 && targetSelector instanceof jQuery && targetSelector.length) {
            targetNode = targetSelector.get(0);
          } else if (targetSelector.nodeType !== void 0 && targetSelector.nodeType === 1) {
            targetNode = targetSelector;
          }
          return targetNode;
        };
        let generatePDFJSMarkup = function(targetNode, url, pdfOpenFragment, PDFJS_URL, id, title, omitInlineStyles) {
          emptyNodeContents(targetNode);
          let fullURL = PDFJS_URL + "?file=" + encodeURIComponent(url) + pdfOpenFragment;
          let div = document.createElement("div");
          let iframe = document.createElement("iframe");
          iframe.src = fullURL;
          iframe.className = "pdfobject";
          iframe.type = "application/pdf";
          iframe.frameborder = "0";
          iframe.allow = "fullscreen";
          iframe.title = title;
          if (id) {
            iframe.id = id;
          }
          if (!omitInlineStyles) {
            div.style.cssText = "position: absolute; top: 0; right: 0; bottom: 0; left: 0;";
            iframe.style.cssText = "border: none; width: 100%; height: 100%;";
            targetNode.style.position = "relative";
            targetNode.style.overflow = "auto";
          }
          div.appendChild(iframe);
          targetNode.appendChild(div);
          targetNode.classList.add("pdfobject-container");
          return targetNode.getElementsByTagName("iframe")[0];
        };
        let generatePDFObjectMarkup = function(embedType, targetNode, targetSelector, url, pdfOpenFragment, width, height, id, title, omitInlineStyles) {
          emptyNodeContents(targetNode);
          let embed2 = document.createElement(embedType);
          embed2.src = url + pdfOpenFragment;
          embed2.className = "pdfobject";
          embed2.type = "application/pdf";
          embed2.title = title;
          if (id) {
            embed2.id = id;
          }
          if (embedType === "iframe") {
            embed2.allow = "fullscreen";
          }
          if (!omitInlineStyles) {
            let style = embedType === "embed" ? "overflow: auto;" : "border: none;";
            if (targetSelector && targetSelector !== document.body) {
              style += "width: " + width + "; height: " + height + ";";
            } else {
              style += "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
            }
            embed2.style.cssText = style;
          }
          targetNode.classList.add("pdfobject-container");
          targetNode.appendChild(embed2);
          return targetNode.getElementsByTagName(embedType)[0];
        };
        let embed = function(url, targetSelector, options) {
          let selector = targetSelector || false;
          let opt = options || {};
          let id = typeof opt.id === "string" ? opt.id : "";
          let page = opt.page || false;
          let pdfOpenParams = opt.pdfOpenParams || {};
          let fallbackLink = opt.fallbackLink || true;
          let width = opt.width || "100%";
          let height = opt.height || "100%";
          let title = opt.title || "Embedded PDF";
          let assumptionMode = typeof opt.assumptionMode === "boolean" ? opt.assumptionMode : true;
          let forcePDFJS = typeof opt.forcePDFJS === "boolean" ? opt.forcePDFJS : false;
          let supportRedirect = typeof opt.supportRedirect === "boolean" ? opt.supportRedirect : false;
          let omitInlineStyles = typeof opt.omitInlineStyles === "boolean" ? opt.omitInlineStyles : false;
          let suppressConsole = typeof opt.suppressConsole === "boolean" ? opt.suppressConsole : false;
          let forceIframe = typeof opt.forceIframe === "boolean" ? opt.forceIframe : false;
          let PDFJS_URL = opt.PDFJS_URL || false;
          let targetNode = getTargetElement(selector);
          let fallbackHTML = "";
          let pdfOpenFragment = "";
          let fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";
          if (typeof url !== "string") {
            return embedError("URL is not valid", suppressConsole);
          }
          if (!targetNode) {
            return embedError("Target element cannot be determined", suppressConsole);
          }
          if (page) {
            pdfOpenParams.page = page;
          }
          pdfOpenFragment = buildURLFragmentString(pdfOpenParams);
          if (forcePDFJS && PDFJS_URL) {
            return generatePDFJSMarkup(targetNode, url, pdfOpenFragment, PDFJS_URL, id, title, omitInlineStyles);
          }
          if (supportsPDFs || assumptionMode && !isMobileDevice) {
            let embedtype = forceIframe || supportRedirect || isSafariDesktop ? "iframe" : "embed";
            return generatePDFObjectMarkup(embedtype, targetNode, targetSelector, url, pdfOpenFragment, width, height, id, title, omitInlineStyles);
          }
          if (PDFJS_URL) {
            return generatePDFJSMarkup(targetNode, url, pdfOpenFragment, PDFJS_URL, id, title, omitInlineStyles);
          }
          if (fallbackLink) {
            fallbackHTML = typeof fallbackLink === "string" ? fallbackLink : fallbackHTML_default;
            targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url);
          }
          return embedError("This browser does not support embedded PDFs", suppressConsole);
        };
        return {
          embed: function(a, b, c) {
            return embed(a, b, c);
          },
          pdfobjectversion: function() {
            return pdfobjectversion;
          }(),
          supportsPDFs: function() {
            return supportsPDFs;
          }()
        };
      });
    }
  });

  // <stdin>
  var import_pdfobject = __toModule(require_pdfobject());
  var pdfContainer = document.querySelector(".resume-pdf");
  if (import_pdfobject.default.supportsPDFs) {
    const resumeUrl = pdfContainer.dataset.resume;
    import_pdfobject.default.embed(resumeUrl, pdfContainer);
    pdfContainer.classList.remove("hidden");
  } else {
    const pdfFallback = document.querySelector(".resume-pdf-fallback");
    pdfContainer.classList.add("hidden");
    pdfFallback.classList.remove("hidden");
  }
  var pdfLoading = document.querySelector(".resume-loading");
  pdfLoading.classList.add("hidden");
})();
/**
 *  PDFObject v2.2.7
 *  https://github.com/pipwerks/PDFObject
 *  @license
 *  Copyright (c) 2008-2021 Philip Hutchison
 *  MIT-style license: http://pipwerks.mit-license.org/
 *  UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
 */
