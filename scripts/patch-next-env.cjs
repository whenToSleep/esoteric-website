// Patch @next/env to work with tsx
// tsx's ESM interop doesn't handle @next/env's webpack-bundled CJS format
const Module = require('module')
const originalLoad = Module._load

Module._load = function (request, parent, isMain) {
  if (request === '@next/env') {
    const mod = originalLoad.call(this, request, parent, isMain)
    // If the module doesn't have a proper default export, create one
    if (!mod.default && mod.loadEnvConfig) {
      mod.default = mod
    }
    return mod
  }
  return originalLoad.call(this, request, parent, isMain)
}

// Also load env vars
const nextEnv = require('@next/env')
nextEnv.loadEnvConfig(process.cwd())
