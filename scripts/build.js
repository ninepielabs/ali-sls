const { build } = require('esbuild')
const path = require('path')
const fs = require('fs')

const root = process.cwd()
const entryPoints = ['src/index.ts']
const outdir = path.resolve(root, 'dist')

if (fs.existsSync(outdir)) {
  fs.rmSync(outdir, { recursive: true })
}

const sharedConfig = {
  entryPoints,
  outdir,
  bundle: true,
  platform: 'node',
  external: ['axios'],
  minify: true,
}

build({
  format: 'esm',
  outExtension: { '.js': '.mjs' },
  ...sharedConfig,
})

build({
  format: 'cjs',
  ...sharedConfig,
})
