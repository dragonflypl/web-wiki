# Webpack

## Installing

> npm install webpack -g

## Configuration - webpack.config.js

```
module.exports = {
  entry: "./index.js",
  output: {
    filename: "output.js"
  },
  watch: true 
}
```

Options:
- entry can be an array
- watch is optional

## Running (provided config file is available in cwd)

> webpack

### Running in watch mode (the same can be achieved with config file)

> webpack -watch

### Minification & Source map generation

Add ```-d``` for source maps & ```-p``` for minification:

> webpack -d -p

The same thing from config file:

```
plugins: [
	new webpack.optimize.UglifyJsPlugin({minimize: true})
],
devtool: "inline-source-map",
```

## Making multiple bundles

1. Make entry an array:

```
entry: {
	about: './about_page.js',
	home: './home_page.js',
	contact: './contact_page.js'
},
```

2. In output, change filename to include ```[name]``` token:

```
output: {
	filename: "[name].js"
},
```

3. Create common file for webpack code by creating ```CommonsChunkPlugin``` and enabling it:

```
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');

plugins: [
	commonsPlugin
],
```

## Prod vs Dev builds

```-p``` flag turns on production mode which uglifies js.

> webpack -p

### Config files per environment

For instance create ```webpack-production.config.js```:

```
var WebpackStrip = require('strip-loader'); // additional loader for production build
var devConfig = require('./webpack.config.js');
var stripLoader = {
	test: [/\.js$/, /\.es6$/],
	exclude: /node_modules/,
	loader: WebpackStrip.loader('console.log')
}

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;
```

And use this config:

> webpack --config webpack-production.config.js -p

## Loaders & Preloaders

Loaders/preloader are used to teach webpack new tricks. By default webpack does not know to much - it can process/bundle/minimize files and that's all.

Loaders are configured in config file under ```module.loaders``` section. For sample check Babel.

### Linting

> npm install jshint jshint-loader --save-dev

```
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: 'node_modules',
				loader: 'jshint-loader'
			}
		]
	},
```

### Babel

> npm install babel-core babel-loader --save-dev

#### Configuration

```
	module: {
		loaders: [
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	// additional config entry, not Babel related but required so that webpack resolves *.es6 files
	resolve: {
		extensions: ['', '.js', '.es6']
	}	
```

## Adding CSS to build

Install loaders:

> install css-loader style-loader --save-dev

1. Configure loadres:
	
	```
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
	
2. Require css in js files (e.g. ```app.js```):
	
	```
	console.log('App loaded');
	
	require('../css/bootstrap.css');
	require('../css/app.css');
	```
