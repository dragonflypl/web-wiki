import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    name: 'rollupDemo',
    file: 'dist/build.js'
  },
  plugins: [
    resolve({
      browser: true // if there's a browser version of library available, then use it
    }),
    commonjs(),
    eslint(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
