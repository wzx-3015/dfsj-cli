#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')

program
  .version(`${require('../package.json').version}`, '-V --version')
  .usage('<Commands> [options]')

// require('../lib/index')
program
  .command('create')
  .description('创建一个新项目')
  .action(() => {
    const create = require('../lib/create.js').default

    create && create()
  })

program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`auth <command> --help`)} for detailed usage of given command.`)
  console.log()
})

// program.commands.forEach(c => {
//   console.log(c)
//   // c.on('--help', () => console.log())
// })

program.parse(process.argv)
