import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'rollupDemo',
    file: 'dist/build.js'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
