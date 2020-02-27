# node-sqldef

This is a simple node-wrapper around [sqldef](https://github.com/k0kubun/sqldef), which I highly recommend as a CLI tool to do this stuff. 

> See a demo [here](http://konsumer.js.org/node-sqldef/)!

The basic idea is that you can keep a plain SQL file that desribes the current database, and migrate back and forth. Using git, you can migrate the existing database to whatever the current structure is in the checkout.

It's compiled to WebAssembly, so you can use it in a browser, node, or [any other supported language](https://github.com/wasmerio/wasmer) without having to compile it, yourself. It works with MySQL or PostgreSQL schemas.

## usage

```js
const { promisify } = require('util')
const sqldef = require('sqldef')

const readFile = promisify(require('fs').readFile)
const exec = promisify(require('child_process').exec)

const main = async () => {
  const target = (await readFile('schema.sql')).toString()
  const current = await exec('pg_dump --username=<USER> <DATABASE>')
  console.log(await sqldef('postgres', current, target))
}
main()
```

You can also use it in a web-browser, if you include `wasm_exec.js` & `sqldef_browser.js`. See [example](./build/js-wasm/index.html).

## CLI

You can also use the node-CLI (especially good for npm `script` lines.) It has mostly the same options as [sqldef](https://github.com/k0kubun/sqldef)'s CLI. You can install it globally (to put `sqldef` in your path) or run `npx sqldef`, to run it without installing it.

```
usage: sqldef    [-h] [-v] [-t {postgres,mysql}] [-u USER] [-p PASSWORD]
                 [-H HOST] [-P PORT] [-S SOCKET] [--password-prompt]
                 [--file FILE] [--dry-run] [--export] [--skip-drop]
                 DB_NAME

Track SQL migration directly from your database

Positional arguments:
  DB_NAME               Your database name

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -t {postgres,mysql}, --type {postgres,mysql}
                        Type of database
  -u USER, --user USER  User name
  -p PASSWORD, --password PASSWORD
                        User password, overridden by $MYSQL_PWD/$PGPASSWORD
  -H HOST, --host HOST  Host used for connection
  -P PORT, --port PORT  Port used for the connection: defaults to 
                        default-port for type
  -S SOCKET, --socket SOCKET
                        The socket file to use for connection
  --password-prompt     Force user password prompt
  --file FILE           Read schema SQL from the file, rather than stdin
  --dry-run             Don't run DDLs but just show them
  --export              Just dump the current schema to stdout
  --skip-drop           Skip destructive changes such as DROP
```

```bash
# export
sqldef test --export > schema.sql

# edit schema.sql how you like

# show import
sqldef test --dry-run < schema.sql

# bash confirm & do update
echo "Do you wish to make these changes?"
select yn in "Yes" "No"
case $yn in
    Yes ) sqldef test < schema.sql;;
    No ) exit;;
esac
```

## TODO

* Need to actually add parsing/sql-clients to the CLI
* Contribute more database-type parsing to sqldef (sqlite would be cool.) Does db-type even matter for just parsing?
* throws errors on some diffs.
* the wasm-size is pretty big (4MB!)
* Keep CLI DDL-only? (with recipes for dumping pg/mysql piped into it.) I could see htis making it more generally useful and easy to maintain.

## credit

Most of the credit goes to @k0kubun. They made the awesome diffing lib, I just compiled a loader to wasm, wrapped it with a node lib, & CLI
