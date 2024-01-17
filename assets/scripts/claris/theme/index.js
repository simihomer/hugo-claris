import {
  deb,
  pushClass
} from './functions';

import { clarisHugoParams } from "./claris-hugo-params";

// Ensure we load all modules in the right order and exactly once
// Earliest when DOMContentLoaded fires
// However, as this event might already have passed, especially on fast connections,
// we check the `readyState` and execute `init()` immediately if the document is
// no longer in the `loading` state
// From https://stackoverflow.com/a/7053197/617559
function onDOMContentLoaded(initializationFunctions) {
  function init() {
    initializationFunctions.forEach(function (fn) {
      deb("Calling ", fn);
      fn();
    });
  }
  // console.log("onDOMContentLoaded: document.readyState: ", document.readyState)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};

// Minimal set of modules
import { clarisHugoParamsInit } from "./claris-hugo-params";
import { clarisInit } from './claris-init'; // Needs to be loaded first
import { colorSchemeInit } from './color-scheme'; // Needs to be loaded early
import { tagOverlayInit } from "./tag-overlay";
import { obfuscatedLinkInit } from "./obfuscated-link";
import { navigationMenuInit } from "./navigation-menu";
import { linkAnchorInit } from "./link-anchor";
import { footnotesAccessibleInit } from './footnotes-accessible';
onDOMContentLoaded([clarisHugoParamsInit, clarisInit, colorSchemeInit, tagOverlayInit, obfuscatedLinkInit, navigationMenuInit, linkAnchorInit, footnotesAccessibleInit]);

// Enhancement scripts
function themeEnhancedInit () {
  const htmlRootElement = clarisHugoParams.htmlRootElement;
  const htmlRootClassModernJavaScript = clarisHugoParams.htmlRootClassModernJavaScript;
  pushClass(htmlRootElement, htmlRootClassModernJavaScript);
};

import { tableOfContentsInit } from "./table-of-contents";
import { codeBlocksInit } from "./code-blocks";

import { lazyLoadingInit } from "./lazy-loading"
import { mediumZoomInit } from './medium-zoom';

onDOMContentLoaded([themeEnhancedInit, tableOfContentsInit, codeBlocksInit, lazyLoadingInit, mediumZoomInit]);

// NOTE: PostHog Analytics needs to be conditionally included at the HTML-level
// Therefore, it is loaded via the template script `claris-head_async` rather than here
// import { postHogAnalyticsInit } from "./posthog-analytics";

// Disabled scripts
// import './qrcode-svg'; // Not used
// import './web-vitals-analytics'; // Not needed
// import './format-url'; // Not sure if this works
