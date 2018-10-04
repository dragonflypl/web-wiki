# Step by step

## Basic React app

- Install webpack

> npm i webpack webpack-cli -D

- Add `npm` script for production and development build

> "build:dev": "webpack --mode development",
> "build": "webpack --mode production",

- Install React

> npm i react react-dom -S

- Install Babel (required to transpile JSX and JavaScript and polyfill browser features)

> npm i @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties -D
> npm i @babel/polyfill

- Create Babel configuration in `babel.config.js`

```js
module.exports = function(api) {
  api.cache.forever();
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
        },
      ],
      '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
};
```

- Add `.browserslistrc` with old browsers (change it to project needs, low values are to demonstrate how code for legacy browsers is generated e.g. with postcss)

```
Chrome >= 10
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
          loader: 'babel-loader',
        },
      },
    ],
  },
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
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
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

Additionally set `devtool: devMode ? 'eval-source-map' : 'nosources-source-map',` in webpack config for better debugging.

And output format:

```js
  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash].js'
  },
```

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

class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello <span className={style.name}>React!</span>
      </div>
    );
  }
}

const App = () => {
  return <Hello />;
};

export default App;
```

- add `LESS` support: `npm i less-loader less -D`

  - change test rule to `test: /\.(less|css)$/,`
  - change first loader to `loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader`

- add less loader (first loader)

```js
{
  loader: 'less-loader';
}
```

- extract `CSS` to separate files `npm i mini-css-extract-plugin -D`. Add pluging coniguration:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[contenthash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
});
```

- add `index.less` file with some content:

```less
@font-stack: Helvetica, sans-serif;
@primary-color: #333;

body {
  font: 100% @font-stack;
  color: @primary-color;
  background: linear-gradient(to bottom, #eeeeee 0%, #7db9e8 100%);
  height: 100vh;
}
```

and import it inside `index.js`: `import './index.scss';`

- to optimize css `npm i optimize-css-assets-webpack-plugin -D` and add default plugin configuration `new OptimizeCssAssetsPlugin()`.

### Adding post css processor

- install it: `npm i postcss-loader postcss-preset-env -D`
- change `importLoaders: 2,` on `css-loader`
- add loader with configuration (before less loader).

```js
const postcssPresetEnv = require('postcss-preset-env');

{
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [postcssPresetEnv(/* pluginOptions */)]
  }
},
```

Preset does a few things automatically e.g. autoprefixing based on browserslist file, for instance it will add vendor prefixes to gradient styles if needed. Sample output for legacy browsers will be:

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
  background: -webkit-linear-gradient(top, #eee, #7db9e8);
  background: -moz-linear-gradient(top, #eee 0, #7db9e8 100%);
  background: linear-gradient(180deg, #eee 0, #7db9e8);
  height: 100vh;
}
```

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
    '\\.(css|less)$': 'identity-obj-proxy'
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

## Optimizations

### BundleAnalyzerPlugin

To analyze bundle size uncomment `new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin()` in plugins section and run `npm run build`.

### Chunks

Use this config for basic optimization (vendor / main chunk)

```js
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
```

### `rxjs`

RxJS by default is treeshakable with WebPack 4.

### `lodash`

`lodash` + `babel-plugin-lodash` + `lodash-webpack-plugin` transformation that produce minimal `lodash` imports.

### `moment`

`moment` has huge bundle (all locales included by default).

Optimization is done with: `new IgnorePlugin(/^\.\/locale$/, /moment$/)`.

If you need additional locale (default english is included), import it explicitly e.g.

> import 'moment/locale/de';

## Linting

Linting is done with `create-react-app` setup along with `eslint-loader` to enable build / browser console logging.

# Resources

- WebPack Optimization:
  - wanna understand splitchunks? Read it
    - https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    - https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
  - https://remarkablemark.org/blog/2017/02/25/webpack-ignore-module/ - dead code elimination and ignoring modules
  - https://webpack.js.org/plugins/ignore-plugin/ (e.g. how to optimize moment)
  - https://www.contentful.com/blog/2017/10/10/put-your-webpack-on-a-diet-part-1/
  - https://www.contentful.com/blog/2017/10/19/put-your-webpack-bundle-on-a-diet-part-2/
  - https://www.contentful.com/blog/2017/10/27/put-your-webpack-bundle-on-a-diet-part-3/
    - using `ContextReplacementPlugin` and `IgnorePlugin`
    - extreme `lodash` optimization with aliases
  - https://www.contentful.com/blog/2017/11/13/put-your-webpack-bundle-on-a-diet-part-4/ - lazy loading and chunk splitting
- https://medium.com/@martin_hotell/tree-shake-lodash-with-webpack-jest-and-typescript-2734fa13b5cd - optimize lodash
- https://www.valentinog.com/blog/react-webpack-babel/
- https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
- https://medium.freecodecamp.org/how-to-conquer-webpack-4-and-build-a-sweet-react-app-236d721e6745 - it also has info on `webpack-merge`
- https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a & https://webpack.js.org/concepts/mode/ - more on what is enabled/disabled in webpack modes
- configuring jest
  - https://jestjs.io/docs/en/getting-started
  - https://jestjs.io/docs/en/webpack
  - http://airbnb.io/enzyme/
- https://browserl.ist/ - browser list tester

# FAQ

- is browserslist taken into account when css is generated:
  - yes (e.g. change to `Chrome >= 10` and see that `linear-gradient` is transpiled. Change it to `Chrome >= 66` and see that `linear-gradient` is not transpiled)
- is browserslist taken into account when babel transpilation is happening:
  - yes (e.g. change to `Chrome >= 10` and see that `class/extends` are transpiled. Change it to `Chrome >= 66` and see that `class/extends` are not transpiled)
- how polyfills are applied:
  - https://babeljs.io/docs/en/babel-preset-env#usebuiltins - polyfils are automatically included based on usage and browserslist (`useBuiltIns: 'usage'`)
