const tsc = require('typescript')
const config = require('./tsconfig.json')

module.exports = {
  process (src, path) {
    return tsc.transpile(src, config.compilerOptions, path, [])
  }
}
