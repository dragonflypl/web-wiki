# rollup

> npm i rollup

## Configuration

Create basic config file `rollup.config.js`

```javascript
export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'rollupDemo',
    file: 'dist/build.js'
  }
};
```

and use `npm` script:

> "roll": "rollup -c rollup.config.js"

By default it does only modules transformation : no javascript transpilation is done, only treeshaking.

## Plugins

### Transpilation with babel

> npm i -D rollup-plugin-babel @babel/core @babel/preset-env

and add basic plugin configuration:

```js
plugins: [
  babel({
    exclude: 'node_modules/**' // only transpile our source code
  })
];
```

and configure babel with `.babelrc`:

```js
{
  "presets": [
    [
      "@babel/env",
      {
        "modules": false // tell babel not to do anything with module syntax, leave it to rollup
      }
    ]
  ]
}
```

### Linting

> npm i -D rollup-plugin-eslint

and enable the plugin - that's it.

### 3rd party libraries

Rollup by default does not include `node_modules` in result bundle. To do it install:

> npm i -D rollup-plugin-node-resolve

Moreover, usually modules are exposed via `cjs`, so they need to be converted to `es`

> npm i -D rollup-plugin-commonjs

And enable these plugins:

```js
plugins: [
  resolve({
    browser: true // if there's a browser version of library, then use it
  }),
  commonjs(),
  eslint(),
  babel({
    exclude: 'node_modules/**' // only transpile our source code
  })
];
```

## Hints

- Use `"module": "dist/my-library.es.js"` <https://github.com/rollup/rollup/wiki/pkg.module>

## Resources

- <https://www.youtube.com/watch?v=EU9j0IB-crA> really basic
- <https://www.youtube.com/watch?v=ICYLOZuFMz> plugins configuration, good
- <https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c> why rollup
