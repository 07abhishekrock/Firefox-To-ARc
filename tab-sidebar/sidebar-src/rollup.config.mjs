import withSolid from 'rollup-preset-solid';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import nodeResolve from '@rollup/plugin-node-resolve';

export default withSolid({
  input: 'src/entrypoint.tsx',
  output: {
    format: 'cjs',
    file: 'dist/entrypoint.js'
  },
  plugins: [
    nodeResolve(),
    scss({
      fileName: 'output.css'
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'public/**/*', dest: 'dist' }
      ]
    })

  ]
});
