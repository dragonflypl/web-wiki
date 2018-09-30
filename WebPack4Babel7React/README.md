# Step by step

- Install webpack

> npm i webpack webpack-cli -D

- Add `npm` script for production and development build

> "build:dev": "webpack --mode development",
> "build": "webpack --mode production",

- Install React

> npm i react react-dom -S

- Install Babel (required to transpile JSX and JavaScript)

> npm i @babel/core babel-loader @babel/preset-env @babel/preset-react -D

- Create Babel configuration in `.babelrc`

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

- Configure Webpack to use babel

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
```

- Add `index.js` inside `src` and put:

```javascript
const sayHello = name => console.log(`Hello ${name}`);
sayHello('World');
```

- Run `npm run build:dev`. If everything is ok, you should see content similar to below (JavaScript transpiled - arrow function and const keywords were converted to ES5):

```javascript
/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var sayHello = function sayHello(name) {\n  return console.log(\"Hello \".concat(name));\n};\n\nsayHello('World');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
```

# Resources

- https://www.valentinog.com/blog/react-webpack-babel/
