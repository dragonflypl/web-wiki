(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.rollupDemo = {})));
}(this, (function (exports) { 'use strict';

  var add = function add(a, b) {
    console.log("Adding ".concat(a, " and ").concat(b));
    return a + b;
  };

  var substract = function substract(a, b) {
    console.log("Substracting ".concat(a, " and ").concat(b));
    return a - b;
  };

  exports.add = add;
  exports.substract = substract;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
