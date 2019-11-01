// go is really into globals. blech
/* global WebAssembly, Go, _SQLDEF */
require('./build/js-wasm/wasm_exec')

const blob = require('fs').readFileSync(`${__dirname}/build/js-wasm/sqldef.wasm`)

const sqldef = async (targetSrc, currentSrc) => {
  const go = new Go()
  const r = await WebAssembly.instantiate(blob, go.importObject)
  go.run(r.instance)
  return new Promise((resolve, reject) => {
    _SQLDEF('postgres', 'B', 'C', (err, ret) => {
      if (err) {
        return reject(err)
      }
      resolve(ret)
    })
  })
}

module.exports = sqldef
