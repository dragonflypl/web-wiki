import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'rollupDemo',
    file: 'dist/build.js'
  },
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
