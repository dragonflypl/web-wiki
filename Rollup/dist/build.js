(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.rollupDemo = {})));
}(this, (function (exports) { 'use strict';

	const add = (a, b) => a + b;

	const substract = (a, b) => a - b;

	exports.add = add;
	exports.substract = substract;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
