/* global WebAssembly */
const Go = require('./build/js-wasm/wasm_exec')

const blob = require('fs').readFileSync(`${__dirname}/build/js-wasm/sqldef.wasm`)

const sqldef = async (targetSrc, currentSrc) => {
  const go = new Go()
  const { instance } = await WebAssembly.instantiate(blob, go.importObject)
  go.run(instance)
}

module.exports = sqldef
