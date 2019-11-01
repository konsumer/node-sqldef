#!/usr/bin/env node

const ArgumentParser = require('argparse').ArgumentParser
const { version, description } = require('./package.json')
const Prompt = require('prompt-password')

var parser = new ArgumentParser({
  version,
  addHelp: true,
  description
})

parser.addArgument(['-t', '--type'], { help: 'Type of database', defaultValue: 'postgres', choices: ['postgres', 'mysql'] })
parser.addArgument(['-u', '--user'], { help: 'User name', defaultValue: 'root' })
parser.addArgument(['-p', '--password'], { help: 'User password, overridden by $MYSQL_PWD/$PGPASSWORD' })
parser.addArgument(['-H', '--host'], { help: 'Host used for connection', defaultValue: '127.0.0.1' })
parser.addArgument(['-P', '--port'], { help: 'Port used for the connection: defaults to default-port for type' })
parser.addArgument(['-S', '--socket'], { help: 'The socket file to use for connection' })
parser.addArgument(['--password-prompt'], { help: 'Force user password prompt', nargs: 0 })
parser.addArgument(['--file'], { help: 'Read schema SQL from the file, rather than stdin', defaultValue: '-' })
parser.addArgument(['--dry-run'], { help: "Don't run DDLs but just show them", nargs: 0 })
parser.addArgument(['--export'], { help: 'Just dump the current schema to stdout', nargs: 0 })
parser.addArgument(['--skip-drop'], { help: 'Skip destructive changes such as DROP', nargs: 0 })
parser.addArgument(['DB_NAME'], { help: 'Your database name', nargs: 1 })

const run = async () => {
  const args = parser.parseArgs()

  // clean up, normalize & default args
  args.password = args.password || args.type === 'postgres' ? process.env.PGPASSWORD : process.env.MYSQL_PWD
  args.port = args.port || args.type === 'postgres' ? 5432 : 3306
  args.password_prompt = !!args.password_prompt
  args.dry_run = !!args.dry_run
  args.export = !!args.export
  args.skip_drop = !!args.skip_drop
  args.db_name = args.DB_NAME[0]
  delete args.DB_NAME

  if (args.password_prompt) {
    const prompt = new Prompt({
      message: 'Enter your password please'
    })
    args.password = await prompt.run()
  }

  console.log('TODO: not done yet, but here are your options:')
  console.dir(args)
}
run()
