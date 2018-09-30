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

- Add React component to `App.js`

```jsx
import React from 'react';

const App = () => {
  return <div>Hello React!</div>;
};

export default App;
```

and modify `index.js`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('index'));
```

- Add `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React and Webpack4</title>
</head>

<body>
    <section id="index"></section>
</body>

</html>
```

- Now we need to install `npm i html-webpack-plugin -D` and use this in our webpack config file. This plugin generates an HTML file with `<script>` injected and writes this to `dist/index.html`.

```js
const HtmlWebPackPlugin = require('html-webpack-plugin');

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
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
```

- run `npm run build:dev` and see `dist` folder output. It has `index.html` with scripts.

- to see application in action we need to install `npm i webpack-dev-server -D` and add start npm script:

> "start": "webpack-dev-server --mode development --open"

Run `npm start` and enjoy React app in the browser.

# Resources

- https://www.valentinog.com/blog/react-webpack-babel/
