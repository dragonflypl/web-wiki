# rollup

> npm i rollup

## configuration

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

> "roll": "rollup --config rollup.config.js"

By default it does only modules transformation : no javascript transpilation is done, only treeshaking.
