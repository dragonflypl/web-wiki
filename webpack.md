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

## Loaders

Loaders are used to teach webpack new tricks. By default webpack does not know to much - it can process/bundle/minimize files and that's all.

### Babel

> npm install babel-core babel-loader --save-dev
