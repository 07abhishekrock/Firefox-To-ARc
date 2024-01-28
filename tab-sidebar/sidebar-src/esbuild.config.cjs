const { build } = require('esbuild');
const { solidPlugin } = require('esbuild-plugin-solid');

build({
  entryPoints: [ 'src/entrypoint.tsx' ],
  bundle: true,
  outfile: 'dist/entrypoint.js',
  plugins: [ solidPlugin() ]
}).catch(() => process.exit(1));
