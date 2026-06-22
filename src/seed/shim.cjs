// Shim: fix @next/env default export incompatibility with tsx CJS mode
const m = require('@next/env')
if (!m.default || typeof m.default.loadEnvConfig !== 'function') {
  Object.defineProperty(m, 'default', { value: m, configurable: true, writable: true })
}
