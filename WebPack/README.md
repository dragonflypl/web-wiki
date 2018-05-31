# Webpack

## Installing

> npm install webpack -g

## Compiling for the future

Use `babel-loader`. Enable it via webpack `module.rules`. Important: set `modules = false` so that babel-loader does not transpile ES imports into CommonJs (this is because webpack does ES imports transpoformation later)

```js
{
    test: ...
    exclude: node_modules
    use: {
        loader: 'babel-loader',
        // ultimately, put this babel config in .babelrc.js. babel-loader will automatically pick up babel congiguration
        options: {
            presets: [
                [
                    'babel-preset-env',
                    { debug: true, modules: false, targets: { browsers: ['> 1%'] } }
                ]
            ]
        }
    }
}
```

Use `babel-preset-env` - this neat preset determines what plugins should be enabled and executed automatically, based on browser support specification (e.g. last 2 chrome versions). Is code requires transfomation then babel will transpile the code. Otherwise, if browser supports new JS feature, then it won't be transpiled.

Use `browserslist` to configure browser you support - it will be automatically used by `babel-preset-env`.

Transpilation is one thing, second is polyfills. There're options how to do it:

* can be imported manually (`import 'core-js/es6/promise`)
* can in integrated with `preset-env` via `useBuiltIns=usage`. This will import needed polyfills (from browserslist) that are actually used in app's source code
* in the future, probably `@babel/plugin-transform-runtime` can be used. It introduces helpers (code that is generated due to transpilation e.g. `class` syntax) that a required from common location (instead of being generated in each file that uses ES feature)

## Source maps

In webpack config add:

> `devtool: 'source-map'`

`devtool` is just a short way to configure plugin(s) that do sourcemapping e.g. `SourceMapDevToolPlugin`.

`babel-loader` is smart enough that to understand this setting and provide mapping.

Versions are:

* `source-map` intended for production (separate map files are generated)
* `eval` (fast and reverses webpack bundling, but you will look at babel output)
* `eval-source-map` best for development, quick regeneration per module
* `hidden-source-map` this option hides sourcemaps by default (link to sourcemap is removed from the bundle). In order to use them, use Chrome `Add Source Map...` and point to sourcemap files manually.
* `nosource-source-map` makes only files & line numbers mapping

<https://webpack.js.org/configuration/devtool/> has all the options.

## Plugins

Pulgin operates on the level of whole compilation.

E.g. `CleanWebpackPlugin` removes stuff from disk before compilation.

Some plugins are: eslint, jscs.

<https://github.com/webpack-contrib/awesome-webpack> has a list of loaders

E.g.

```js
plugins: [
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery"
	})
```

## Loaders

Loader is a transformation (function) that takes source code a get something back (usually modified source code).

Loaders/preloader are used to teach webpack new tricks. By default webpack does not know to much - it can process/bundle/minimize files and that's all.

It operates on **module** level!

E.g.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.js/,
        enforce: 'pre',
        exclude: /node_modules/
        use: [
          {
            loader: `jshint-loader`,
            options: {...options}
          }
        ]
      }
    ]
  }
}
```

### Creating loaders

Just create a commonjs module and add `resolveLoader` section that will map loader name to location in the source code:

```js
resolveLoader: {
    alias: {
        'console-log-loader': path.resolve(__dirname, 'src/utils/console-log-loader.js')
    }
}
```

### Order of loaders

```js
[
    'loader-1`
    'loader-2`
]
```

resolves to `loader-1(loader-2(code))` - so the first loader in array is the last one.

### Inline loaders

In order to apply loader to single import use inline loaders like

`import 'some-loader!./some-module.js'`

## Environments

To control build from config file (for ccessing environment info in _webpack configuration files_) use:

* `cross-env` is to set is safely in npm scripts
* `--env` webpack parameter is other way. To access this argument, from webpack config export a function. This callback function accepts `env` object with `env` cmd argument from command line. More here <https://webpack.js.org/guides/environment-variables/>

To control build from source code, use `DefinePlugin` and set global variables.
DefinePlugin simply replaces tokens in source code with its definition.

```javascript
new webpack.DefinePlugin({
    ENV_IS_DEVELOPMENT: isDevelopment.
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})
```

Shorter way is to use `EnvironmentPlugin`.

## Adding CSS to build

Install loaders:

> install css-loader style-loader --save-dev

1.  Configure loadres:

```js
module: {
    loaders: [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader"
        }
    ]
},
```

2.  Require css in js files (e.g. `app.js`):

```js
console.log('App loaded');

require('../css/bootstrap.css');
require('../css/app.css');
```

3.  Adding less (or any other css preprocessor support)

> npm install less-loader

Next configure less-loader:

```js
module: {
    loaders: [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader"
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader!less-loader"
        }
    ]
},
```

### Creating separate css bundle

Default approach (previous steps) embeeds css inside javascript file and create style tags as runtime with css.

To create css as separate bundle:

1.  Install `extract-text-webpack-plugin` plugin from npm.
2.  Update configuration:

```js
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // load plugin

//enable plugin:
plugins: [
    new ExtractTextPlugin("styles.css")
],
```

and update loaders to use the plugin:

```js
module: {
    loaders: [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }
    ]
},
```

## Adding images & fonts to build

> npm install url-loader

Then update loaders:

```js
module: {
	loaders: [
		{
			test: /\.(png|jpg|ttf)$/,
			exclude: /node_modules/,
			loader: 'url-loader?limit=10000'
		}
	]
},
```

## webpack-dev-server

### Configuration

Root configuration key is `devServer`:

* `contentBase` is for static assets (html). To watch is, use `watchContentBase`.
* `publicPath` is the key that specifies the path where webpack compiled content is available
* `host`
  * can be used to enable webpack access from other machine. If so, set it to `0.0.0.0`

## Troubleshooting

* add `overlay` to `devServer` options to see errors in the browser
* Use `localhost:8080/webpack-dev-server` - it displays dev server compiled content, quick way to see everything that is served by `webpack-dev-server`.

## Tools

* debugging nodejs (e.g. webpack)

> node --inspect-brk node_modules/.bin/webpack

and install Chrome's `Node.js V8 --inspector Manager (NiM)`.

* https://www.npmjs.com/package/webpack-stats-graph for stats graph
