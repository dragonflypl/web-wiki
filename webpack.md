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

## Prod vs Dev builds

```-p``` flag turns on production mode which uglifies js.

> webpack -p

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
