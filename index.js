// go currently uses globals for passing stuff into js VM. blech
/* global WebAssembly, Go, _SQLDEF */
require('./build/js-wasm/wasm_exec')

const blob = require('fs').readFileSync(`${__dirname}/build/js-wasm/sqldef.wasm`)

let wasm

const sqldef = async (dbType, desiredDDLs, currentDDLs) => {
  const go = new Go()
  wasm = wasm || await WebAssembly.instantiate(blob, go.importObject)
  go.run(wasm.instance)
  return new Promise((resolve, reject) => {
    _SQLDEF(dbType, desiredDDLs, currentDDLs, (err, ret) => {
      if (err) {
        return reject(err)
      }
      resolve(ret)
    })
  })
}

module.exports = sqldef
