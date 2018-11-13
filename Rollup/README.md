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

## Transpilation with babel

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

## Resources

- <https://www.youtube.com/watch?v=EU9j0IB-crA> really basic
