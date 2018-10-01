# Step by step

## Basic React app

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

## Setting up environments

Before going further let's set up env: `npm i cross-env rimraf -D` and update npm scripts:

```
    "clean": "rimraf dist",
    "build:dev": "npm run clean && cross-env NODE_ENV=development webpack --mode development",
    "build": "npm run clean && cross-env NODE_ENV=production webpack --mode production",
```

and put this into webpack config file: `const devMode = process.env.NODE_ENV !== 'production';`

Additionally set `devtool: devMode ? 'eval-source-map' : undefined` in webpack config for better debugging.

## Setting up CSS

- Install loaders: `npm i css-loader style-loader -D` and add to webpack rules (this is configuration for css modules):

```js
{
  test: /\.css$/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: "[name]_[local]_[hash:base64]",
        sourceMap: true,
        minimize: true
      }
    }
  ]
}
```

Add some css to `App.css`:

```css
.name {
  font-weight: bold;
}
```

And import it into `App.js`:

```js
import React from 'react';
import style from './App.css';

const App = () => {
  return (
    <div>
      Hello <span className={style.name}>React!</span>
    </div>
  );
};

export default App;
```

- add `SASS` support: `npm i sass-loader node-sass -D`

  - change test rule to `test: /\.(sa|sc|c)ss$/,`
  - change first loader to `loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader`

- extract `CSS` to separate files `npm i mini-css-extract-plugin -D`. Add pluging coniguration:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[contenthash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css'
});
```

- add `index.scss` file with some content:

```scss
body {
  background-color: lightblue;
  font-size: 16px;
}
```

and import it inside `index.js`: `import './index.scss';`

- to optimize css `npm i optimize-css-assets-webpack-plugin -D` and add default plugin configuration `new OptimizeCssAssetsPlugin()`.

## Setting up tests

- Install basic tools:

> `npm i jest identity-obj-proxy babel-core@^7.0.0-bridge.0 react-test-renderer regenerator-runtime -D` (`babel-jest` is not explicitly needed)

- Add test script: `"test": "jest"`
- Create jest configuration file `jest --init`
- Update mappings so that webpack assets are properly mocked:

```
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
```

and create `__mocks__/fileMock.js` file with this content: `module.exports = 'test-file-stub';`. Without it, Jest won't know what to do with non JavaScript assets like `import './styles.css`.

- Create first test (`App.test.js`):

```js
import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  it('should run', () => {
    const component = TestRenderer.create(<App />);
    expect(component).toMatchSnapshot();
  });
});
```

and run it with `npm test`.

### Adding Enzyme

- `npm i enzyme enzyme-adapter-react-16 enzyme-to-json -D`

- make it work with Jest by adding to `setup.js`:
  - `snapshotSerializers: ['enzyme-to-json/serializer']`
  - `setupTestFrameworkScriptFile: '<rootDir>/test/setup.js'`, with this content

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

- add first enzyme tests:

```js
it('should render .name', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.name').length).toBe(1);
});

it('should shallow render', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
```

# Resources

- https://www.valentinog.com/blog/react-webpack-babel/
- https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
- https://medium.freecodecamp.org/how-to-conquer-webpack-4-and-build-a-sweet-react-app-236d721e6745 - it also has info on `webpack-merge`
- https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a & https://webpack.js.org/concepts/mode/ - more on what is enabled/disabled in webpack modes
- configuring jest
  - https://jestjs.io/docs/en/getting-started
  - https://jestjs.io/docs/en/webpack
  - http://airbnb.io/enzyme/

# FAQ
