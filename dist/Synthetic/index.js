/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 38:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";
__nccwpck_require__.r(__webpack_exports__);
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Synthetic)
/* harmony export */ });
class Synthetic {
    API_ENDPOINT = 'https://app.acumenlogs.com/'

    startSynthetic(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
    }

    getBatch(syntheticToken, batchId) {
        return fetch(`${this.API_ENDPOINT}/status/watcher/${syntheticToken}/${batchId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
    }
}

/***/ }),

/***/ 104:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(104);

const {
  default: Synthetic,
} = __nccwpck_require__(38);

async function run() {
  const syn = new Synthetic();

  const test = await (await syn.startSynthetic(core.getInput('SYNTHETIC_TEST_URL'))).json();

  console.log(test.batch.id);

  const  MAX_RETRIES = 210;
  let retries = 0;

  await new Promise((resolve, reject) => {
    setInterval(async () => {
      const result = await (await syn.getBatch(test.batch.token, test.batch.id)).json();
      if (result.status === 'completed') {
        return resolve(result)
      }
      
      if (result.status === 'completed' && (result.has_passed == false || result.has_passed == 0)) {
        return reject("Failed synthetic test")
      }
      
      retries = retries +1;
      if (retries >= MAX_RETRIES) {
        return reject("Synthetic action timeout")
      }
    }, 4000);
  });
}

run().catch((error) => {
  core.setFailed(error.message);
});
})();

module.exports = __webpack_exports__;
/******/ })()
;