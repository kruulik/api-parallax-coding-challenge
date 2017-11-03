/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parallaxObject__ = __webpack_require__(2);



document.addEventListener("DOMContentLoaded", () => {
  const listRoot = document.getElementById("container").querySelector(".list");
  Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* getMovies */])('https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_').then(data => {
    loadContent(listRoot, data);
    console.log(data);
  }).catch(err => {
    console.error('Error:', err.statusText);
  });
});

function loadContent(listRoot, data) {
  // create a new parallaxObject for each data item
  let parallaxObjects = [];
  data.forEach(datum => {
    const parallaxObject = new __WEBPACK_IMPORTED_MODULE_1__parallaxObject__["a" /* default */]({listRoot: listRoot, data: datum});
    parallaxObjects.push(parallaxObject);
    listRoot.appendChild(parallaxObject.listItem);
  });

  listRoot.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      // only call this function when the window is ready to render; improves speed
      parallaxObjects.forEach(obj => {
        let rect = obj.listItem.getBoundingClientRect();
        obj.animate(rect);
      });
    });
  });

}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const getMovies = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let data = xhr.response;
        let parsed = JSON.parse(data);
        resolve(parsed.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getMovies;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ParallaxObject {
  constructor(props) {
    this.listRoot = props.listRoot;
    this.info = props.data;

    this.listItem = document.createElement("div");
    this.content = document.createElement("div");
    this.titleContainer = document.createElement("span");
    this.title = document.createElement("h2");
    this.img = document.createElement("img");
    this.divider = document.createElement("div");

    this.listItem.className = "list-item";
    this.titleContainer.className= "title";
    this.content.className = "content";

    this.title.innerHTML = this.info.title;
    this.img.src = this.getImage();
    this.getImage = this.getImage.bind(this);

    this.constructElement();
    this.container = this.listRoot.getBoundingClientRect();
    this.rect = this.listItem.getBoundingClientRect();
  }

  getImage() {
    const pics = this.info.thumbnails;
    if (pics.length === 0) {
      return './placeholder.png';
    } else if (pics.length === 1) {
      return pics[0].url;
    } else {
      const index = this.getAppropriateSize(pics);
      return pics[index].url;
    }
  }

  getAppropriateSize(pics) {
    // will need to change depending on screen size &
    // return the correct index
    const containerWidth = this.listRoot.getBoundingClientRect().width;
    // const containerWidth = this.container.width;
    let i = -1;
    // get the next largest resolution image for that device's width
    // the extra height will be needed to create a parallax effect
    while (i < pics.length - 1 && pics[i + 1].width <= containerWidth) {
      i++;
    }
    return i + 1 ;
  }

  constructElement() {
    this.listItem.appendChild(this.content);
    this.content.appendChild(this.titleContainer);
    this.titleContainer.appendChild(this.title);
    this.content.appendChild(this.img);
    this.content.appendChild(this.divider);
  }

  isVisible(top, bottom) {
    return (
      (top < this.container.bottom && bottom > this.container.top)
    );
  }

  animate(rect) {
    const top = rect.top;
    const bottom = rect.bottom;
    const height = rect.height;
    if (this.isVisible(top, bottom)) {
      const topOffset = (-25 * ((top + 20) / this.container.height ) - 20);
      this.img.style.bottom = `${topOffset}px`;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ParallaxObject);


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map